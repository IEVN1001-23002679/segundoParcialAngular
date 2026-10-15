import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarZodiaco } from './editar-zodiaco';

describe('EditarZodiaco', () => {
  let component: EditarZodiaco;
  let fixture: ComponentFixture<EditarZodiaco>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarZodiaco],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarZodiaco);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
