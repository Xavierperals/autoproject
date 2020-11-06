import React from 'react';
import './Description.scss';

interface Props {
}

export const Description = (props: Props) => (
  <div className="description">
    <p className="description-text">
      ¿Quieres un piso nuevo? ¿Quieres ahorrarte un 30%? ¿Con la última tecnología?
      ¡Podrás escojer acabados y distribuciones!
      <br/>
      Si estás interesado, contesta este breve cuestionario y haremos posible tu piso nuevo en la ubicación que tu nos
      digas.
    </p>
    {/*<p className="slogan"></p>*/}
  </div>
);
