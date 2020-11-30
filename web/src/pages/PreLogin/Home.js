import React from 'react';
import Button from '../../components/Button';

import './Home.css';

export default function Home() {
  return (
    <div className='content homepl'>
      <div className='banner'>

      </div>
      <div className='cadastro'>
        <div className='container'>
          <span>Texto</span>
          <Button to='' name='Cliente' />
        </div>
        <div className='container'>
          <span>Texto</span>
          <Button to='' name='Maid' />
        </div>
      </div>
    </div>
  );
}