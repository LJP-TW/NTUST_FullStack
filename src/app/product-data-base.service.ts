import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductDataBaseService {

  constructor() { 
    console.log('DATABAE INIT');
    this.Products.forEach((n)=>{
      n.price = Math.ceil(n.originPrice * (100-n.discount) /100);
    });
    this.Products = this.Products.sort((n1,n2)=>{
      if(n1.id>n2.id){
        return 1;
      }
      else if(n1.id < n2.id){
        return -1;
      }
      return 0;
    })
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
  }
  Cart: number[] = [
  ];

  //product,amount,finalPrice,total
  odCart = [];

  //id,name,price,originPrice,imageLoc,discount,description,
  //attributes['string'],characteristics['string']
  //seller{username,likes}
  //createdAt,updatedAt
  Products =[
    {
      id:1, //根據全國圖鑑
      name:"妙蛙種子",//根據全國圖鑑
      originPrice:24000,//5000 ~ 50000
      imageLoc:'images/pokemon/id001.png', //請改最後一個斜線後的內容就好，到時候請一併把圖檔跟json檔案交給我,圖片大小請盡量壓在 300*350以內
      seller:{
        username:'小智', //隨意
        likes:120, //隨意
      },
      price: 32, //隨意
      discount: 20, // 0 ~ 80 請不要填負數
      attributes:['poison','grass'], //根據全國圖鑑
      characteristics : ['茂盛'],  //根據全國圖鑑
      description:'超想要的拉~在台科大抓到的妙蛙種子，是不是很稀有R?', //隨意能填寫盡量寫
      createdAt: '2018-05-11T19:40:35.917Z',//隨意，注意->有些月份沒有31天/每一天只有24小時/每小時只有60分鐘/每分鐘只有60秒
      updatedAt: '2018-05-13T19:49:35.917Z',//請幫我填寫日期+2天，要幫我注意一下符合日期邏輯.
    },
    {
      id:143,
      name:"卡比獸",
      originPrice:50000,
      imageLoc:'images/pokemon/id143.png',
      seller:{
        username:'小蝸',
        likes:1110,
      },
      price: 87,
      discount: 0,
      attributes:['normal'],
      characteristics : ['免疫','厚脂肪'],
      description:'超想要的拉~在台科大抓到的妙蛙種子，是不是很稀有R?',
      createdAt: '2018-07-31T19:40:35.917Z',
      updatedAt: '2018-08-3T9:06:35.917Z',
    },
    {
      id: 252,
      name: '木守宮',
      originPrice: 5487,
      imageLoc: 'images/pokemon/id252.png',
      seller:{
          username: '小剛',
          likes: 118,
      },
      price: 90,
      discount: 10,
      attributes: ['grass'],
      characteristics: ['茂盛', '輕裝'],
      description: '資工系學會饒了我吧, 饒了我吧饒了我吧, 守宮守宮, 慈母手中線',
      createdAt: '2018-03-12T15:30:22.123Z',
      updatedAt: '2018-03-13T23:11:24.552Z'
    },
    {
      id: 289,
      name: '請假王',
      originPrice: 6666,
      imageLoc: 'images/pokemon/id289.png',
      seller:{
          username: '淡定紅',
          likes: 87,
      },
      price: 5,
      discount: 1,
      attributes: ['normal'],
      characteristics: ['懶惰'],
      description: '懶到爆的生物, 超廢, 急脫手, 拜託啦',
      createdAt: '2018-01-2T01:30:22.823Z',
      updatedAt: '2018-01-3T23:11:00.542Z'
    },
    {
      id: 430,
      name: '烏鴉頭頭',
      originPrice: 9453,
      imageLoc: 'images/pokemon/id430.png',
      seller:{
          username: '頭頭',
          likes: 66,
      },
      price: 77,
      discount: 30,
      attributes: ['demon', 'fly'],
      characteristics: ['不眠', '自信過度'],
      description: '烏鴉烏鴉頭頭烏鴉頭, 頭頭頭頭屋烏鴉, 烏鴉頭壓頭獸',
      createdAt: '2018-12-2T10:03:22.823Z',
      updatedAt: '2018-12-4T23:48:00.542Z'
    },
    {
      id: 686,
      name: '好啦魷',
      originPrice: 40000,
      imageLoc: 'images/pokemon/id686.png',
      seller:{
          username: '老闆',
          likes: 6689,
      },
      price: 9054,
      discount: 80,
      attributes: ['demon', 'super'],
      characteristics: ['唱反調', '吸盤', '穿透'],
      description: '好啦, 買了啦, 一隻烤魷魚才算你40000塊錢, 秀啦好啦魷',
      createdAt: '2018-07-2T12:30:00.823Z',
      updatedAt: '2018-07-4T11:11:11.542Z'
    },
    {
      id: 440,
      name: '小福蛋',
      originPrice: 29877,
      imageLoc: 'images/pokemon/id440.png',
      seller:{
          username: '小剛',
          likes: 9713,
      },
      price: 4657,
      discount: 50,
      attributes: ['normal'],
      characteristics: ['自然回復', '天恩', '友情防守'],
      description: '蛋蛋, 蛋蛋蛋蛋, 好想吃茶葉蛋, 好想吃坪林的茶葉蛋',
      createdAt: '2018-02-14T13:26:28.648Z',
      updatedAt: '2018-02-15T20:32:24.314Z'
    },
    {
      id:25,
      name: "皮卡丘",
      originPrice: 35000,
      imageLoc:'images/pokemon/id025.png',    
      seller:{
        username: '皮卡兵',
        likes: 200,
      },
      price: 30, 
      discount: 30,
      attributes:['electric'],
      characteristics : ['靜電'],
      description:'皮卡丘，十萬伏特！',
      createdAt: '2017-10-10T10:10:10.900Z',
      updatedAt: '2017-10-12T10:10:10.900Z',
},
{
      id:38,
      name: "九尾",
      originPrice: 10000,
      imageLoc:'images/pokemon/id038.png', 
      seller:{
        username: '鳴人',
        likes: 88,
      },
      price: 8,
      discount: 9,
      attributes:['fire'],
      characteristics : ['引火'],
      description:'從火影忍者穿越來神奇寶貝打道館賽的九尾',
      createdAt: '2018-04-02T19:40:35.917Z',
      updatedAt: '2018-04-04T07:33:42.666Z',
},
{
      id: 83,
      name: "大蔥鴨",
      originPrice: 12345,
      imageLoc:'images/pokemon/id083.png', 
      seller:{
        username: '初音',
        likes: 66,
      },
      price: 45,
      discount: 68,
      attributes:['normal', 'flying'],
      characteristics : ['目光銳利', '精神力'],
      description: '聽說大蔥鴨的蔥是從初音那邊搶來的，稀有吧！',
      createdAt: '2018-06-06T06:36:45.333Z',
      updatedAt: '2018-06-08T19:03:33.456Z',
},
{
      id: 94,
      name: "耿鬼",
      originPrice: 23456,
      imageLoc:'images/pokemon/id094.png', 
      seller:{
        username: '安娜貝爾',
        likes: 38,
      },
      price: 40,
      discount: 50, 
      attributes:['ghost', 'poison'],
      characteristics : [ '詛咒之軀' ],
      description: '萬聖節快到了，買來嚇人剛剛好',
      createdAt: '2017-10-31T00:00:00.123Z',
      updatedAt: '2017-11-02T11:11:11.111Z',
},
{
      id: 722,
      name: "木木梟",
      originPrice: 46666,
      imageLoc:'images/pokemon/id722.png', 
      seller:{
        username: '目暮警官',
        likes: 235,
      },
      price: 68,
      discount: 32,
      attributes:['grass', 'flying'],
      characteristics : ['茂盛'],
      description: '目暮警官養的寵物，放生到這裡後變成神奇寶貝',
      createdAt: '2018-07-07T19:17:07.777Z',
      updatedAt: '2018-07-09T19:09:39.999Z',
},
  
]


  CartRemove(index:number){
    console.log(index);
    return this.odCart.splice(index,1);
  }

}
