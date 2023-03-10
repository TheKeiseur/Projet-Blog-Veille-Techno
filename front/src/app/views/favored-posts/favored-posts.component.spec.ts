import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FavoredPostsComponent} from './favored-posts.component';

describe('FavoredPostsComponent', () => {
  let component: FavoredPostsComponent;
  let fixture: ComponentFixture<FavoredPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoredPostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoredPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
