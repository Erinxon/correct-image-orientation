import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckImagesComponent } from './check-images.component';

describe('CheckImagesComponent', () => {
  let component: CheckImagesComponent;
  let fixture: ComponentFixture<CheckImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckImagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
