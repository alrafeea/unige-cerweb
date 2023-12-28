import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor() {}

  static encryptStringByAES(string: String) {
    var key = 'yE9tgqNxWcYDTSPNM+EGQw=='; //length=22
    var iv = '8PzGKSMLuqSm0MVbviaWHA=='; //length=22

    key = CryptoJS.enc.Base64.parse(key);
    // key is now e8b7b40e031300000000da247441226a, length=32
    iv = CryptoJS.enc.Base64.parse(iv);
    // iv is now 987185c4436764b6e27a72f2fffffffd, length=32

    var cipherData = CryptoJS.AES.encrypt(string, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CTR,
    }).toString();
    // console.log('string:' + string);

    // console.log('ciphertext11:' + cipherData.replaceAll('/', ''));
    return cipherData.replaceAll('/', '');
  }
}
