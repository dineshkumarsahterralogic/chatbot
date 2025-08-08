import { CommonModule } from "@angular/common";
import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { AfterViewChecked, Component, ElementRef, ViewChild, viewChild } from "@angular/core";
import { ChatBotService } from "../../services/chat-bot.service";
import { FormsModule } from "@angular/forms";
import { marked } from "marked";
import { DomSanitizer } from "@angular/platform-browser";
import { promises } from "dns";


@Component({
    selector: "app-chat-boat",
    imports: [CommonModule, HttpClientModule, FormsModule],
    standalone: true,
    templateUrl: "./chat-bot.component.html",
    styleUrl: "./chat-bot.component.scss"
})
export class ChatboatComponent implements AfterViewChecked{
    userInput: any;
    messages: { from: 'User' | 'Bot', text: any }[] = [];
    res: any;
    isLoading: boolean=false
    @ViewChild("chatContainer") private chatContainer!: ElementRef
    constructor(private chatbotService: ChatBotService, private domSanitizer: DomSanitizer) { }
    
    ngAfterViewChecked(): void {
        this.scrollTobutton();
    }
    sendMessage(data: { message: string }) {
        if (!this.userInput.trim()) {
            return;
        }
        const userMessage = this.userInput;
        this.messages.push({ from: 'User', text: userMessage })
        this.userInput = ''
        this.isLoading=true;
        this.chatbotService.sendMessage(data).subscribe({
            next: (data: any) => {
                let htmlReply:any = this.convertMarkdownToHTML(data.response);
                let sanitizeDome = this.domSanitizer.bypassSecurityTrustHtml(htmlReply)
                this.isLoading=false;
              

                this.messages.push({ from: 'Bot', text: sanitizeDome  })
            },
            error: (error: HttpErrorResponse) => {
                console.log(error);
                this.isLoading=false;
            }
        })
    }

    //Sending the request
    sendquery() {
        this.sendMessage({ message: this.userInput })
    }

    //It will convert the google gemini response's markdown to HTML
    convertMarkdownToHTML(markdown: string){
      return marked.parse(markdown)
    }

    //this function will scroll the lattest message
    scrollTobutton(){
        try {
            
            this.chatContainer.nativeElement.scrollTop= this.chatContainer.nativeElement.scrollHeight;
            // this.chatContainer.nativeElement?.scroll({
            //     top: this.chatContainer.nativeElement.scrollHeight,
            //     behavior: "smooth"
            // })
        } catch (error) {
            console.error(error)
        }
    }
}


