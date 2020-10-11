import React from 'react';
import './SizeOptions.scss';
import autobind from 'autobind-decorator';

interface Props {
  onSelectOption: (option: SizeOption | undefined) => void;
}

interface State {
  selected?: SizeOption;
}

export interface SizeOption {
  min?: number;
  max?: number;
  value: string;
}

@autobind
export class SizeOptions extends React.Component<Props, State> {

  public constructor(props: Props) {
    super(props);
    this.state = {
      selected: undefined,
    };
  }

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
      <div className="options">
        {this.options.map(this.renderOption)}
      </div>
    );
  }

  private renderOption(option: SizeOption, index: number): React.ReactNode {

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

    return (
      <span
        key={index}
        className={this.optionStyles(option)}
        onClick={() => this.onClickOption(option)}
      >
        {text}
      </span>);
  }

  private optionStyles(option: SizeOption): string {
    let styles = 'noselect option ';

    if (this.isSelected(option)) {
      styles += ' option-selected';
    }

    return styles;
  }

  private isSelected(option: SizeOption): boolean {
    const { selected } = this.state;
    return !!selected &&
      selected?.min === option?.min &&
      selected?.max === option?.max;
  }

  private onClickOption(option: SizeOption): void {
    this.setState({
      selected: this.isSelected(option) ? undefined : option,
    });
    this.props.onSelectOption(option);
  }
}
