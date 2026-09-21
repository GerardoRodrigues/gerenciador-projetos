import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { IAuditLog } from '../../../core/models';

@Component({
  selector: 'app-audit-log',
  imports: [DatePipe],
  templateUrl: './audit-log.html'
})
export class AuditLog {
  logs = signal<IAuditLog[]>([]);
}
