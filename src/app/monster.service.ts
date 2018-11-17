import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {

  tempMonsters = [
    {
      id: 1, // 根據全國圖鑑
      imgLoc: 'assets/images/pokemon/id001.png', // 請改最後一個斜線後的內容就好，到時候請一併把圖檔跟json檔案交給我,圖片大小請盡量壓在 300*350以內
      HP: 200,
      ATTACK: 150,
      DEFENSE: 40,
      SP_ATTACK: 230,
      SP_DEFENSE: 76,
      SPEED: 30,
      sold: 30,
      discount: 20,
      price: 24000,
      description: '超想要的拉~在台科大抓到的妙蛙種子，是不是很稀有R?', // 隨意能填寫盡量寫
      createdAt: '2018-05-11T19:40:35.917Z', // 隨意，注意->有些月份沒有31天/每一天只有24小時/每小時只有60分鐘/每分鐘只有60秒
      updatedAt: '2018-05-13T19:49:35.917Z', // 請幫我填寫日期+2天，要幫我注意一下符合日期邏輯.
    },
    {
      id: 2, // 根據全國圖鑑
      imgLoc: 'assets/images/pokemon/id002.png', // 請改最後一個斜線後的內容就好，到時候請一併把圖檔跟json檔案交給我,圖片大小請盡量壓在 300*350以內
      HP: 200,
      ATTACK: 150,
      DEFENSE: 40,
      SP_ATTACK: 230,
      SP_DEFENSE: 76,
      SPEED: 30,
      sold: 30,
      discount: 20,
      price: 24000,
      description: '超想要的拉~在台科大抓到的妙蛙種子，是不是很稀有R?', // 隨意能填寫盡量寫
      createdAt: '2018-05-11T19:40:35.917Z', // 隨意，注意->有些月份沒有31天/每一天只有24小時/每小時只有60分鐘/每分鐘只有60秒
      updatedAt: '2018-05-13T19:49:35.917Z', // 請幫我填寫日期+2天，要幫我注意一下符合日期邏輯.
    },
    {
      id: 3, // 根據全國圖鑑
      imgLoc: 'assets/images/pokemon/id003.png', // 請改最後一個斜線後的內容就好，到時候請一併把圖檔跟json檔案交給我,圖片大小請盡量壓在 300*350以內
      HP: 200,
      ATTACK: 150,
      DEFENSE: 40,
      SP_ATTACK: 230,
      SP_DEFENSE: 76,
      SPEED: 30,
      sold: 30,
      discount: 20,
      price: 24000,
      description: '超想要的拉~在台科大抓到的妙蛙種子，是不是很稀有R?', // 隨意能填寫盡量寫
      createdAt: '2018-05-11T19:40:35.917Z', // 隨意，注意->有些月份沒有31天/每一天只有24小時/每小時只有60分鐘/每分鐘只有60秒
      updatedAt: '2018-05-13T19:49:35.917Z', // 請幫我填寫日期+2天，要幫我注意一下符合日期邏輯.
    }
  ];

  constructor(private httpClient: HttpClient) { }

  /**
   * 從後端資料庫取得所有 Monsters 的ID、名字、屬性、圖片、價格、折扣、Created 時間
   *
   * @returns Monsters[]
   */
  getMonsters() {
    // return this.httpClient.get('http://localhost:8000/api/products');
    return this.tempMonsters;
  }

  /**
   * 從後端資料庫取得特定 ID 之 Monster 的ID、名字、屬性、更多圖片、價格、折扣、描述
   *
   * @param id: number
   * @returns Monster
   */
  getMonster(id) {
    // return this.httpClient.get(`http://localhost:8000/api/products/${id}`);
    return this.tempMonsters[id];
  }
}
