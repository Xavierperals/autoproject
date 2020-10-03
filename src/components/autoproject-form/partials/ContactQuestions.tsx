import React, { ChangeEvent } from 'react';
import { Step } from '../common/Step';
import { TextField } from '@material-ui/core';

interface Props {
  onNameInputChange(name: string): void;
  onPhoneNumberInputChange(phoneNumber: string): void;
  onEmailInputChange(email: string): void;
}

export class ContactQuestions extends React.PureComponent<Props> {
  public render(): React.ReactNode {
    return (
      <Step title="Datos de contacto">
        <div className="input-wrapper">
          <TextField
            label="Nombre"
            variant="filled"
            margin="normal"
            fullWidth={true}
            onChange={this.handleOnNameInputChange}
            InputProps={{ className: 'input' }}
          />
        </div>
        <div className="input-wrapper">
          <TextField
            label="Número de teléfono"
            variant="filled"
            margin="normal"
            fullWidth={true}
            onChange={this.handleOnPhoneNumberInputChange}
            InputProps={{ className: 'input' }}
          />
        </div>
        <div className="input-wrapper">
          <TextField
            label="Correo Electrónico"
            variant="filled"
            inputMode="email"
            margin="normal"
            fullWidth={true}
            onChange={this.handleOnEmailInputChange}
            InputProps={{ className: 'input', }}
          />
        </div>
      </Step>
    );
  }

  private handleOnNameInputChange(event: ChangeEvent<HTMLInputElement>): void {
    this.props.onNameInputChange(event.target.value);
  }

  private handleOnPhoneNumberInputChange(event: ChangeEvent<HTMLInputElement>): void {
    this.props.onPhoneNumberInputChange(event.target.value);
  }

  private handleOnEmailInputChange(event: ChangeEvent<HTMLInputElement>): void {
    this.props.onEmailInputChange(event.target.value);
  }
}
