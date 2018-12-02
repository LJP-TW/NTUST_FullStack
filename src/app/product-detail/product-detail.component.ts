import { Component, OnInit,ElementRef, AfterContentInit,  SimpleChanges, OnChanges, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDataBaseService } from '../product-data-base.service';
import { Monster } from '../monster';
import { MonsterService } from '../monster.service';
import { CategoryService } from '../category.service';
import * as $ from 'jquery'
import { Observable } from 'rxjs';
import { delay } from 'q';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../cart.service';
import { TouchSequence } from 'selenium-webdriver';
declare var $: any;
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit,OnChanges,AfterContentInit {

  public Product:Monster;

  public ImageID = 0;

  private ImageSize=400;

  //數值長條圖的最大值
  public singleValueMax = 150; //單一數值
  public combValueMax = 600;  //綜合數值
  
  public addProductNum = 1;
  colorLevel : string[] = ['#ff0000bf','orange','yellow','#19da19c9','#0000ffb8','#8511b5b8','black'];
  imageSrc : string[] =[];

  //相關產品
  relativeMonsters : Monster[] = [];
  

  constructor(private route: ActivatedRoute,
    private router:Router,
    private elementRef: ElementRef,
    private http : HttpClient,
    public cartService: CartService,
    public categoryService:CategoryService,
    public monsterService:MonsterService,
    ) {
      this.Product = this.monsterService.ExampleMonster;
    }
  
  ngOnInit() {
  


    //要更新
    this.route.params.subscribe( (data:any) => {
      // <script src="assets/js/main.js"></script>
      const sliderAffect = document.createElement('script');
      sliderAffect.type = 'text/javascript';
      sliderAffect.src = 'assets/js/main.js';
      this.elementRef.nativeElement.appendChild(sliderAffect);

      // <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      const sliderAffect2 = document.createElement('script');
      sliderAffect2.type = 'text/javascript';
      sliderAffect2.src = 'assets/js/main.js';
      this.elementRef.nativeElement.appendChild(sliderAffect2);


      
      this.monsterService.getMonstersByID(data.id).subscribe((httpData:Monster[])=>{
        //拿到產品
        this.Product = httpData[0];

        //抓圖片
        for(let i = 0 ; i < this.Product.imgNum ; i++){
            this.http.get(this.monsterService.getMonsterBase64(this.Product.id,i)).subscribe((base64_json:any)=>{
              this.imageSrc.push(base64_json.src);
            })
        }
        let QS_Relative:string='';
        //抓種類
        for(let i = 0 ; i < this.Product.attributes.length ;i++){
          for(let j = 0 ; j < this.categoryService.MonsterAttrs.length ; j++){
            if(this.Product.attributes[i].NAME == this.categoryService.MonsterAttrs[j].name){
              QS_Relative += (j+1).toString()+',';
              break;
            }
          }
        }
        QS_Relative += 'newest,';
        QS_Relative = QS_Relative.slice(0,-1);
        console.log(QS_Relative);
        this.monsterService.getMonsters(0,19,QS_Relative).subscribe((data:Monster[])=>{
          this.relativeMonsters = data;
          setTimeout(()=>{

            $("#owl-example-single").owlCarousel({
              autoPlay: true,
              center: true,
              items:4,
              pagination:false,
              navigation:true,
              navigationText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"]
            });
          },500);
          console.log(data);
        })
    //特效
        // setTimeout(()=>{ 
        //  $('#zoom_01').elevateZoom({scrollZoom :true, easing:true,tint:true, tintColour:'#FF6766',tintOpacity:0.2})
        // },500);
      },
      (error)=>{
        this.router.navigate(['**']);
      },()=>{
      })
    })
  }
  
  ngOnChanges(changes:SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log('Changes');
    for (let propName in changes) {
    let chng = changes[propName];
    let cur  = JSON.stringify(chng.currentValue);
    let prev = JSON.stringify(chng.previousValue);
    console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
    
  }
  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    console.log('test');
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    // if($('.zoomContainer').length){
    //   $('.zoomContainer').remove();
    // }
    console.log('onDestroy');
    $('#owl-example-single').remove();
  }

  ImageSwap(value){
    // $('.zoomContainer').remove();
    // $('#zoom_01').remove('elevateZoom');
    this.ImageID = value;
    // $('#zoom_01').elevateZoom({scrollZoom :true, easing:true,tint:true, tintColour:'#FF6766',tintOpacity:0.2})
  }

  ImageIndex(){
    let arr : number[] = [];
    for(let i = 0 ; i < this.Product.imgNum ; i++){
    // for(let i = 0 ; i < 3 ; i++){
      arr.push(i);
    }
    return arr;
  }

  CombScore(){
    return  this.Product.HP+this.Product.ATTACK+this.Product.DEFENSE+this.Product.SP_ATTACK+this.Product.SP_DEFENSE+this.Product.SPEED;
  }

  SingleAttrStyle(value:number){
    if(value >this.singleValueMax) value = this.singleValueMax;

    let width =  Math.ceil(value/this.singleValueMax * 100);

    let color =  this.colorLevel[Math.floor(value/(this.singleValueMax/(this.colorLevel.length-1)))];

    return { width : `${width}%` ,'background-color' : `${color}`,};
  }
  
  CombAttrStyle(value:number){
    if(value >this.combValueMax) value = this.combValueMax;

    let width =  Math.ceil(value/this.combValueMax * 100);
    
    let color =  this.colorLevel[Math.floor(value/(this.combValueMax/(this.colorLevel.length-1)))];

    return { width : `${width}%` ,'background-color' : `${color}` ,};
  }
  
  AddToCart(){
    let cpProductNum = this.addProductNum;
    if(this.addProductNum <= 0){
      return ;
    }
    else if(!this.cartService.Exist(this.Product.id)){
      cpProductNum -=1;
      this.cartService.Add(this.Product.id);      
      
    }
    setTimeout(() => {
    this.cartService.CustomPlus(this.Product.id,cpProductNum);
    }, 500); 
  }

  CategoryIconStyle(cate:string){
    let bg_color:any = this.categoryService.MonsterAttrs.filter((data)=>{
      return data.name == cate;
    })[0]; 
    bg_color = bg_color == undefined ? '#fff':bg_color.color;
    return { 'background-color' : bg_color};
  }

  NavToProducDetail(id:number){
    // $('#owl-example-single').remove();
    this.router.navigate(['/product-detail',id]);
  }
}
