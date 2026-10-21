import { Component } from '@angular/core';
import { MainLayout } from './main-layout';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, RouterOutlet } from '@angular/router';
import { Sidebar } from '../../components/sidebar/sidebar';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  template: ` <div data-testid="mock-sidebar">Mock Sidebar</div> `,
})
class MockSidebar {}

describe('Main Layout Component', () => {
  let fixture: ComponentFixture<MainLayout>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MainLayout],
      providers: [provideRouter([])],
    }).overrideComponent(MainLayout, {
      remove: { imports: [Sidebar] },
      add: { imports: [MockSidebar] },
    });

    fixture = TestBed.createComponent(MainLayout);
    fixture.detectChanges();
  });

  it('deve renderizar o sidebar mock e o router-outlet', () => {
    const sidebar = fixture.debugElement.query(By.css('[data-testid="mock-sidebar"]'));
    expect(sidebar).toBeTruthy();

    const outlets = fixture.debugElement.queryAll(By.directive(RouterOutlet));
    expect(outlets.length).toBe(2);
  });
});
