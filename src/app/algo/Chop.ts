import * as math from "mathjs";

export default function chop(trueValue: number, decimalPlace: any): number {
  const decimal: number = Number(math.pow(10, decimalPlace));
  const resultChopped: number = math.floor(trueValue * decimal) / decimal;

  return resultChopped;
}
