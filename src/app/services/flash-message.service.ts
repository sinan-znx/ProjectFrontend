import { Injectable } from '@angular/core';

export interface FlashMessage {
  message: string;
  cssClass: string;
  timeout: number;
}

@Injectable({
  providedIn: 'root'
})
export class FlashMessagesService {
  private messages: FlashMessage[] = [];

  show(message: string, options: { cssClass?: string; timeout?: number } = {}) {
    const msg: FlashMessage = {
      message,
      cssClass: options.cssClass || 'alert-info',
      timeout: options.timeout || 3000
    };
    
    this.messages.push(msg);
    
    if (msg.timeout > 0) {
      setTimeout(() => {
        const index = this.messages.indexOf(msg);
        if (index > -1) {
          this.messages.splice(index, 1);
        }
      }, msg.timeout);
    }
    
    // Simple alert for now
    alert(message);
  }

  getMessages(): FlashMessage[] {
    return this.messages;
  }

  clear() {
    this.messages = [];
  }
}
