import React from 'react';
import autobind from 'autobind-decorator';
import { Option, Options } from '../autoproject-form/common/options/Options';

interface Props {
  onSelectOption: (option: Option | undefined) => void;
}

export interface SizeOption {
  min?: number;
  max?: number;
  value: string;
}

@autobind
export class SizeOptions extends React.Component<Props> {
  private options: SizeOption[] = [
    {
      max: 60,
      value: 'LESS_THAN_60',
    },
    {
      min: 60,
      max: 80,
      value: 'BETWEEN_60_AND_80',
    },
    {
      min: 80,
      max: 100,
      value: 'BETWEEN_80_AND_100',
    },
    {
      min: 100,
      max: 120,
      value: 'BETWEEN_100_AND_120',
    },
    {
      min: 120,
      value: 'MORE_THAN_120',
    },
  ];

  public render(): React.ReactNode {
    return (
      <Options
        options={this.options.map(this.buildOption)}
        onSelectOption={this.props.onSelectOption}
      />
    );
  }

  private buildOption(option: SizeOption): Option {

    const { min, max } = option;

    let text = '';

    if (!min && !!max) {
      text = `Menos de ${max}m2`;
    }

    if (!!min && !max) {
      text = `Más de ${min}m2`;
    }

    if (!!min && !!max) {
      text = `Entre ${min} y ${max} m2`;
    }

    return {
      text: text,
      value: option.value
    };
  }
}
