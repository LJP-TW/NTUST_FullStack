import { Component, OnInit } from '@angular/core';
import { Reply } from '../reply';
import { CustomerHelpService } from '../customer-help.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-costumer-help',
  templateUrl: './costumer-help.component.html',
  styleUrls: ['./costumer-help.component.css']
})
export class CostumerHelpComponent implements OnInit {
  public reply:Reply = {
    text : '',
    imageFiles : [],
  };
  public page = 0;
  constructor(private customerService:CustomerHelpService,private authService:AuthService) {
    
   }

  ngOnInit() {
  }
  Exit(){
    this.page = 0;
  }

  FileSelected(event){
    this.reply.imageFiles = <File[]>event.target.files;
  }
  Send(){
    if(this.authService.LoggedInRedirect()){
      alert('請先登入');
    }
    
    const fd = new FormData();
    for(let i = 0 ; i < this.reply.imageFiles.length ; i++)
      fd.append('image[]',this.reply.imageFiles[i],this.reply.imageFiles[i].name);

    fd.append('text',this.reply.text);
    this.customerService.report(fd).subscribe((data:any)=>{
      if(data.success == true)
        this.reply.imageFiles=[];
        this.reply.text ="";
        this.page = 2;
    },
    (error)=>{
      console.log(error);
    });
  }


}
