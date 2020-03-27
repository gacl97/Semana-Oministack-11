import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';


function Profile() {
  const [incidents, setIncidents] = useState([]);
  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');

  const history = useHistory();

  /* useEffect serve para disparar uma função em determinado momento do componente
 e essa função recebe dois parâmetros, primeiro a função a ser executada, e o 
 segundo é quando será executada que é um array de dependências, se vazio irá 
 executar uma única vez */

  useEffect(( )=> {
    api.get('profile', {
      headers: {
        Authorization: ongId,
      }
    }).then( res => {
      setIncidents(res.data);
    })
  }, [ongId]);

  async function handleDeleteIncident(incidentId) {
    try {
      await api.delete(`incidents/${incidentId}`, {
        headers: {
          Authorization: ongId,
        }
      });  
      
      // Realizar filtro para atualizar em tempo real a lista de casos
      setIncidents(incidents.filter(incident => incident.id !== incidentId));
    } catch(error) {
      alert("Não foi possível deletar, tente novamente.")
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero"/>
        <span> Bem Vinda, {ongName}</span>
        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041"/>

        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
          <strong>Caso:</strong>
          <p>{incident.title}</p>

          <strong>Descrição:</strong>
          <p>{incident.description}</p>

          <strong>Valor:</strong>
          <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

          <button onClick={() => handleDeleteIncident(incident.id)} type="button">
            <FiTrash2 size={20} color="#a8a8b3"/>
          </button>
        </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;