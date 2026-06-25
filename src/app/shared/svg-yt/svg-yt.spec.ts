import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgYt } from './svg-yt';

describe('SvgYt', () => {
  let component: SvgYt;
  let fixture: ComponentFixture<SvgYt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvgYt],
    }).compileComponents();

    fixture = TestBed.createComponent(SvgYt);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
