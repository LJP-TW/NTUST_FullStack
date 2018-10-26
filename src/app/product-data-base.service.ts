import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductDataBaseService {

  constructor() { }
  Cart: number[] = [
  ];

  testCart:Object[]=[];

  Products =[
    {
      id:1, //根據全國圖鑑
      name:"妙蛙種子",//根據全國圖鑑
      price:24000,//5000 ~ 50000
      imageLoc:'images/pokemon/id001.png', //請改最後一個斜線後的內容就好，到時候請一併把圖檔跟json檔案交給我,圖片大小請盡量壓在 300*350以內
      seller:{
        username:'小智', //隨意
        likes:120, //隨意
      },
      sold: 32, //隨意
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
      price:50000,
      imageLoc:'images/pokemon/id143.png',
      seller:{
        username:'小蝸',
        likes:1110,
      },
      sold: 87,
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
      price: 5487,
      imageLoc: 'images/pokemon/id252.png',
      seller:{
          username: '小剛',
          likes: 118,
      },
      sold: 90,
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
      price: 6666,
      imageLoc: 'images/pokemon/id289.png',
      seller:{
          username: '淡定紅',
          likes: 87,
      },
      sold: 5,
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
      price: 9453,
      imageLoc: 'images/pokemon/id430.png',
      seller:{
          username: '頭頭',
          likes: 66,
      },
      sold: 77,
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
      price: 40000,
      imageLoc: 'images/pokemon/id686.png',
      seller:{
          username: '老闆',
          likes: 6689,
      },
      sold: 9054,
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
      price: 29877,
      imageLoc: 'images/pokemon/id440.png',
      seller:{
          username: '小剛',
          likes: 9713,
      },
      sold: 4657,
      discount: 50,
      attributes: ['normal'],
      characteristics: ['自然回復', '天恩', '友情防守'],
      description: '蛋蛋, 蛋蛋蛋蛋, 好想吃茶葉蛋, 好想吃坪林的茶葉蛋',
      createdAt: '2018-02-14T13:26:28.648Z',
      updatedAt: '2018-02-15T20:32:24.314Z'
    },
  
    // {
    //   id:1,
    //   name:"Nick Air",
    //   price:6000,
    //   unit:'雙',
    //   seller:{
    //     username: "鞋怪",
    //     likes:330,
    //   },
    //   sold:12,
    //   discount:20,
    //   taglist:[],
    //   description:"最新潮流Nick Air.Stephen Curry就靠它拿到冠軍戒指!",
    //   createdAt: '2018-05-11T19:41:35.917Z',
    //   updatedAt: '2018-05-11T19:49:35.917Z',
    // },
    // {
    //   id:2,
    //   name:"Yanky Shirt",
    //   price:600,
    //   unit:'件',
    //   seller:{
    //     username: "阿尼塔",
    //     likes:130,
    //   },
    //   sold:12,
    //   discount:20,
    //   taglist:[],
    //   description:"洋基紀念Ｔ恤!",
    //   createdAt: '2018-05-11T19:20:35.917Z',
    //   updatedAt: '2018-05-11T19:49:35.917Z',
    // },
    // {
    //   id:3,
    //   name:"SHIBA",
    //   price:638,
    //   unit:'件',
    //   seller:{
    //     username: "阿尼塔",
    //     likes:130,
    //   },
    //   sold:12,
    //   discount:20,
    //   taglist:[],
    //   description:"TSTING",
    //   createdAt: '2018-05-10T19:49:35.917Z',
    //   updatedAt: '2018-05-11T19:49:35.917Z',
    // },
    // {
    //   id:4,
    //   name:"SHIBA",
    //   price:638,
    //   unit:'件',
    //   seller:{
    //     username: "阿尼塔",
    //     likes:130,
    //   },
    //   sold:12,
    //   discount:20,
    //   taglist:[],
    //   description:"TSTING",
    //   createdAt: '2018-05-10T19:49:35.917Z',
    //   updatedAt: '2018-05-11T19:49:35.917Z',
    // },
    // {
    //   id:5,
    //   name:"SHIBA",
    //   price:638,
    //   unit:'件',
    //   seller:{
    //     username: "阿尼塔",
    //     likes:130,
    //   },
    //   sold:12,
    //   discount:20,
    //   taglist:[],
    //   description:"TSTING",
    //   createdAt: '2018-05-10T19:49:35.917Z',
    //   updatedAt: '2018-05-11T19:49:35.917Z',
    // },
    // {
    //   id:6,
    //   name:"SHIBA",
    //   price:638,
    //   unit:'件',
    //   seller:{
    //     username: "阿尼塔",
    //     likes:130,
    //   },
    //   sold:12,
    //   discount:20,
    //   taglist:[],
    //   description:"TSTING",
    //   createdAt: '2018-05-10T19:49:35.917Z',
    //   updatedAt: '2018-05-11T19:49:35.917Z',
    // },
    // {
    //   id:7,
    //   name:"SHIBA",
    //   price:638,
    //   unit:'件',
    //   seller:{
    //     username: "阿尼塔",
    //     likes:130,
    //   },
    //   sold:8,
    //   discount:20,
    //   taglist:[],
    //   description:"TSTING",
    //   createdAt: '2018-05-10T19:49:35.917Z',
    //   updatedAt: '2018-05-11T19:49:35.917Z',
    // },
    // {
    //   id:8,
    //   name:"SHIBA",
    //   price:638,
    //   unit:'件',
    //   seller:{
    //     username: "阿尼塔",
    //     likes:130,
    //   },
    //   sold:8,
    //   discount:20,
    //   taglist:[],
    //   description:"TSTING",
    //   createdAt: '2018-05-10T19:49:35.917Z',
    //   updatedAt: '2018-05-11T19:49:35.917Z',
    // },
    // {
    //   id:9,
    //   name:"SHIBA",
    //   price:638,
    //   unit:'件',
    //   seller:{
    //     username: "阿尼塔",
    //     likes:130,
    //   },
    //   sold:10,
    //   discount:20,
    //   taglist:[],
    //   description:"TSTING",
    //   createdAt: '2018-05-10T19:49:35.917Z',
    //   updatedAt: '2018-05-11T19:49:35.917Z',
    // },
    // {
    //   id:10,
    //   name:"SHIBA",
    //   price:638,
    //   unit:'件',
    //   seller:{
    //     username: "阿尼塔",
    //     likes:130,
    //   },
    //   sold:10,
    //   discount:20,
    //   taglist:[],
    //   description:"TSTING",
    //   createdAt: '2018-05-10T19:49:35.917Z',
    //   updatedAt: '2018-05-11T19:49:35.917Z',
    // },
    // {
    //   id:11,
    //   name:"SHIBA",
    //   price:638,
    //   unit:'件',
    //   seller:{
    //     username: "阿尼塔",
    //     likes:130,
    //   },
    //   sold:12,
    //   discount:20,
    //   taglist:[],
    //   description:"TSTING",
    //   createdAt: '2018-05-10T19:49:35.917Z',
    //   updatedAt: '2018-05-11T19:49:35.917Z',
    // },
    // {
    //   id:12,
    //   name:"SHIBA",
    //   price:638,
    //   unit:'件',
    //   seller:{
    //     username: "阿尼塔",
    //     likes:130,
    //   },
    //   sold:12,
    //   discount:20,
    //   taglist:[],
    //   description:"TSTING",
    //   createdAt: '2018-05-10T19:49:35.917Z',
    //   updatedAt: '2018-05-11T19:49:35.917Z',
    // },
    // {
    //   id:13,
    //   name:"SHIBA",
    //   price:638,
    //   unit:'件',
    //   seller:{
    //     username: "阿尼塔",
    //     likes:130,
    //   },
    //   sold:12,
    //   discount:20,
    //   taglist:[],
    //   description:"TSTING",
    //   createdAt: '2018-05-10T19:49:35.917Z',
    //   updatedAt: '2018-05-11T19:49:35.917Z',
    // },
    // {
    //   id:14,
    //   name:"SHIBA",
    //   price:638,
    //   unit:'件',
    //   seller:{
    //     username: "阿尼塔",
    //     likes:130,
    //   },
    //   sold:12,
    //   discount:20,
    //   taglist:[],
    //   description:"TSTING",
    //   createdAt: '2018-05-10T19:49:35.917Z',
    //   updatedAt: '2018-05-11T19:49:35.917Z',
    // },
    // {
    //   id:15,
    //   name:"SHIBA",
    //   price:638,
    //   unit:'件',
    //   seller:{
    //     username: "阿尼塔",
    //     likes:130,
    //   },
    //   sold:12,
    //   discount:20,
    //   taglist:[],
    //   description:"TSTING",
    //   createdAt: '2018-05-10T19:49:35.917Z',
    //   updatedAt: '2018-05-11T19:49:35.917Z',
    // },
    // {
    //   id:16,
    //   name:"SHIBA",
    //   price:638,
    //   unit:'件',
    //   seller:{
    //     username: "阿尼塔",
    //     likes:130,
    //   },
    //   sold:12,
    //   discount:20,
    //   taglist:[],
    //   description:"TSTING",
    //   createdAt: '2018-05-10T19:49:35.917Z',
    //   updatedAt: '2018-05-11T19:49:35.917Z',
    // },
    // {
    //   id:17,
    //   name:"SHIBA",
    //   price:638,
    //   unit:'件',
    //   seller:{
    //     username: "阿尼塔",
    //     likes:130,
    //   },
    //   sold:12,
    //   discount:20,
    //   taglist:[],
    //   description:"TSTING",
    //   createdAt: '2018-05-10T19:49:35.917Z',
    //   updatedAt: '2018-05-11T19:49:35.917Z',
    // },
    // {
    //   id:18,
    //   name:"SHIBA",
    //   price:638,
    //   unit:'件',
    //   seller:{
    //     username: "阿尼塔",
    //     likes:130,
    //   },
    //   sold:12,
    //   discount:20,
    //   taglist:[],
    //   description:"TSTING",
    //   createdAt: '2018-05-10T19:49:35.917Z',
    //   updatedAt: '2018-05-11T19:49:35.917Z',
    // },
    // {
    //   id:19,
    //   name:"SHIBA",
    //   price:638,
    //   unit:'件',
    //   seller:{
    //     username: "阿尼塔",
    //     likes:130,
    //   },
    //   sold:12,
    //   discount:20,
    //   taglist:[],
    //   description:"TSTING",
    //   createdAt: '2018-05-10T19:49:35.917Z',
    //   updatedAt: '2018-05-11T19:49:35.917Z',
    // },
    // {
    //   id:20,
    //   name:"SHIBA",
    //   price:638,
    //   unit:'件',
    //   seller:{
    //     username: "阿尼塔",
    //     likes:130,
    //   },
    //   sold:12,
    //   discount:20,
    //   taglist:[],
    //   description:"TSTING",
    //   createdAt: '2018-05-10T19:49:35.917Z',
    //   updatedAt: '2018-05-11T19:49:35.917Z',
    // },
    // {
    //   id:21,
    //   name:"SHIBA",
    //   price:638,
    //   unit:'件',
    //   seller:{
    //     username: "阿尼塔",
    //     likes:130,
    //   },
    //   sold:12,
    //   discount:20,
    //   taglist:[],
    //   description:"TSTING",
    //   createdAt: '2018-05-10T19:49:35.917Z',
    //   updatedAt: '2018-05-11T19:49:35.917Z',
    // },
    // {
    //   id:22,
    //   name:"SHIBA",
    //   price:638,
    //   unit:'件',
    //   seller:{
    //     username: "阿尼塔",
    //     likes:130,
    //   },
    //   sold:12,
    //   discount:20,
    //   taglist:[],
    //   description:"TSTING",
    //   createdAt: '2018-05-10T19:49:35.917Z',
    //   updatedAt: '2018-05-11T19:49:35.917Z',
    // },
    // {
    //   id:23,
    //   name:"SHIBA",
    //   price:638,
    //   unit:'件',
    //   seller:{
    //     username: "阿尼塔",
    //     likes:130,
    //   },
    //   sold:12,
    //   discount:20,
    //   taglist:[],
    //   description:"TSTING",
    //   createdAt: '2018-05-10T19:49:35.917Z',
    //   updatedAt: '2018-05-11T19:49:35.917Z',
    // },
    // {
    //   id:24,
    //   name:"SHIBA",
    //   price:638,
    //   unit:'件',
    //   seller:{
    //     username: "阿尼塔",
    //     likes:130,
    //   },
    //   sold:12,
    //   discount:20,
    //   taglist:[],
    //   description:"TSTING",
    //   createdAt: '2018-05-10T19:49:35.917Z',
    //   updatedAt: '2018-05-11T19:49:35.917Z',
    // },
    // {
    //   id:25,
    //   name:"SHIBA",
    //   price:638,
    //   unit:'件',
    //   seller:{
    //     username: "阿尼塔",
    //     likes:130,
    //   },
    //   sold:12,
    //   discount:20,
    //   taglist:[],
    //   description:"TSTING",
    //   createdAt: '2018-05-10T19:49:35.917Z',
    //   updatedAt: '2018-05-11T19:49:35.917Z',
    // },
    // {
    //   id:26,
    //   name:"SHIBA",
    //   price:638,
    //   unit:'件',
    //   seller:{
    //     username: "阿尼塔",
    //     likes:130,
    //   },
    //   sold:12,
    //   discount:20,
    //   taglist:[],
    //   description:"TSTING",
    //   createdAt: '2018-05-10T19:49:35.917Z',
    //   updatedAt: '2018-05-11T19:49:35.917Z',
    // },
    // {
    //   id:27,
    //   name:"SHIBA",
    //   price:638,
    //   unit:'件',
    //   seller:{
    //     username: "阿尼塔",
    //     likes:130,
    //   },
    //   sold:12,
    //   discount:20,
    //   taglist:[],
    //   description:"TSTING",
    //   createdAt: '2018-05-10T19:49:35.917Z',
    //   updatedAt: '2018-05-11T19:49:35.917Z',
    // },
    // {
    //   id:28,
    //   name:"SHIBA",
    //   price:638,
    //   unit:'件',
    //   seller:{
    //     username: "阿尼塔",
    //     likes:130,
    //   },
    //   sold:12,
    //   discount:20,
    //   taglist:[],
    //   description:"TSTING",
    //   createdAt: '2018-05-10T19:49:35.917Z',
    //   updatedAt: '2018-05-11T19:49:35.917Z',
    // },
    // {
    //   id:29,
    //   name:"SHIBA",
    //   price:638,
    //   unit:'件',
    //   seller:{
    //     username: "阿尼塔",
    //     likes:130,
    //   },
    //   sold:12,
    //   discount:20,
    //   taglist:[],
    //   description:"TSTING",
    //   createdAt: '2018-05-10T19:49:35.917Z',
    //   updatedAt: '2018-05-11T19:49:35.917Z',
    // },
    // {
    //   id:30,
    //   name:"SHIBA",
    //   price:638,
    //   unit:'件',
    //   seller:{
    //     username: "阿尼塔",
    //     likes:130,
    //   },
    //   sold:12,
    //   discount:20,
    //   taglist:[],
    //   description:"TSTING",
    //   createdAt: '2018-05-10T19:49:35.917Z',
    //   updatedAt: '2018-05-11T19:49:35.917Z',
    // },
    // {
    //   id:31,
    //   name:"SHIBA",
    //   price:638,
    //   unit:'件',
    //   seller:{
    //     username: "阿尼塔",
    //     likes:130,
    //   },
    //   sold:12,
    //   discount:20,
    //   taglist:[],
    //   description:"TSTING",
    //   createdAt: '2018-05-10T19:49:35.917Z',
    //   updatedAt: '2018-05-11T19:49:35.917Z',
    // },
    // {
    //   id:32,
    //   name:"SHIBA",
    //   price:638,
    //   unit:'件',
    //   seller:{
    //     username: "阿尼塔",
    //     likes:130,
    //   },
    //   sold:12,
    //   discount:20,
    //   taglist:[],
    //   description:"TSTING",
    //   createdAt: '2018-05-10T19:49:35.917Z',
    //   updatedAt: '2018-05-11T19:49:35.917Z',
    // },
    // {
    //   id:33,
    //   name:"SHIBA",
    //   price:638,
    //   unit:'件',
    //   seller:{
    //     username: "阿尼塔",
    //     likes:130,
    //   },
    //   sold:12,
    //   discount:20,
    //   taglist:[],
    //   description:"TSTING",
    //   createdAt: '2018-05-10T19:49:35.917Z',
    //   updatedAt: '2018-05-11T19:49:35.917Z',
    // },
    // {
    //   id:34,
    //   name:"SHIBA",
    //   price:638,
    //   unit:'件',
    //   seller:{
    //     username: "阿尼塔",
    //     likes:130,
    //   },
    //   sold:12,
    //   discount:20,
    //   taglist:[],
    //   description:"TSTING",
    //   createdAt: '2018-05-10T19:49:35.917Z',
    //   updatedAt: '2018-05-11T19:49:35.917Z',
    // },
    // {
    //   id:35,
    //   name:"SHIBA",
    //   price:638,
    //   unit:'件',
    //   seller:{
    //     username: "阿尼塔",
    //     likes:130,
    //   },
    //   sold:12,
    //   discount:20,
    //   taglist:[],
    //   description:"TSTING",
    //   createdAt: '2018-05-10T19:49:35.917Z',
    //   updatedAt: '2018-05-11T19:49:35.917Z',
    // },


  ];

  public SortByEarly(ASC:boolean):any{
    return this.Products.sort((n1,n2)=>{
      let d1 = new Date(n1.updatedAt);
      let d2 = new Date(n2.updatedAt);
      let reval = 0;
      let rev = ASC ? 1 : -1;
      if(d1.getTime() > d2.getTime()){
          reval  = 1 ;
      }
      else if( d1.getTime() < d2.getTime()){
          reval = -1;
      }
      return reval*rev;
    })
  }

  public SortByPrice(ASC:boolean):any{
    return this.Products.sort((n1,n2)=>{
      let reval = 0;
      let rev = ASC ? 1 : -1;
      if(n1.price < n2.price){
          reval  = 1 ;
      }
      else if( n1.price >  n2.price){
          reval = -1;
      }
      return reval*rev;
    })
  }




}
