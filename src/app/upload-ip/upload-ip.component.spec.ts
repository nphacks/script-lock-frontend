import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadIpComponent } from './upload-ip.component';

describe('UploadIpComponent', () => {
  let component: UploadIpComponent;
  let fixture: ComponentFixture<UploadIpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadIpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadIpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
