import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import { Form, Input, Textarea } from '@rocketseat/unform';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
// import { Container } from './styles';

export default function NewIncident() {
  const ongId = localStorage.getItem('ongId');
  const history = useHistory();
  async function handleNewIncident({ title, description, value }) {
    try {
      await api.post(
        'incidents',
        {
          title,
          description,
          value,
        },
        {
          headers: {
            Authorization: ongId,
          },
        }
      );
      toast.success('Caso Criado com sucesso!');
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
          <h1>Cadastrar Novo Caso</h1>
          <p>
            Descreva o caso detalhadamente para encotrar um heroi para resolver
            isso.
          </p>
          <Link to="/profile" className="backLink">
            <FiArrowLeft size={16} color="#cb2a2d" />
            Voltar para Home
          </Link>
        </section>
        <Form onSubmit={handleNewIncident}>
          <Input name="title" placeholder="Titulo do Caso" />
          <Textarea name="description" placeholder="Descrição" />

          <Input name="value" placeholder="Valor em Reais R$" />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </Form>
      </div>
    </div>
  );
}
