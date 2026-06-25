import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgGpu } from './svg-gpu';

describe('SvgGpu', () => {
  let component: SvgGpu;
  let fixture: ComponentFixture<SvgGpu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvgGpu],
    }).compileComponents();

    fixture = TestBed.createComponent(SvgGpu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
