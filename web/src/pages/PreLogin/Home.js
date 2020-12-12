import React from 'react';
import Button from '../../components/Button';
import WhiteThing from '../../components/WhiteThing';

import banner from '../../Images/imgs/banner.png';
import prop0 from '../../Images/imgs/bunette0.jpg';
import prop1 from '../../Images/imgs/bunette1.jpg';

import './Home.css';

export default function Home() {
  return (
    <div className='content homepl'>
      <div className='banner'>
        <span>Encontre a melhor e mais perto de você, para te ajudar nos serviços do lar.</span>
        <img src={banner} alt='banner' />
      </div>
      <div className='cadastro'>
        <WhiteThing>
          <span>Procure o serviço que quiser a hora que quiser!</span>
          <Button to='/cadastro/cliente' name='Perfil Cliente' />
        </WhiteThing>
        <WhiteThing>
          <span>Monte seu Perfil, mostre seu trabalho e seja bem avaliada!</span>
          <Button to='/cadastro/maid' name='Perfil Maid' />
        </WhiteThing>
      </div>
      <div className='propaganda'>
        <div>
          <div></div>
          <img src={prop0} alt='maid0' />
          <div className='descricao'>
            <span>Confie:</span>
            <span>As mais bem avaliadas, sao as de mais confiança, para que sejam bem avaliadas desde o inicio é necessário um curriculo ou portifólio para ser analisado.</span>
          </div>
          <div></div>
        </div>
        <div>
          <div></div>
          <div className='descricao right'>
            <span>Dica:</span>
            <span>Acompanhe o trabalho para saber avaliar sua colaboradora.</span>
          </div>
          <img src={prop1} alt='maid1' />
          <div></div>
        </div>
      </div>
      <div className='premium'>
        <span>O premium exclusivo para as/os colaboradores, serve para ser mais indicado, aparecer destacado nas buscas e manter seu engajamento com clientes anteriores. Seja um colaborador, Premium</span>
        <Button to='/' name='Seja Premium' />
      </div>
      <div className='footer'></div>
    </div>
  );
}