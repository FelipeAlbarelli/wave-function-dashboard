import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { AssistenteDashboardComponent } from './app/comps/assistente-dashboard/assistente-dashboard.component';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AssistenteDashboardComponent],
  template: `
    <app-assistente-dashboard></app-assistente-dashboard>
  `,
})
export class App {
  name = 'Angular';
}


bootstrapApplication(App, {
    providers: [
      provideAnimations()
    ]
 })