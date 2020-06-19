export function addToCartRequest(id) {
  return {
    type: '@cart/ADD_REQUEST',
    id,
  };
}

export function addToCartSucess(product) {
  return {
    type: '@cart/ADD_RESPONSE',
    product,
  };
}
export function removeFromCart(id) {
  return {
    type: '@cart/REMOVE',
    id,
  };
}

export function updateAmountRequest(id, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT_REQUEST',
    id,
    amount,
  };
}

export function updateAmountSucess(id, amount, image) {
  return {
    type: '@cart/UPDATE_AMOUNT_SUCESS',
    id,
    amount,
    image,
  };
}
