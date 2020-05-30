import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import logoImg from '../../assets/logo.png';
import './styles.css';
import api from '../../services/api';

export default function Profile() {
  const userName = localStorage.getItem('UsuarioLogado');
  const [products, setProducts] = useState([]);
  const history = useHistory();
  useEffect(() => {
    api.get('products').then((response) => {
      setProducts(response.data);
    });
  }, []);

  async function handleDelete(id) {
    try {
      await api.delete(`products/${id}`);
      setProducts(products.filter((incident) => incident.id !== id));
      toast.success('Caso Deletado Com sucesso');
    } catch {
      toast.error('Erro ao deletar caso!');
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
        <span>Bem vinda, {userName}</span>

        <Link className="button" to="/incidents/new">
          Cadastrar novo produto
        </Link>
        <button type="button" onClick={handleLogout}>
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

            <strong>CATEGORIA:</strong>
            <p>{i.categoriaProduto}</p>

            <strong>VALOR:</strong>
            <p>R${i.precoProduto}</p>

            <button onClick={() => handleDelete(i.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
