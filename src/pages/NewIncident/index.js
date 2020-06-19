/* eslint-disable prefer-const */
import React, { useEffect, useState, useRef } from 'react';
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
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const ref = useRef();

  useEffect(() => {
    async function loadId() {
      const response = await api.get('/products');

      setId(response.data.length + 1);
    }
    loadId();
  }, [id]);
  console.log(id);
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
        file_id: id,
      });
      toast.success('Produto Criado com sucesso!');
      history.push('/profile');
    } catch {
      toast.error('Favor Verificar os dados!');
    }
  }
  async function imageHandler(e2) {
    try {
      setPreview(e2.target.result);
      await api.post('files', {
        id,
        base64: e2.target.result,
      });
      toast.success(`Imagem salva com sucesso ID: ${id}`);
    } catch {
      toast.error('Erro Ao anexar Imagem!');
    }
  }
  async function handleInputImage(e) {
    let filename = e.target.files[0];
    let fr = new FileReader();
    fr.onload = imageHandler;
    fr.readAsDataURL(filename);
  }
  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={preview || logoImg} alt="Be The Hero" />
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
          <input
            type="file"
            id="avatar"
            accept="image/*"
            data-file={file}
            onChange={handleInputImage}
            ref={ref}
          />
          <button className="button" type="submit">
            Cadastrar
          </button>
        </Form>
      </div>
    </div>
  );
}
