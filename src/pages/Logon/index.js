import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {
  const history = useHistory();
  async function handleLogin({ id }) {
    try {
      const response = await api.post('sessions/', { id });
      localStorage.setItem('ongName', response.data.name);
      localStorage.setItem('ongId', id);
      history.push('/profile');
    } catch {
      toast.error(`Ong de ID ${id} não foi encontrada`);
    }
  }
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The hero" />

        <Form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <Input name="id" placeholder="Sua ID" />
          <button className="button" type="submit">
            Entrar
          </button>

          <Link to="/register" className="backLink">
            <FiLogIn size={16} color="#cb2a2d" />
            Não tenho cadastro
          </Link>
        </Form>
      </section>

      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}
