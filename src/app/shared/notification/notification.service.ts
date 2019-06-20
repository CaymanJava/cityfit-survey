import { Injectable } from '@angular/core';
import { Message } from 'primeng/primeng';
import { Severity } from './notification-severity';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private stream: Subject<Message> = new Subject<Message>();

  success(message: string, title: string = 'Success') {
    this.show('success', title, message);
  }

  info(message: string, title: string = 'Information') {
    this.show('info', title, message);
  }

  warn(message: string, title: string = 'Warning') {
    this.show('warn', title, message);
  }

  error(message: string, title: string = 'Error') {
    this.show('error', title, message);
  }

  getStream(): Subject<Message> {
    return this.stream;
  }

  private show(severity: Severity, summary: string, detail: string) {
    this.getStream().next({severity, summary, detail});
  }
}
