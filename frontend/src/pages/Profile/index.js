import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
     return (
          <div className="profile-container">
               <header>
                    <img src={logoImg} alt="Be The Hero"/>
                    <span>Bem vinda, APAD</span>
                    
                    <Link to="/">Cadastrar novo caso</Link>

               </header>
          </div>
     )
}