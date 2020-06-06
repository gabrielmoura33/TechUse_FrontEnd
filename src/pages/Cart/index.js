import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import { Form, Input } from '@rocketseat/unform';
import logoImg from '../../assets/logo.png';
import api from '../../services/api';
// import { Container } from './styles';

export default function NewIncident(location) {
  const [product] = useState(location.location.product || {});
  const history = useHistory();
  const { id } = product;
  async function handleUpdateProduct({
    nomeProduto,
    dataCadastro,
    estadoProduto,
    precoProduto,
    cidadeProduto,
    descricaoProduto,
  }) {
    try {
      await api.put('/products', {
        id,
        nomeProduto,
        dataCadastro,
        estadoProduto,
        descricaoProduto,
        precoProduto,
        cidadeProduto,
      });
      toast.success('Produto Alterado com sucesso!');
      history.push('/profile');
    } catch {
      toast.error('Favor Verificar os dados!');
    }
  }
  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Editar Produto</h1>
          <p>Descreva o produto detalhadamente</p>
          <Link to="/profile" className="backLink">
            <FiArrowLeft size={16} color="#576388" />
            Voltar para Home
          </Link>
        </section>
      </div>
    </div>
  );
}
