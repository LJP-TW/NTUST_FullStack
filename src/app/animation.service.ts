import { Injectable } from '@angular/core';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class AnimationService {


  constructor() { }



  ScreenCenter(src:string,timeout:number=1000,width :number = 100,height :number = 100){
    var image = new Image();
    image.src = src;
  // $('#img').click(function(){
  //   $(this).attr('src',image.src);
  // }); 
    $('body').append(`<div class="animation screen"></div>`);
    $('body').append(`
    <div id="mid_ani_cont" class="animation" style="
      width: ${width}px;
      height: ${height}px;
      top: 50%;
      left: 50%;
      margin-left: -${width/2}px;
      margin-top: -${height/2}px;">
    </div>`);
    $('#mid_ani_cont').append(`<img id="mid_ani" src="${image.src}?${Math.round(Math.random()*100000)}" style="width:100%;height:100%;"  />`);

    setTimeout(()=>{
      $('.animation').remove();
    },timeout);
    // setTimeout(()=>{
    //   $('#CenterAnimation').attr('src',src);
    // },500);
  }
}
