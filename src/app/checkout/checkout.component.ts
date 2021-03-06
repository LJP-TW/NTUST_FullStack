import { CouponService } from './../coupon.service';
import { Component, OnInit } from '@angular/core';
import { ProductDataBaseService } from '../product-data-base.service';
import { Router } from '@angular/router';
import { Monster } from '../monster';
import { CartService } from '../cart.service';
import { AuthService } from '../auth.service';
import { CartItem } from '../cart-item';
import { forEach } from '@angular/router/src/utils/collection';
import { AnimationService } from '../animation.service';
import { delay } from 'q';

interface Message {
  order: string;
}
interface OrderResponse {
  status: boolean;
  message: Message;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  Data = {
    ZoneNumber: null,
    City: null,
    Zone: null,
    Address: null,
    phone: null,
    total: 0,
  };
  order: CartItem[];
  ck = false;

  // 郵遞區號是否正確
  zoneNumberValid = false;

  // 正規表達式
  // for 郵遞區號
  reg = /\d{3}/g;

  // 郵遞區號
  zoneNumbers = [
    {ZoneNumber: 100, City: '臺北市', Zone: '中正區'},
    {ZoneNumber: 103, City: '臺北市', Zone: '大同區'},
    {ZoneNumber: 104, City: '臺北市', Zone: '中山區'},
    {ZoneNumber: 105, City: '臺北市', Zone: '松山區'},
    {ZoneNumber: 106, City: '臺北市', Zone: '大安區'},
    {ZoneNumber: 108, City: '臺北市', Zone: '萬華區'},
    {ZoneNumber: 110, City: '臺北市', Zone: '信義區'},
    {ZoneNumber: 111, City: '臺北市', Zone: '士林區'},
    {ZoneNumber: 112, City: '臺北市', Zone: '北投區'},
    {ZoneNumber: 114, City: '臺北市', Zone: '內湖區'},
    {ZoneNumber: 115, City: '臺北市', Zone: '南港區'},
    {ZoneNumber: 116, City: '臺北市', Zone: '文山區'},
    {ZoneNumber: 200, City: '基隆市', Zone: '仁愛區'},
    {ZoneNumber: 201, City: '基隆市', Zone: '信義區'},
    {ZoneNumber: 202, City: '基隆市', Zone: '中正區'},
    {ZoneNumber: 203, City: '基隆市', Zone: '中山區'},
    {ZoneNumber: 204, City: '基隆市', Zone: '安樂區'},
    {ZoneNumber: 205, City: '基隆市', Zone: '暖暖區'},
    {ZoneNumber: 206, City: '基隆市', Zone: '七堵區'},
    {ZoneNumber: 207, City: '新北市', Zone: '萬里區'},
    {ZoneNumber: 208, City: '新北市', Zone: '金山區'},
    {ZoneNumber: 220, City: '新北市', Zone: '板橋區'},
    {ZoneNumber: 221, City: '新北市', Zone: '汐止區'},
    {ZoneNumber: 222, City: '新北市', Zone: '深坑區'},
    {ZoneNumber: 223, City: '新北市', Zone: '石碇區'},
    {ZoneNumber: 224, City: '新北市', Zone: '瑞芳區'},
    {ZoneNumber: 226, City: '新北市', Zone: '平溪區'},
    {ZoneNumber: 227, City: '新北市', Zone: '雙溪區'},
    {ZoneNumber: 228, City: '新北市', Zone: '貢寮區'},
    {ZoneNumber: 231, City: '新北市', Zone: '新店區'},
    {ZoneNumber: 232, City: '新北市', Zone: '坪林區'},
    {ZoneNumber: 233, City: '新北市', Zone: '烏來區'},
    {ZoneNumber: 234, City: '新北市', Zone: '永和區'},
    {ZoneNumber: 235, City: '新北市', Zone: '中和區'},
    {ZoneNumber: 236, City: '新北市', Zone: '土城區'},
    {ZoneNumber: 237, City: '新北市', Zone: '三峽區'},
    {ZoneNumber: 238, City: '新北市', Zone: '樹林區'},
    {ZoneNumber: 239, City: '新北市', Zone: '鶯歌區'},
    {ZoneNumber: 241, City: '新北市', Zone: '三重區'},
    {ZoneNumber: 242, City: '新北市', Zone: '新莊區'},
    {ZoneNumber: 243, City: '新北市', Zone: '泰山區'},
    {ZoneNumber: 244, City: '新北市', Zone: '林口區'},
    {ZoneNumber: 247, City: '新北市', Zone: '蘆洲區'},
    {ZoneNumber: 248, City: '新北市', Zone: '五股區'},
    {ZoneNumber: 249, City: '新北市', Zone: '八里區'},
    {ZoneNumber: 251, City: '新北市', Zone: '淡水區'},
    {ZoneNumber: 252, City: '新北市', Zone: '三芝區'},
    {ZoneNumber: 253, City: '新北市', Zone: '石門區'},
    {ZoneNumber: 260, City: '宜蘭縣', Zone: '宜蘭'},
    {ZoneNumber: 261, City: '宜蘭縣', Zone: '頭城'},
    {ZoneNumber: 262, City: '宜蘭縣', Zone: '礁溪'},
    {ZoneNumber: 263, City: '宜蘭縣', Zone: '壯圍'},
    {ZoneNumber: 264, City: '宜蘭縣', Zone: '員山'},
    {ZoneNumber: 265, City: '宜蘭縣', Zone: '羅東'},
    {ZoneNumber: 266, City: '宜蘭縣', Zone: '三星'},
    {ZoneNumber: 267, City: '宜蘭縣', Zone: '大同'},
    {ZoneNumber: 268, City: '宜蘭縣', Zone: '五結'},
    {ZoneNumber: 269, City: '宜蘭縣', Zone: '冬山'},
    {ZoneNumber: 270, City: '宜蘭縣', Zone: '蘇澳'},
    {ZoneNumber: 272, City: '宜蘭縣', Zone: '南澳'},
    {ZoneNumber: 290, City: '宜蘭縣', Zone: '釣魚台列嶼'},
    {ZoneNumber: 300, City: '新竹市', Zone: '新竹市'},
    {ZoneNumber: 302, City: '新竹縣', Zone: '竹北'},
    {ZoneNumber: 303, City: '新竹縣', Zone: '湖口'},
    {ZoneNumber: 304, City: '新竹縣', Zone: '新豐'},
    {ZoneNumber: 305, City: '新竹縣', Zone: '新埔'},
    {ZoneNumber: 306, City: '新竹縣', Zone: '關西'},
    {ZoneNumber: 307, City: '新竹縣', Zone: '芎林'},
    {ZoneNumber: 308, City: '新竹縣', Zone: '寶山'},
    {ZoneNumber: 310, City: '新竹縣', Zone: '竹東'},
    {ZoneNumber: 311, City: '新竹縣', Zone: '五峰'},
    {ZoneNumber: 312, City: '新竹縣', Zone: '橫山'},
    {ZoneNumber: 313, City: '新竹縣', Zone: '尖石'},
    {ZoneNumber: 314, City: '新竹縣', Zone: '北埔'},
    {ZoneNumber: 315, City: '新竹縣', Zone: '峨眉'},
    {ZoneNumber: 320, City: '桃園縣', Zone: '中壢'},
    {ZoneNumber: 324, City: '桃園縣', Zone: '平鎮'},
    {ZoneNumber: 325, City: '桃園縣', Zone: '龍潭'},
    {ZoneNumber: 326, City: '桃園縣', Zone: '楊梅'},
    {ZoneNumber: 327, City: '桃園縣', Zone: '新屋'},
    {ZoneNumber: 328, City: '桃園縣', Zone: '觀音'},
    {ZoneNumber: 330, City: '桃園縣', Zone: '桃園'},
    {ZoneNumber: 333, City: '桃園縣', Zone: '龜山'},
    {ZoneNumber: 334, City: '桃園縣', Zone: '八德'},
    {ZoneNumber: 335, City: '桃園縣', Zone: '大溪'},
    {ZoneNumber: 336, City: '桃園縣', Zone: '復興'},
    {ZoneNumber: 337, City: '桃園縣', Zone: '大園'},
    {ZoneNumber: 338, City: '桃園縣', Zone: '蘆竹'},
    {ZoneNumber: 350, City: '苗栗縣', Zone: '竹南'},
    {ZoneNumber: 351, City: '苗栗縣', Zone: '頭份'},
    {ZoneNumber: 352, City: '苗栗縣', Zone: '三灣'},
    {ZoneNumber: 353, City: '苗栗縣', Zone: '南庄'},
    {ZoneNumber: 354, City: '苗栗縣', Zone: '獅潭'},
    {ZoneNumber: 356, City: '苗栗縣', Zone: '後龍'},
    {ZoneNumber: 357, City: '苗栗縣', Zone: '通霄'},
    {ZoneNumber: 358, City: '苗栗縣', Zone: '苑裡'},
    {ZoneNumber: 360, City: '苗栗縣', Zone: '苗栗'},
    {ZoneNumber: 361, City: '苗栗縣', Zone: '造橋'},
    {ZoneNumber: 362, City: '苗栗縣', Zone: '頭屋'},
    {ZoneNumber: 363, City: '苗栗縣', Zone: '公館'},
    {ZoneNumber: 364, City: '苗栗縣', Zone: '大湖'},
    {ZoneNumber: 365, City: '苗栗縣', Zone: '泰安'},
    {ZoneNumber: 366, City: '苗栗縣', Zone: '銅鑼'},
    {ZoneNumber: 367, City: '苗栗縣', Zone: '三義'},
    {ZoneNumber: 368, City: '苗栗縣', Zone: '西湖'},
    {ZoneNumber: 369, City: '苗栗縣', Zone: '卓蘭'},
    {ZoneNumber: 400, City: '臺中市', Zone: '中區'},
    {ZoneNumber: 401, City: '臺中市', Zone: '東區'},
    {ZoneNumber: 402, City: '臺中市', Zone: '南區'},
    {ZoneNumber: 403, City: '臺中市', Zone: '西區'},
    {ZoneNumber: 404, City: '臺中市', Zone: '北區'},
    {ZoneNumber: 406, City: '臺中市', Zone: '北屯區'},
    {ZoneNumber: 407, City: '臺中市', Zone: '西屯區'},
    {ZoneNumber: 408, City: '臺中市', Zone: '南屯區'},
    {ZoneNumber: 411, City: '臺中市', Zone: '太平區'},
    {ZoneNumber: 412, City: '臺中市', Zone: '大里區'},
    {ZoneNumber: 413, City: '臺中市', Zone: '霧峰區'},
    {ZoneNumber: 414, City: '臺中市', Zone: '烏日區'},
    {ZoneNumber: 420, City: '臺中市', Zone: '豐原區'},
    {ZoneNumber: 421, City: '臺中市', Zone: '后里區'},
    {ZoneNumber: 422, City: '臺中市', Zone: '石岡區'},
    {ZoneNumber: 423, City: '臺中市', Zone: '東勢區'},
    {ZoneNumber: 424, City: '臺中市', Zone: '和平區'},
    {ZoneNumber: 426, City: '臺中市', Zone: '新社區'},
    {ZoneNumber: 427, City: '臺中市', Zone: '潭子區'},
    {ZoneNumber: 428, City: '臺中市', Zone: '大雅區'},
    {ZoneNumber: 429, City: '臺中市', Zone: '神岡區'},
    {ZoneNumber: 432, City: '臺中市', Zone: '大肚區'},
    {ZoneNumber: 433, City: '臺中市', Zone: '沙鹿區'},
    {ZoneNumber: 434, City: '臺中市', Zone: '龍井區'},
    {ZoneNumber: 435, City: '臺中市', Zone: '梧棲區'},
    {ZoneNumber: 436, City: '臺中市', Zone: '清水區'},
    {ZoneNumber: 437, City: '臺中市', Zone: '大甲區'},
    {ZoneNumber: 438, City: '臺中市', Zone: '外埔區'},
    {ZoneNumber: 439, City: '臺中市', Zone: '大安區'},
    {ZoneNumber: 500, City: '彰化縣', Zone: '彰化'},
    {ZoneNumber: 502, City: '彰化縣', Zone: '芬園'},
    {ZoneNumber: 503, City: '彰化縣', Zone: '花壇'},
    {ZoneNumber: 504, City: '彰化縣', Zone: '秀水'},
    {ZoneNumber: 505, City: '彰化縣', Zone: '鹿港'},
    {ZoneNumber: 506, City: '彰化縣', Zone: '福興'},
    {ZoneNumber: 507, City: '彰化縣', Zone: '線西'},
    {ZoneNumber: 508, City: '彰化縣', Zone: '和美'},
    {ZoneNumber: 509, City: '彰化縣', Zone: '伸港'},
    {ZoneNumber: 510, City: '彰化縣', Zone: '員林'},
    {ZoneNumber: 511, City: '彰化縣', Zone: '社頭'},
    {ZoneNumber: 512, City: '彰化縣', Zone: '永靖'},
    {ZoneNumber: 513, City: '彰化縣', Zone: '埔心'},
    {ZoneNumber: 514, City: '彰化縣', Zone: '溪湖'},
    {ZoneNumber: 515, City: '彰化縣', Zone: '大村'},
    {ZoneNumber: 516, City: '彰化縣', Zone: '埔鹽'},
    {ZoneNumber: 520, City: '彰化縣', Zone: '田中'},
    {ZoneNumber: 521, City: '彰化縣', Zone: '北斗'},
    {ZoneNumber: 522, City: '彰化縣', Zone: '田尾'},
    {ZoneNumber: 523, City: '彰化縣', Zone: '埤頭'},
    {ZoneNumber: 524, City: '彰化縣', Zone: '溪州'},
    {ZoneNumber: 525, City: '彰化縣', Zone: '竹塘'},
    {ZoneNumber: 526, City: '彰化縣', Zone: '二林'},
    {ZoneNumber: 527, City: '彰化縣', Zone: '大城'},
    {ZoneNumber: 528, City: '彰化縣', Zone: '芳苑'},
    {ZoneNumber: 530, City: '彰化縣', Zone: '二水'},
    {ZoneNumber: 540, City: '南投縣', Zone: '南投'},
    {ZoneNumber: 541, City: '南投縣', Zone: '中寮'},
    {ZoneNumber: 542, City: '南投縣', Zone: '草屯'},
    {ZoneNumber: 544, City: '南投縣', Zone: '國姓'},
    {ZoneNumber: 545, City: '南投縣', Zone: '埔里'},
    {ZoneNumber: 546, City: '南投縣', Zone: '仁愛'},
    {ZoneNumber: 551, City: '南投縣', Zone: '名間'},
    {ZoneNumber: 552, City: '南投縣', Zone: '集集'},
    {ZoneNumber: 553, City: '南投縣', Zone: '水里'},
    {ZoneNumber: 555, City: '南投縣', Zone: '魚池'},
    {ZoneNumber: 556, City: '南投縣', Zone: '信義'},
    {ZoneNumber: 557, City: '南投縣', Zone: '竹山'},
    {ZoneNumber: 558, City: '南投縣', Zone: '鹿谷'},
    {ZoneNumber: 600, City: '嘉義市', Zone: '嘉義市'},
    {ZoneNumber: 602, City: '嘉義縣', Zone: '番路'},
    {ZoneNumber: 603, City: '嘉義縣', Zone: '梅山'},
    {ZoneNumber: 604, City: '嘉義縣', Zone: '竹崎'},
    {ZoneNumber: 605, City: '嘉義縣', Zone: '阿里山'},
    {ZoneNumber: 606, City: '嘉義縣', Zone: '中埔'},
    {ZoneNumber: 607, City: '嘉義縣', Zone: '大埔'},
    {ZoneNumber: 608, City: '嘉義縣', Zone: '水上'},
    {ZoneNumber: 611, City: '嘉義縣', Zone: '鹿草'},
    {ZoneNumber: 612, City: '嘉義縣', Zone: '太保'},
    {ZoneNumber: 613, City: '嘉義縣', Zone: '朴子'},
    {ZoneNumber: 614, City: '嘉義縣', Zone: '東石'},
    {ZoneNumber: 615, City: '嘉義縣', Zone: '六腳'},
    {ZoneNumber: 616, City: '嘉義縣', Zone: '新港'},
    {ZoneNumber: 621, City: '嘉義縣', Zone: '民雄'},
    {ZoneNumber: 622, City: '嘉義縣', Zone: '大林'},
    {ZoneNumber: 623, City: '嘉義縣', Zone: '溪口'},
    {ZoneNumber: 624, City: '嘉義縣', Zone: '義竹'},
    {ZoneNumber: 625, City: '嘉義縣', Zone: '布袋'},
    {ZoneNumber: 630, City: '雲林縣', Zone: '斗南'},
    {ZoneNumber: 631, City: '雲林縣', Zone: '大埤'},
    {ZoneNumber: 632, City: '雲林縣', Zone: '虎尾'},
    {ZoneNumber: 633, City: '雲林縣', Zone: '土庫'},
    {ZoneNumber: 634, City: '雲林縣', Zone: '褒忠'},
    {ZoneNumber: 635, City: '雲林縣', Zone: '東勢'},
    {ZoneNumber: 636, City: '雲林縣', Zone: '臺西'},
    {ZoneNumber: 637, City: '雲林縣', Zone: '崙背'},
    {ZoneNumber: 638, City: '雲林縣', Zone: '麥寮'},
    {ZoneNumber: 640, City: '雲林縣', Zone: '斗六'},
    {ZoneNumber: 643, City: '雲林縣', Zone: '林內'},
    {ZoneNumber: 646, City: '雲林縣', Zone: '古坑'},
    {ZoneNumber: 647, City: '雲林縣', Zone: '莿桐'},
    {ZoneNumber: 648, City: '雲林縣', Zone: '西螺'},
    {ZoneNumber: 649, City: '雲林縣', Zone: '二崙'},
    {ZoneNumber: 651, City: '雲林縣', Zone: '北港'},
    {ZoneNumber: 652, City: '雲林縣', Zone: '水林'},
    {ZoneNumber: 653, City: '雲林縣', Zone: '口湖'},
    {ZoneNumber: 654, City: '雲林縣', Zone: '四湖'},
    {ZoneNumber: 655, City: '雲林縣', Zone: '元長'},
    {ZoneNumber: 700, City: '臺南市', Zone: '中西區'},
    {ZoneNumber: 701, City: '臺南市', Zone: '東區'},
    {ZoneNumber: 702, City: '臺南市', Zone: '南區'},
    {ZoneNumber: 704, City: '臺南市', Zone: '北區'},
    {ZoneNumber: 708, City: '臺南市', Zone: '安平區'},
    {ZoneNumber: 709, City: '臺南市', Zone: '安南區'},
    {ZoneNumber: 710, City: '臺南市', Zone: '永康區'},
    {ZoneNumber: 711, City: '臺南市', Zone: '歸仁區'},
    {ZoneNumber: 712, City: '臺南市', Zone: '新化區'},
    {ZoneNumber: 713, City: '臺南市', Zone: '左鎮區'},
    {ZoneNumber: 714, City: '臺南市', Zone: '玉井區'},
    {ZoneNumber: 715, City: '臺南市', Zone: '楠西區'},
    {ZoneNumber: 716, City: '臺南市', Zone: '南化區'},
    {ZoneNumber: 717, City: '臺南市', Zone: '仁德區'},
    {ZoneNumber: 718, City: '臺南市', Zone: '關廟區'},
    {ZoneNumber: 719, City: '臺南市', Zone: '龍崎區'},
    {ZoneNumber: 720, City: '臺南市', Zone: '官田區'},
    {ZoneNumber: 721, City: '臺南市', Zone: '麻豆區'},
    {ZoneNumber: 722, City: '臺南市', Zone: '佳里區'},
    {ZoneNumber: 723, City: '臺南市', Zone: '西港區'},
    {ZoneNumber: 724, City: '臺南市', Zone: '七股區'},
    {ZoneNumber: 725, City: '臺南市', Zone: '將軍區'},
    {ZoneNumber: 726, City: '臺南市', Zone: '學甲區'},
    {ZoneNumber: 727, City: '臺南市', Zone: '北門區'},
    {ZoneNumber: 730, City: '臺南市', Zone: '新營區'},
    {ZoneNumber: 731, City: '臺南市', Zone: '後壁區'},
    {ZoneNumber: 732, City: '臺南市', Zone: '白河區'},
    {ZoneNumber: 733, City: '臺南市', Zone: '東山區'},
    {ZoneNumber: 734, City: '臺南市', Zone: '六甲區'},
    {ZoneNumber: 735, City: '臺南市', Zone: '下營區'},
    {ZoneNumber: 736, City: '臺南市', Zone: '柳營區'},
    {ZoneNumber: 737, City: '臺南市', Zone: '鹽水區'},
    {ZoneNumber: 741, City: '臺南市', Zone: '善化區'},
    {ZoneNumber: 742, City: '臺南市', Zone: '大內區'},
    {ZoneNumber: 743, City: '臺南市', Zone: '山上區'},
    {ZoneNumber: 744, City: '臺南市', Zone: '新市區'},
    {ZoneNumber: 745, City: '臺南市', Zone: '安定區'},
    {ZoneNumber: 800, City: '高雄市', Zone: '新興區'},
    {ZoneNumber: 801, City: '高雄市', Zone: '前金區'},
    {ZoneNumber: 802, City: '高雄市', Zone: '苓雅區'},
    {ZoneNumber: 803, City: '高雄市', Zone: '鹽埕區'},
    {ZoneNumber: 804, City: '高雄市', Zone: '鼓山區'},
    {ZoneNumber: 805, City: '高雄市', Zone: '旗津區'},
    {ZoneNumber: 806, City: '高雄市', Zone: '前鎮區'},
    {ZoneNumber: 807, City: '高雄市', Zone: '三民區'},
    {ZoneNumber: 811, City: '高雄市', Zone: '楠梓區'},
    {ZoneNumber: 812, City: '高雄市', Zone: '小港區'},
    {ZoneNumber: 813, City: '高雄市', Zone: '左營區'},
    {ZoneNumber: 814, City: '高雄市', Zone: '仁武區'},
    {ZoneNumber: 815, City: '高雄市', Zone: '大社區'},
    {ZoneNumber: 820, City: '高雄市', Zone: '岡山區'},
    {ZoneNumber: 821, City: '高雄市', Zone: '路竹區'},
    {ZoneNumber: 822, City: '高雄市', Zone: '阿蓮區'},
    {ZoneNumber: 823, City: '高雄市', Zone: '田寮區'},
    {ZoneNumber: 824, City: '高雄市', Zone: '燕巢區'},
    {ZoneNumber: 825, City: '高雄市', Zone: '橋頭區'},
    {ZoneNumber: 826, City: '高雄市', Zone: '梓官區'},
    {ZoneNumber: 827, City: '高雄市', Zone: '彌陀區'},
    {ZoneNumber: 828, City: '高雄市', Zone: '永安區'},
    {ZoneNumber: 829, City: '高雄市', Zone: '湖內區'},
    {ZoneNumber: 830, City: '高雄市', Zone: '鳳山區'},
    {ZoneNumber: 831, City: '高雄市', Zone: '大寮區'},
    {ZoneNumber: 832, City: '高雄市', Zone: '林園區'},
    {ZoneNumber: 833, City: '高雄市', Zone: '鳥松區'},
    {ZoneNumber: 840, City: '高雄市', Zone: '大樹區'},
    {ZoneNumber: 842, City: '高雄市', Zone: '旗山區'},
    {ZoneNumber: 843, City: '高雄市', Zone: '美濃區'},
    {ZoneNumber: 844, City: '高雄市', Zone: '六龜區'},
    {ZoneNumber: 845, City: '高雄市', Zone: '內門區'},
    {ZoneNumber: 846, City: '高雄市', Zone: '杉林區'},
    {ZoneNumber: 847, City: '高雄市', Zone: '甲仙區'},
    {ZoneNumber: 848, City: '高雄市', Zone: '桃源區'},
    {ZoneNumber: 849, City: '高雄市', Zone: '那瑪夏區'},
    {ZoneNumber: 851, City: '高雄市', Zone: '茂林區'},
    {ZoneNumber: 852, City: '高雄市', Zone: '茄萣區'},
    {ZoneNumber: 817, City: '南海諸島', Zone: '東沙'},
    {ZoneNumber: 819, City: '南海諸島', Zone: '南沙'},
    {ZoneNumber: 880, City: '澎湖縣', Zone: '馬公'},
    {ZoneNumber: 881, City: '澎湖縣', Zone: '西嶼'},
    {ZoneNumber: 882, City: '澎湖縣', Zone: '望安'},
    {ZoneNumber: 883, City: '澎湖縣', Zone: '七美'},
    {ZoneNumber: 884, City: '澎湖縣', Zone: '白沙'},
    {ZoneNumber: 885, City: '澎湖縣', Zone: '湖西'},
    {ZoneNumber: 900, City: '屏東縣', Zone: '屏東'},
    {ZoneNumber: 901, City: '屏東縣', Zone: '三地門'},
    {ZoneNumber: 902, City: '屏東縣', Zone: '霧臺'},
    {ZoneNumber: 903, City: '屏東縣', Zone: '瑪家'},
    {ZoneNumber: 904, City: '屏東縣', Zone: '九如'},
    {ZoneNumber: 905, City: '屏東縣', Zone: '里港'},
    {ZoneNumber: 906, City: '屏東縣', Zone: '高樹'},
    {ZoneNumber: 907, City: '屏東縣', Zone: '盬埔'},
    {ZoneNumber: 908, City: '屏東縣', Zone: '長治'},
    {ZoneNumber: 909, City: '屏東縣', Zone: '麟洛'},
    {ZoneNumber: 911, City: '屏東縣', Zone: '竹田'},
    {ZoneNumber: 912, City: '屏東縣', Zone: '內埔'},
    {ZoneNumber: 913, City: '屏東縣', Zone: '萬丹'},
    {ZoneNumber: 920, City: '屏東縣', Zone: '潮州'},
    {ZoneNumber: 921, City: '屏東縣', Zone: '泰武'},
    {ZoneNumber: 922, City: '屏東縣', Zone: '來義'},
    {ZoneNumber: 923, City: '屏東縣', Zone: '萬巒'},
    {ZoneNumber: 924, City: '屏東縣', Zone: '崁頂'},
    {ZoneNumber: 925, City: '屏東縣', Zone: '新埤'},
    {ZoneNumber: 926, City: '屏東縣', Zone: '南州'},
    {ZoneNumber: 927, City: '屏東縣', Zone: '林邊'},
    {ZoneNumber: 928, City: '屏東縣', Zone: '東港'},
    {ZoneNumber: 929, City: '屏東縣', Zone: '琉球'},
    {ZoneNumber: 931, City: '屏東縣', Zone: '佳冬'},
    {ZoneNumber: 932, City: '屏東縣', Zone: '新園'},
    {ZoneNumber: 940, City: '屏東縣', Zone: '枋寮'},
    {ZoneNumber: 941, City: '屏東縣', Zone: '枋山'},
    {ZoneNumber: 942, City: '屏東縣', Zone: '春日'},
    {ZoneNumber: 943, City: '屏東縣', Zone: '獅子'},
    {ZoneNumber: 944, City: '屏東縣', Zone: '車城'},
    {ZoneNumber: 945, City: '屏東縣', Zone: '牡丹'},
    {ZoneNumber: 946, City: '屏東縣', Zone: '恆春'},
    {ZoneNumber: 947, City: '屏東縣', Zone: '滿州'},
    {ZoneNumber: 950, City: '臺東縣', Zone: '臺東'},
    {ZoneNumber: 951, City: '臺東縣', Zone: '綠島'},
    {ZoneNumber: 952, City: '臺東縣', Zone: '蘭嶼'},
    {ZoneNumber: 953, City: '臺東縣', Zone: '延平'},
    {ZoneNumber: 954, City: '臺東縣', Zone: '卑南'},
    {ZoneNumber: 955, City: '臺東縣', Zone: '鹿野'},
    {ZoneNumber: 956, City: '臺東縣', Zone: '關山'},
    {ZoneNumber: 957, City: '臺東縣', Zone: '海端'},
    {ZoneNumber: 958, City: '臺東縣', Zone: '池上'},
    {ZoneNumber: 959, City: '臺東縣', Zone: '東河'},
    {ZoneNumber: 961, City: '臺東縣', Zone: '成功'},
    {ZoneNumber: 962, City: '臺東縣', Zone: '長濱'},
    {ZoneNumber: 963, City: '臺東縣', Zone: '太麻里'},
    {ZoneNumber: 964, City: '臺東縣', Zone: '金峰'},
    {ZoneNumber: 965, City: '臺東縣', Zone: '大武'},
    {ZoneNumber: 966, City: '臺東縣', Zone: '達仁'},
    {ZoneNumber: 970, City: '花蓮縣', Zone: '花蓮'},
    {ZoneNumber: 971, City: '花蓮縣', Zone: '新城'},
    {ZoneNumber: 972, City: '花蓮縣', Zone: '秀林'},
    {ZoneNumber: 973, City: '花蓮縣', Zone: '吉安'},
    {ZoneNumber: 974, City: '花蓮縣', Zone: '壽豐'},
    {ZoneNumber: 975, City: '花蓮縣', Zone: '鳳林'},
    {ZoneNumber: 976, City: '花蓮縣', Zone: '光復'},
    {ZoneNumber: 977, City: '花蓮縣', Zone: '豐濱'},
    {ZoneNumber: 978, City: '花蓮縣', Zone: '瑞穗'},
    {ZoneNumber: 979, City: '花蓮縣', Zone: '萬榮'},
    {ZoneNumber: 981, City: '花蓮縣', Zone: '玉里'},
    {ZoneNumber: 982, City: '花蓮縣', Zone: '卓溪'},
    {ZoneNumber: 983, City: '花蓮縣', Zone: '富里'},
    {ZoneNumber: 890, City: '金門縣', Zone: '金沙'},
    {ZoneNumber: 891, City: '金門縣', Zone: '金湖'},
    {ZoneNumber: 892, City: '金門縣', Zone: '金寧'},
    {ZoneNumber: 893, City: '金門縣', Zone: '金城'},
    {ZoneNumber: 894, City: '金門縣', Zone: '烈嶼'},
    {ZoneNumber: 896, City: '金門縣', Zone: '烏坵'},
    {ZoneNumber: 209, City: '連江縣', Zone: '南竿'},
    {ZoneNumber: 210, City: '連江縣', Zone: '北竿'},
    {ZoneNumber: 211, City: '連江縣', Zone: '莒光'},
    {ZoneNumber: 212, City: '連江縣', Zone: '東引'},
  ];

  constructor(public cartService: CartService,
              public authService: AuthService,
              public couponService: CouponService,
              public animationService: AnimationService,
              private router: Router) { }

  ngOnInit() {
    if (this.authService.LoggedInRedirect()) {
      return;
    }

    if (this.cartService.cart.length === 0) {
      this.router.navigate(['/category']);
      return;
    }

    this.cartService.UpdateFunc();
    this.cartService.GetFromDB();
    this.Data.total = this.cartService.totalPrice,
    this.order = this.cartService.cart;
    console.log(this.order);
  }

  ZoneNumberUpdate() {
    if (this.reg.test(this.Data.ZoneNumber)) {
      this.Data.City = null;
      this.Data.Zone = null;
      this.zoneNumberValid = false;
      for (let i = 0; i < this.zoneNumbers.length; ++i) {
        if (this.zoneNumbers[i].ZoneNumber === Number(this.Data.ZoneNumber)) {
          this.Data.City = this.zoneNumbers[i].City;
          this.Data.Zone = this.zoneNumbers[i].Zone;
          this.zoneNumberValid = true;
          break;
        }
      }
    }
  }

  output() {
    if (this.zoneNumberValid) {
      const order = {
        Address: this.Data.City + this.Data.Zone + this.Data.Address,
        Phone: this.Data.phone,
        Coupons: this.couponService.used_coupons_id
      };
      this.cartService.MakeOrder(order).subscribe((data: OrderResponse) => {
        if (data.status) {
          this.animationService.ScreenCenter("assets/img/pika_love.gif",2200,300,350);
          
          // alert('下單成功!');
          this.cartService.GetFromDB();
          this.couponService.getFromDB();
          this.router.navigate(['/']);
        } else {
          alert('fail, check again!');
        }
      });
      console.log(this.Data);
    }
  }
}
