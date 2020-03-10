export const p = (promise: Promise<any>): Promise<any> =>
  promise.then((data) => [null, data]).catch((err) => [err]);

export const randomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
};
