import './Promo.css';
import React from 'react';
import NavTab from '../NavTab/NavTab';

function Promo(props) {

  return (
    <section className="promo">
      <div className="promo__wrapper">
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        <NavTab />
      </div>
    </section>

  )
}

export default Promo;