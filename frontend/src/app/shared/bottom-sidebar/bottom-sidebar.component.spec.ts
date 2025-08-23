import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSidebarComponent } from './bottom-sidebar.component';

describe('BottomSidebarComponent', () => {
  let component: BottomSidebarComponent;
  let fixture: ComponentFixture<BottomSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
