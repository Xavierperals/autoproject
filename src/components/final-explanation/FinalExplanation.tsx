import React, { ChangeEvent } from 'react';
import './FinalExplanation.scss';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import autobind from 'autobind-decorator';

interface Props {
  onCheckboxChange(checked: boolean): void;
}

@autobind
export class FinalExplanation extends React.PureComponent<Props> {

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
            control={<Checkbox onChange={this.handleOnCheckboxChange} color="primary" />}
            label="Si quieres que nos pongamos en contacto igualmente y ofrecerte proyectos marca esta casilla. Si no es así! No te molestaremos..."
            labelPlacement="end"
          />
        </div>

      </div>
    );
  }

  private handleOnCheckboxChange(event: ChangeEvent<{}>, checked: boolean): void {
    this.props.onCheckboxChange(checked);
  }
}
