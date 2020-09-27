import React from 'react';
import './SizeOptions.scss';
import autobind from 'autobind-decorator';

interface Props {
  onSelectOption: (option: Option | undefined) => void;
}

interface State {
  selected?: Option;
}

export interface Option {
  min?: number;
  max?: number;
}

@autobind
export class SizeOptions extends React.Component<Props, State> {

  public constructor(props: Props) {
    super(props);
    this.state = {
      selected: undefined,
    };
  }

  private options: Option[] = [
    {
      max: 60,
    },
    {
      min: 60,
      max: 80,
    },
    {
      min: 80,
      max: 100,
    },
    {
      min: 100,
      max: 120,
    },
    {
      min: 120,
    },
  ];

  public render(): React.ReactNode {
    return (
      <div className="options">
        {this.options.map(this.renderOption)}
      </div>
    );
  }

  private renderOption(option: Option, index: number): React.ReactNode {

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

  private optionStyles(option: Option): string {
    let styles = 'noselect option ';

    if (this.isSelected(option)) {
      styles += ' option-selected';
    }

    return styles;
  }

  private isSelected(option: Option): boolean {
    const { selected } = this.state;
    return !!selected &&
      selected?.min === option?.min &&
      selected?.max === option?.max;
  }

  private onClickOption(option: Option): void {
    this.setState({
      selected: this.isSelected(option) ? undefined : option,
    });
  }
}
