import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrosZodiaco } from './registros-zodiaco';

describe('RegistrosZodiaco', () => {
  let component: RegistrosZodiaco;
  let fixture: ComponentFixture<RegistrosZodiaco>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrosZodiaco],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrosZodiaco);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
