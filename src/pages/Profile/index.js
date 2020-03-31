import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
// import { Container } from './styles';
import './styles.css';
import api from '../../services/api';

export default function Profile() {
  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();
  useEffect(() => {
    api
      .get('profile', {
        headers: {
          Authorization: ongId,
        },
      })
      .then((response) => {
        setIncidents(response.data);
      });
  }, [ongId]);

  async function handleDelete(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        },
      });
      setIncidents(incidents.filter((incident) => incident.id !== id));
      toast.success('Caso Deletado COm sucesso');
    } catch {
      toast.error('Erro ao deletar caso!');
    }
  }
  function handleLogout() {
    localStorage.removeItem('ongName');
    localStorage.removeItem('ongId');
    history.push('/');
  }
  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero" />
        <span>Bem vinda, {ongName}</span>

        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#cb2a2d" />
        </button>
      </header>
      <h1>Casos Cadastrados</h1>

      <ul>
        {incidents.map((i) => (
          <li key={i.id}>
            <strong>CASO: </strong>
            <p>{i.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{i.description}</p>

            <strong>VALOR:</strong>
            <p>{i.value}</p>

            <button onClick={() => handleDelete(i.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
