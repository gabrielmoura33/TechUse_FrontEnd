/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/logo.png';
import { formatPrice } from '../../util/format';
import { ProductTable, Total } from './stylesComponents';
import * as CartActions from '../../store/modules/cart/actions';
import CartAnimation from '../../components/CartAnimation';

export default function Cart() {
  const [sucess, setSucess] = useState(false);
  const history = useHistory();

  const cart = useSelector((state) =>
    state.cart.map((product) => ({
      ...product,
      subtotal: formatPrice(product.precoProduto * product.amount),
    }))
  );
  const total = useSelector((state) =>
    formatPrice(
      state.cart.reduce((sumtotal, product) => {
        return sumtotal + product.precoProduto * product.amount;
      }, 0)
    )
  );
  useEffect(() => {
    console.log(cart);
  }, []);

  const dispatch = useDispatch();

  function increase(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  }
  function decrease(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  }
  function handleSubmit() {
    setSucess(true);
    setTimeout(() => {
      history.push('/incidents/sucess');
    }, 1540);
  }
  return (
    <div className="cart-container">
      <CartAnimation visible={sucess} />
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Carrinho</h1>
          <p>Verifique todo os produtos antes de confirmar a compra!</p>
          <Link to="/profile" className="backLink">
            <FiArrowLeft size={16} color="#576388" />
            Voltar para Home
          </Link>
        </section>
        <div className="card-container-list">
          <ProductTable>
            <thead>
              <tr>
                <th />
                <th>Produto</th>
                <th>QTD</th>
                <th>SUBTOTAL</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img src={product.imageRequest} />
                  </td>
                  <td>
                    <strong>{product.nomeProduto}</strong>
                    <span>{formatPrice(product.precoProduto)}</span>
                  </td>
                  <td>
                    <div>
                      <button type="button" onClick={() => decrease(product)}>
                        <MdRemoveCircleOutline size={20} color="#7159c1" />
                      </button>
                      <input type="number" readOnly value={product.amount} />
                      <button type="button" onClick={() => increase(product)}>
                        <MdAddCircleOutline size={20} color="#7159c1" />
                      </button>
                    </div>
                  </td>
                  <td>
                    <strong>{product.subtotal}</strong>
                  </td>
                  <td>
                    <button type="button">
                      <MdDelete
                        size={20}
                        color="#7159c1"
                        onClick={() =>
                          dispatch(CartActions.removeFromCart(product.id))
                        }
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <footer>
              <Total>
                <span>TOTAL</span>
                <strong>{total}</strong>
              </Total>
              <button
                className="submitButton"
                onClick={handleSubmit}
                type="button"
              >
                Finalizar Pedido
              </button>
            </footer>
          </ProductTable>
        </div>
      </div>
    </div>
  );
}
