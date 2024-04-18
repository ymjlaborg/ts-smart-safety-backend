export class Utils {
  static getHttpStatusKey<T extends object, U extends keyof T>(
    obj: T,
    value: T[U],
  ) {
    return Object.keys(obj).find((key) => obj[key as U] === value) as
      | U
      | undefined;
  }
}
