export function formatPrice(price) {
  return new Intl.NumberFormat("es-AR").format(price);
}

export const getRandomSoldAmount = () => {
  return Math.floor(Math.random() * 300);
};
