import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import api from '../../services/api';
import logoImg from '../../assets/logo.png';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {
  const history = useHistory();
  async function handleLogin({ id }) {
    try {
      const response = await api.get(`users/${id}`);

      const { nome } = response.data;
      if (response.data) {
        toast.success(`Bem Vindo(a) ${nome}`);
        localStorage.setItem('UsuarioLogado', JSON.stringify(response.data));
        history.push('/profile');
      }
    } catch {
      toast.error(`Cadastro de ID ${id} não foi encontrada`);
    }
  }
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Tech Use" id="logo" />

        <Form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <Input name="id" placeholder="Sua ID" />
          <button className="button" type="submit">
            Entrar
          </button>

          <Link to="/register" className="backLink">
            <FiLogIn size={16} color="#8889c0" />
            Não tenho cadastro
          </Link>
        </Form>
      </section>

      <img src={heroesImg} alt="Heroes" style={{ maxHeight: 600 }} />
    </div>
  );
}
