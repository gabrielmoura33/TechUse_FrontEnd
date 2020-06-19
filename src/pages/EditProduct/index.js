import React, { useState, useEffect } from 'react';
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
  const [preview, setPreview] = useState();

  useEffect(() => {
    async function loadImage() {
      try {
        const response = await api.get(`/files/${product.file_id}`);
        setPreview(response.data);
        toast.info('Carregando Imagem');
      } catch {
        toast.error('Erro ao carregar imagem');
      }
    }
    if (product.file_id !== null) {
      loadImage();
    }
  }, [preview]);
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
          <img src={preview || logoImg} alt="Be The Hero" />
          <h1>Editar Produto</h1>
          <p>Descreva o produto detalhadamente</p>
          <Link to="/profile" className="backLink">
            <FiArrowLeft size={16} color="#576388" />
            Voltar para Home
          </Link>
        </section>
        <Form initialData={product} onSubmit={handleUpdateProduct}>
          <Input name="nomeProduto" placeholder="Nome do produto" />
          <Input
            type="date"
            name="dataCadastro"
            placeholder="Data do Cadastro"
          />
          <Input name="estadoProduto" placeholder="Estado do produto" />

          <Input name="cidadeProduto" placeholder="Cidade do produto" />
          <Input multiline name="descricaoProduto" placeholder="Descrição" />
          <Input name="precoProduto" placeholder="Valor em Reais R$" />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </Form>
      </div>
    </div>
  );
}
