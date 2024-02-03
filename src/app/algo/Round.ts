import * as math from "mathjs";

export default function round(trueValue: number, decimalPlace: number): number {
  const decimal = Number(math.pow(10, decimalPlace));
  const rounded = Math.round(trueValue * decimal) / decimal;
  return rounded;
}
