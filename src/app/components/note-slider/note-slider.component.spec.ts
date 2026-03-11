import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteSliderComponent } from './note-slider.component';

describe('NoteSliderComponent', () => {
  let component: NoteSliderComponent;
  let fixture: ComponentFixture<NoteSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
