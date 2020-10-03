import React from 'react';
import './FinalExplanation.scss';
import { FormControlLabel, Checkbox } from '@material-ui/core';

export class FinalExplanation extends React.PureComponent {

  public render(): React.ReactNode {
    return (
      <div className="final-explanation">
        <p>
          Te damos un plazo maximo de 3 meses para estudiar su vivilidad y asi poder ofrecerte un proyecto a tu medida.
        </p>

        <p>
          Formamos comunidades de propietarios, solo nos ponernos en contacto contigo si lo logramos!
          (Te avisaremos con un SMS si no hay gente interesada en tu zona).
        </p>

        <div className="checkbox-wrapper">
          <FormControlLabel
            value="end"
            control={<Checkbox color="primary" />}
            label="Si quieres que nos pongamos en contacto igualmente y ofrecerte proyectos marca esta casilla. Si no es así! No te molestaremos..."
            labelPlacement="end"
          />
        </div>

      </div>
    );
  }
}