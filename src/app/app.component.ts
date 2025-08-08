import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatboatComponent } from './components/chat-bot/chat-bot.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChatboatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'chatbot';
}
