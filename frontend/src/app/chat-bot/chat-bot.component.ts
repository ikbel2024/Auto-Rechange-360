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
  messages: { sender: string; text: string }[] = [
    { sender: 'Lizarazu', text: 'Hello! How can I assist you today?' }
  ];

  constructor(private chatBotService: ChatBotService) {}

  toggleChatbot(): void {
    this.isOpen = !this.isOpen;
  }

  closeChatbot(): void {
    this.isOpen = false;
  }

  async sendMessage(): Promise<void> {
    const message = this.userMessage.trim();
    if (!message) {
      return;
    }

    this.addMessage('User', message);

    try {
      const response = await this.chatBotService.sendQuestion(message).toPromise();
      this.addMessage('Bot', response.response);
    } catch (error) {
      console.error('Error while sending message:', error);
      this.addMessage('Bot', 'Failed to communicate with the chatbot.');
    } finally {
      this.userMessage = '';
    }
  }

  addMessage(sender: string, text: string): void {
    this.messages.push({ sender, text });
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }
}
