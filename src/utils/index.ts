
export const getSizesDisposition = (i: any) => {
  i -= 1;
  let sizes: any = [];
  const reverte = !false;
  const sqNum = Number(String(Math.sqrt(i)).split(".")[0]) + 1;
  const w = (100 / sqNum) * 2;
  const s = 100 / sqNum;
  const wide = [s, w];
  const square = [s, s];
  let qWides = sqNum * sqNum - i - 1;
  let qSquares = i + 1 - qWides;
  if (i + 1 === 5)
    return [square, wide, wide, wide, wide].map((set, idx) =>
      reverte
        ? idx > 1
          ? set
          : [...set].reverse()
        : idx > 1
        ? [...set].reverse()
        : set
    );
  for (let j = 0; j < sqNum; j++) {
    sizes[j] = [];
    let t = 0;
    for (let k = 0; k < sqNum; k++) {
      if (Math.round(t) === 100) break;
      if (qWides > 0 && Math.round(t) + w <= 100) {
        sizes[j][k] = reverte ? [...wide].reverse() : wide;
        t += w;
        qWides -= 1;
      } else if (qSquares > 0) {
        t += s;
        qSquares -= 1;
        sizes[j][k] = square;
      }
    }
    sizes[j] = sizes[j].sort(() => Math.random() - 0.5);
  }
  sizes = sizes.sort(() => Math.random() - 0.5);
  sizes = sizes.flat();
  return sizes;
};