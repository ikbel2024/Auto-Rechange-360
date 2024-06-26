import { Component } from '@angular/core';
import { ChatBotService } from '../services/chat-bot.service';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css']
})
export class ChatBotComponent {
  isOpen = false;
  userMessage = '';
  messages = [{ sender: 'Lizarazu', text: 'Hello! How can I assist you today?' }];

  constructor(private chatBotService: ChatBotService) {} // Inject the ChatBotService

  toggleChatbot() {
    this.isOpen = !this.isOpen;
  }

  closeChatbot() {
    this.isOpen = false;
  }

  async sendMessage() {
    const userMessage = this.userMessage.trim();
    if (userMessage) {
      this.addMessage('User', userMessage);
      try {
        const response = await this.chatBotService.sendQuestion(userMessage).toPromise();
        this.addMessage('Bot', response.response);
      } catch (error) {
        this.addMessage('Bot', 'Failed to communicate with the chatbot.');
      }
      this.userMessage = '';
    }
  }

  addMessage(sender: string, text: string) {
    this.messages.push({ sender, text });
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }
}
