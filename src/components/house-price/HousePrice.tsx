import React, { ChangeEvent } from 'react';
import './HousePrice.scss';
import { FilledInput, FormControl, InputAdornment, InputLabel } from '@material-ui/core';
import autobind from 'autobind-decorator';

interface Props {

}

interface State {
  value: number;
}

@autobind
export class HousePrice extends React.Component<Props, State> {

  public constructor(props: Props) {
    super(props);
    this.state = { value: 50000 };
  }

  public render(): React.ReactNode {
    return (
      <div className="house-price">
        {this.renderInput()}
        {this.renderInitialAmount()}
      </div>
    );
  }

  private renderInput(): React.ReactNode {
    return (
      <FormControl variant="filled" className="input-price">
        <InputLabel htmlFor="filled-adornment-amount">Cantidad</InputLabel>
        <FilledInput
          id="filled-adornment-amount"
          value={this.formatDigit(this.state.value)}
          type="text"
          onChange={this.handleOnInputChange}
          startAdornment={
            <InputAdornment position="start">€</InputAdornment>
          }
        />
      </FormControl>
    );
  }

  private renderInitialAmount(): React.ReactNode {

    if (this.state.value === 0) {
      return null;
    }

    const initial = this.calculatePercent(25);

    return (
      <div className="percent">
        Inicial: {this.formatDigit(initial)} €
      </div>
    );
  }

  private calculatePercent(percent: number) {
    const { value } = this.state;
    return (value / 100) * percent;
  }

  private handleOnInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {

    const valueWithoutSpaces = event.target.value.replace(' ', '');
    const value = Number(valueWithoutSpaces);

    if (isNaN(value)) {
      return;
    }

    this.setState({ value });
  }

  private formatDigit(value: number) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
}
