import React from 'react';
import Button from '../../components/Button';
import WhiteThing from '../../components/WhiteThing';

import './Home.css';

export default function Home() {
  return (
    <div className='content homepl'>
      <div className='banner'>

      </div>
      <div className='cadastro'>
        <WhiteThing>
          <span>Texto</span>
          <Button to='/cadastro/cliente' name='Cliente' />
        </WhiteThing>
        <WhiteThing>
          <span>Texto</span>
          <Button to='/cadastro/maid' name='Maid' />
        </WhiteThing>
      </div>
    </div>
  );
}