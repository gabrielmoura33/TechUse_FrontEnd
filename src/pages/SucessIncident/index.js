/* eslint-disable prefer-const */
import React, { useEffect, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/logo.png';
import SucessAnimation from '../../components/SucessAnimation';

export default function NewIncident() {
  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Compra Finalizada!</h1>
          <p>
            Aguarde até que o vendedor entre em contato para os processos de
            entrega do produto!
          </p>
          <Link to="/profile" className="backLink">
            <FiArrowLeft size={16} color="#576388" />
            Voltar para Home
          </Link>
        </section>
        <SucessAnimation />
      </div>
    </div>
  );
}
