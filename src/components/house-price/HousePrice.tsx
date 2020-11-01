import React, { ChangeEvent } from 'react';
import './HousePrice.scss';
import { FilledInput, FormControl, FormHelperText, InputAdornment, InputLabel } from '@material-ui/core';
import autobind from 'autobind-decorator';

interface Props {
  onChange(value: number, error: boolean): void;
}

interface State {
  value: number;
}

@autobind
export class HousePrice extends React.Component<Props, State> {

  public constructor(props: Props) {
    super(props);
    this.state = { value: 100_000 };
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
          type="tel"
          inputMode="tel"
          error={this.hasErrors()}
          onChange={this.handleOnInputChange}
          startAdornment={
            <InputAdornment position="start">€</InputAdornment>
          }
        />
        <FormHelperText error={this.hasErrors()}>Min 100 000 - Max 1 000 000</FormHelperText>
      </FormControl>
    );
  }

  private renderInitialAmount(): React.ReactNode {

    if (this.state.value === 0) {
      return null;
    }

    if (this.hasErrors()) {
      return (
        <div className="percent"/>
      );
    }

    let initial = this.calculatePercent(20);
    initial = Math.round(initial);

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

    let value = event.target.value;

    while (value.includes(' ')) {
      value = value.replace(' ', '');
    }

    let numericValue = Number(value);

    if (isNaN(numericValue) || numericValue > 1_000_000) {
      return;
    }

    numericValue = Math.round(numericValue);

    this.setState({ value: numericValue });
    this.props.onChange(numericValue, this.hasErrors());
  }

  private formatDigit(value: number) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  private hasErrors(): boolean {
    return this.state.value < 100_000 || this.state.value > 1_000_000;
  }
}
