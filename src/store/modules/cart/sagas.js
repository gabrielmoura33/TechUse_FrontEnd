import { call, put, all, takeLatest, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';
// // import history from '../../../services/history';
import { formatPrice } from '../../../util/format';
import { addToCartSucess, updateAmountSucess } from './actions';

function* addToCart({ id }) {
  const response = yield call(api.get, `/products/${id}`);
  const productExists = yield select((state) =>
    state.cart.find((p) => p.id === id)
  );

  const user = yield JSON.parse(localStorage.getItem(`UsuarioLogado`));

  const productAmount = yield JSON.parse(
    localStorage.getItem(`Product/${response.data.id}/Amount`)
  );

  const currentAmount = productExists ? productAmount.amount : 0;

  const amount = currentAmount + 1;

  if (productExists) {
    localStorage.setItem(
      `Product/${response.data.id}/Amount`,
      JSON.stringify({
        productId: response.data.id,
        amount,
        userID: user.id,
      })
    );
    yield put(updateAmountSucess(id, amount));
  } else {
    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
      userID: user.id,
    };
    localStorage.setItem(
      `Product/${response.data.id}/Amount`,
      JSON.stringify({
        productId: response.data.id,
        amount,
        userID: user.id,
      })
    );
    yield put(addToCartSucess(data));
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  toast.success('Produto Adicionado ao carrinho');

  yield put(updateAmountSucess(id, amount));
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
