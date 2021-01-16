import React from 'react';
import './Description.scss';

interface Props {
}

export const Description = (props: Props) => (
  <div className="description">
    <p className="description-text">
      Quieres un <b>piso nuevo</b>?
      <br /><br />
     Quieres <b>ahorrarte un 30%</b>?
      <br /><br />
     Podras escoger <b>acabados y distribuciones…</b>
      <br /><br />
     Dinos <b>donde te gustaría vivir en 6  sencillos pasos…</b>
     <br />
    </p>
    {/*<p className="slogan"></p>*/}
  </div>
);
