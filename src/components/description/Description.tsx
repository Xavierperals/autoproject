import React from 'react';
import './Description.scss';

interface Props {
}

export const Description = (props: Props) => (
  <div className="description">
    <p className="description-text">
      ¡Buscamos solución al problema de la vivienda! ¡Nosotros hacemos posible tu piso nuevo! ¡Puedes ahorrar hasta un 30%!
      ¡A tu medida y muy por debajo el precio de mercado! ¡Podrás escoger los acabados! ¡Hasta hacer cambios en la
      distrubucion del proyecto! ¡Garantizandote la mejor calidad-construcción posible! ¡Si estás interesado,
      contéstanos un breve cuestionario...
    </p>
    <p className="slogan">
      ¡Y TRABAJAREMOS PARA HACERLO REALIDAD!
    </p>
  </div>
);
