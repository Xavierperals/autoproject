import React from 'react';
import './Description.scss';

interface Props {
}

export const Description = (props: Props) => (
  <div className="description">
    <p className="description-text">
      Buscamos solucion al problema de la vivienda! Nosotros hacemos posible tu piso nuevo! Puedes ahorrar hasta un 30%!
      A tu medida y muy por debajo el precio de mercado! Podras escojer los acabados! Hasta hacer cambios en la
      distrubucion del proyecto! Garantizandote el mejor calidad construccion posible! Si estas interesado,
      contestanos un breve cuestionario...
    </p>
    <p className="slogan">
      Y TRABAJAREMOS PARA HACERLO REALIDAD!
    </p>
  </div>
);
