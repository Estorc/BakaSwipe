import { Injectable } from '@angular/core';

const SERVER_IP = "https://bakaswipe.pluscorp.fr";

@Injectable({ providedIn: 'root' })
export class SessionService {
  private sessionId: string | null = null;

  constructor() {
    this.load();
  }

  async load() {
    const saved = sessionStorage.getItem('sessionId');
    console.log(`Start logging.`)
    if (saved) {
      this.sessionId = JSON.parse(saved);
      if (await this.checkSession(this.sessionId)) {
        console.log(`Already connected!`)
      } else {
        this.sessionId = null;
        console.log(`Session ID found but expired. Please create a new session.\n`);
      }
    } else {
      this.sessionId = null;
      console.log(`No session ID found. Please create a new session.\n`);
    }
  }

  save() {
    sessionStorage.setItem('sessionId', JSON.stringify(this.sessionId));
  }

  isConnected(): boolean {
    return this.sessionId != null;
  }

  async checkSession(sessionId: string | null): Promise<boolean> {
    if (!sessionId) return false;
    try {
      const res = await fetch(`${SERVER_IP}/session-exists`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      });
      return res.status === 200;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async isSessionValid(): Promise<boolean> {
    if (!this.sessionId) return false;
    try {
      const res = await fetch(`${SERVER_IP}/session-logged-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: this.sessionId })
      });
      return res.status === 200;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async getAnimeDetails(malId: number): Promise<any> {
    if (!this.sessionId) {
      console.log('Session expirée. Veuillez vous reconnecter.');
      return null;
    }

    try {
      const res = await fetch(`${SERVER_IP}/details`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: this.sessionId, animeId: malId })
      });

      const data = await res.json();

      console.log(`Détails pour MAL ID ${malId}:`, data);

      return data;

    } catch (error) {
      console.error('Erreur lors de la récupération des détails:', error);
    }
  }

  getSessionId(): string | null {
    return this.sessionId;
  }

  async createSession(): Promise<void> {
    const res = await fetch(`${SERVER_IP}/create-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: "{}"
    });
    const data = await res.json();
    this.sessionId = data.sessionId;
    this.save();
  }

  // <-- LA METHODE CONNECT EXISTE BIEN ICI
  async connect(): Promise<void> {
    if (!await this.checkSession(this.sessionId)) {
      await this.createSession();
    }
    const res = await fetch(`${SERVER_IP}/connect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sessionId: this.sessionId, redirect_uri: `${SERVER_IP}/callback` })
    })
    const reader = res?.body?.getReader();
    if (!reader) {
      console.log('Failed to get reader from response body.\n');
      return;
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const message = new TextDecoder().decode(value);
      const json = JSON.parse(message);
      if (json.status === 'Need authentication') {
        const url = json.authUrl;
        // Handle the URL (e.g., open in new tab)
        window.open(url, '_blank');
      } else {
        console.log(`Message: ${message}\n`);
      }
    }
  }

  async search(animeName: string): Promise<any> {
    if (!animeName) {
      console.log('Veuillez entrer un nom d’anime.');
      return null;
    }

    if (!this.sessionId) {
      console.log('Session expirée. Veuillez vous reconnecter.');
      return null;
    }

    const options = { q: animeName, limit: 10, nsfw: true };

    try {
      const res = await fetch(`${SERVER_IP}/search-anime`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: this.sessionId, options })
      });

      const data = await res.json();

      console.log(`Résultats pour "${animeName}":`, data.results);

      return data.results;

    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
    }
  }


  async suggest(): Promise<any> {

    if (!this.sessionId) {
      console.log('Session expirée. Veuillez vous reconnecter.');
      return null;
    }

    const options = { limit: 100, offset: 0 };

    try {
      const res = await fetch(`${SERVER_IP}/suggest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: this.sessionId, options })
      });

      const data = await res.json();

      console.log(`Résultats :`, data.results);

      return data.results;

    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
    }
  }
}
