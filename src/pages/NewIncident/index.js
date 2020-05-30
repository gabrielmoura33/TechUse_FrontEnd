import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import { Form, Input, Textarea } from '@rocketseat/unform';
import logoImg from '../../assets/logo.png';
import api from '../../services/api';
// import { Container } from './styles';

export default function NewIncident() {
  const [id, setId] = useState(0);
  useEffect(() => {
    async function loadId() {
      const response = await api.get('/products');

      setId(response.data.length);
    }
    loadId();
  }, [id]);

  const history = useHistory();
  async function handleNewIncident({
    nomeProduto,
    dataCadastro,
    estadoProduto,
    precoProduto,
    cidadeProduto,
    descricaoProduto,
  }) {
    try {
      await api.post('/products', {
        id,
        nomeProduto,
        dataCadastro,
        estadoProduto,
        descricaoProduto,
        precoProduto,
        cidadeProduto,
      });
      toast.success('Produto Criado com sucesso!');
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
          <h1>Cadastrar Novo Produto</h1>
          <p>Descreva o produto detalhadamente</p>
          <Link to="/profile" className="backLink">
            <FiArrowLeft size={16} color="#576388" />
            Voltar para Home
          </Link>
        </section>
        <Form onSubmit={handleNewIncident}>
          <Input name="nomeProduto" placeholder="Nome do produto" />
          <Input
            type="date"
            name="dataCadastro"
            placeholder="Data do Cadastro"
          />
          <Input name="estadoProduto" placeholder="Estado do produto" />
          <Input
            name="telefoneContato"
            placeholder="Seu telefone para Contato"
          />
          <Input name="cidadeProduto" placeholder="Cidade do produto" />
          <Textarea name="descricaoProduto" placeholder="Descrição" />
          <Input name="precoProduto" placeholder="Valor em Reais R$" />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </Form>
      </div>
    </div>
  );
}
