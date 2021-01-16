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
          Somos expertos en la formación de comunidades de propietarios des de 1992. Tan pronto como tengamos más gente interesada en tu zona te notificaremos por correo o SMS.
        </p>
        <div className="checkbox-wrapper">
          <FormControlLabel
            value="end"
            control={<Checkbox onChange={this.handleOnCheckboxChange} color="primary" />}
            label="Si quieres recibir más información y promociones marca esta casilla."
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
