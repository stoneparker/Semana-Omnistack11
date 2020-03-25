import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
     const ongName = localStorage.getItem('ongName');
     const ongId = localStorage.getItem('ongId');
     const [incidents, setIncidents] = useState([]);

     useEffect(() => {
          api.get('profile', {
               headers: {
                    Authorization: ongId
               }
          }).then(response => {
               setIncidents(response.data);
          })

     }, [ongId])

     async function handleDeleteIncident(id) {
          try {
               await api.delete(`incidents/${id}`, {
                    headers: {
                         Authorization: ongId
                    }
               });

               setIncidents(incidents.filter(incident => incident.id != id)); // excluindo do array os incidents com id igual ao do excluído. são filtrados para permanecer apenas os incidents em que o id é diferente do excluído

          } catch (error) {
               alert('Erro ao deletar caso. Tente novamente mais tarde.')
          }
     }

     return (
          <div className="profile-container">
               <header>
                    <img src={logoImg} alt="Be The Hero"/>
                    <span>Bem vinda, {ongName}</span>
                    
                    <Link to="/incidents/new" className="button">Cadastrar novo caso</Link>

                    <button type="button">
                         <FiPower size={18} color="#e02041" />
                    </button>
               </header>

               <h1>Casos cadastrados</h1>
               
               <ul>
                    {incidents.map(incident => (
                         <li key={incident.id}>
                              <strong>CASO:</strong>
                              <p>{incident.title}</p>

                              <strong>DESCRIÇÃO:</strong>
                              <p>{incident.description}</p>

                              <strong>VALOR:</strong>
                              <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                              <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                                   <FiTrash2 size={20} color="#a8a8b3" />
                              </button>
                         </li>
                    ))}
               </ul>

          </div>
     )
}