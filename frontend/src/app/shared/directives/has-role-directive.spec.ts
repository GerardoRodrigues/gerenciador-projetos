import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HasRoleDirective } from './has-role-directive';
import { Component, signal } from '@angular/core';
import { AuthManager } from '../../core/services/auth-manager';
import { By } from '@angular/platform-browser';

@Component({
  standalone: true,
  imports: [HasRoleDirective],
  template: `
    <div *hasRole="'admin'" data-testid="admin-content">Admin</div>
    <div *hasRole="'manager'" data-testid="manager-content">Manager</div>
  `,
})
class TestComponent {}

describe('HasRoleDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let userSignalMock = signal<any>(null);

  let authManagerMock = {
    user: userSignalMock,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [{ provide: AuthManager, useValue: authManagerMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
  });

  it('nao deve renderizar nenhuma div se o usuario nao estiver logado', () => {
    fixture.detectChanges();

    const adminDiv = fixture.debugElement.query(By.css('[data-testid="admin-content"]'));
    const managerDiv = fixture.debugElement.query(By.css('[data-testid="manager-content"]'));

    expect(adminDiv).toBeFalsy();
    expect(managerDiv).toBeFalsy();
  });

  it('deve renderizar a div de admin se o usuario for admin', () => {
    userSignalMock.set({ role: 'admin' });
    fixture.detectChanges();

    const adminDiv = fixture.debugElement.query(By.css('[data-testid="admin-content"]'));
    const managerDiv = fixture.debugElement.query(By.css('[data-testid="manager-content"]'));

    expect(adminDiv).toBeTruthy();
    expect(managerDiv).toBeFalsy();
  });

  it('deve renderizar a div de manager se o usuario for manager', () => {
    userSignalMock.set({ role: 'manager' });
    fixture.detectChanges();

    const adminDiv = fixture.debugElement.query(By.css('[data-testid="admin-content"]'));
    const managerDiv = fixture.debugElement.query(By.css('[data-testid="manager-content"]'));

    expect(adminDiv).toBeFalsy();
    expect(managerDiv).toBeTruthy();
  });
});
