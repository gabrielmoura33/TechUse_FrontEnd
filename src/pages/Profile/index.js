/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { FiEdit, FiPower, FiTrash2, FiShoppingCart } from 'react-icons/fi';
import logoImg from '../../assets/logo.png';
import { formatPrice } from '../../util/format';
import './styles.css';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';

export default function Profile() {
  const usuarioLogado = JSON.parse(localStorage.getItem('UsuarioLogado'));
  const [products, setProducts] = useState([]);
  const history = useHistory();

  const amount = useSelector((state) =>
    state.cart.reduce((sumAmount, product) => {
      if (product.userID === usuarioLogado.id) {
        sumAmount[product.id] = product.amount;
      }

      return sumAmount;
    }, {})
  );
  useEffect(() => {
    api.get('products').then((response) => {
      setProducts(response.data);
    });
  }, []);
  const dispatch = useDispatch();
  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id));
  }

  async function handleDelete(id) {
    try {
      await api.delete(`products/${id}`);
      setProducts(products.filter((incident) => incident.id !== id));
      toast.success('Produto Deletado Com sucesso');
    } catch {
      toast.error('Erro ao deletar Produto!');
    }
  }
  function handleLogout() {
    localStorage.removeItem('UsuarioLogado');
    history.push('/');
  }
  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero" />
        <span>Bem vindo(a), {usuarioLogado.nome}</span>

        {usuarioLogado.vendedor ? (
          <Link className="button" to="/incidents/new">
            Cadastrar novo produto
          </Link>
        ) : (
          <Link className="button" to="/cart">
            Minhas Compras
          </Link>
        )}
        <button type="button" className="deleteButton" onClick={handleLogout}>
          <FiPower size={18} color="#576388" />
        </button>
      </header>
      <h1>Produtos Cadastrados</h1>

      <ul>
        {products.map((i) => (
          <li key={i.id}>
            <strong>Nome do produto: </strong>
            <p>{i.nomeProduto}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{i.descricaoProduto}</p>

            <strong>ESTADO DO PRODUTO:</strong>
            <p>{i.estadoProduto}</p>

            <div className="valueGroup">
              <strong>VALOR:</strong>
              <strong>{formatPrice(i.precoProduto)}</strong>
            </div>

            {!usuarioLogado.vendedor ? (
              <button
                type="button"
                className="button"
                onClick={() => handleAddProduct(i.id)}
              >
                <div>
                  <FiShoppingCart size={16} /> {amount[i.id] || 0}
                </div>
                <span>Comprar</span>
              </button>
            ) : (
              <div />
            )}
            {usuarioLogado.vendedor ? (
              <>
                <button
                  onClick={() => handleDelete(i.id)}
                  className="deleteButton"
                  type="button"
                >
                  <FiTrash2 size={20} color="#a8a8b3" />
                </button>
                <button
                  type="button"
                  className="editButton"
                  onClick={() =>
                    history.push({
                      pathname: '/incidents/edit',
                      product: i,
                    })
                  }
                >
                  <FiEdit size={20} color="#a8a8b3" />
                </button>
              </>
            ) : (
              <button
                onClick={() =>
                  history.push({
                    pathname: '/incidents/show',
                    product: i,
                  })
                }
                className="deleteButton"
                type="button"
              >
                <FiEdit size={20} color="#a8a8b3" />
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
