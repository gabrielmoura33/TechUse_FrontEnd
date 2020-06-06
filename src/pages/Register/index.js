import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaTwitterSquare } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './styles.css';
import logoImg from '../../assets/logo.png';
import api from '../../services/api';

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [id, setId] = useState('');
  const [vendedor, setVendedor] = useState(false);
  const history = useHistory();
  async function handleRegister(e) {
    e.preventDefault();
    const data = {
      vendedor,
      nome,
      email,
      telefone,
      cpf,
      id,
    };
    try {
      const response = await api.post('users', data);

      const { nome: responseName, id: responseID } = response.data;
      toast.success(
        `Cadastro Realizado! ${responseName} seu ID de acesso é: ${responseID}`
      );
      history.push('/');
    } catch {
      toast.error('Erro no Cadastro');
    }
  }
  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Cadastro" />
          <h1>Cadastro</h1>
          <p>Faça seu cadastro</p>

          <Link to="/" className="backLink">
            <FaTwitterSquare size={16} color="#576388" />
            Já tenho cadastro
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            placeholder="Digite seu Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />

          <div className="input-group">
            <input
              placeholder="Telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
            <input
              placeholder="ID"
              style={{ width: 80 }}
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <select
            name=""
            id=""
            required
            onChange={(e) => setVendedor(e.target.value)}
          >
            <option>Eu Sou Um</option>
            <option value>Vendedor</option>
            <option value={false}>Comprador</option>
          </select>

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
