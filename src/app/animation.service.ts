import { Injectable } from '@angular/core';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class AnimationService {


  constructor() { }



  ScreenCenter(src:string,timeout:number,width :number = 100,height :number = 100){
    $('body').append(`<div class="animation screen"></div>`);
    $('body').append(`
    <div class="animation" style="width: ${width}px;
      height: ${height}px;
      top: 50%;
      left: 50%;
      margin-left: -${width/2}px;
      margin-top: -${height/2}px;">
      <img style="width:100%;height:100%" src="${src}"/>
    </div>`)
    setTimeout(()=>{
      $('.animation').remove();
    },timeout);
  }
}
