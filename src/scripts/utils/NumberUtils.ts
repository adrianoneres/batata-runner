export const randomNumber = (min: number, max: number) => {
  return min + Math.round(Math.random() * (max - min));
};
