import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';

export class Utils {
  static getHttpStatusKey<T extends object, U extends keyof T>(
    obj: T,
    value: T[U],
  ) {
    return Object.keys(obj).find((key) => obj[key as U] === value) as
      | U
      | undefined;
  }

  /**
   * AES 복호화
   *
   * @param encryptedData
   * @param secretKey
   * @param iv
   * @returns
   */
  static decryptAES(
    encryptedData: string,
    secretKey: string,
    iv: string,
  ): string {
    const decipher = createDecipheriv('aes-256-cbc', secretKey, iv);
    let decryptedData = decipher.update(encryptedData, 'base64', 'utf8');
    decryptedData += decipher.final('utf8');
    return decryptedData;
  }

  /**
   * 문구 암호화
   * @param plainText
   * @param secretKey
   * @param iv
   * @returns
   */
  static createAES(plainText: string, secretKey: string, iv: string): string {
    console.log(secretKey, iv, plainText);
    const cipher = createCipheriv('aes-256-cbc', secretKey, iv);
    let result = cipher.update(plainText, 'utf-8', 'base64');
    result += cipher.final('base64');
    return result;
  }

  /**
   *
   * @param plainText
   * @param hash
   */
  static async bcryptCompare(
    plainText: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainText, hash);
  }

  /**
   * 인증 키 생성
   * @returns
   */
  static generateSecretKey(): string {
    return randomBytes(32).toString('hex').slice(0, 32);
  }

  /**
   * 인증 키 수정
   * @returns
   */
  static generateIV(): string {
    return randomBytes(16).toString('hex');
  }
}
