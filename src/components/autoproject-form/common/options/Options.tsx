import React from 'react';
import './Options.scss'
import autobind from 'autobind-decorator';

export interface Option {
  text: string;
  value: string;
}

interface Props {
  options: Option[];
  initialOption?: Option;
  onSelectOption(option: Option | undefined): void;
}

interface State {
  selected?: Option;
}

@autobind
export class Options extends React.Component<Props, State> {

  public constructor(props: Props) {
    super(props);
    this.state = {
      selected: props.initialOption,
    };
  }

  public render(): React.ReactNode {
    return (
      <div className="options">
        {this.props.options.map(this.renderOption)}
      </div>
    );
  }

  public renderOption(option: Option, index: number): React.ReactNode {
    return (
      <span
        key={index}
        className={this.optionStyles(option)}
        onClick={() => this.onClickOption(option)}
      >
        {option.text}
      </span>
    );
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
    return !!selected && selected?.value === option?.value;
  }

  private onClickOption(option: Option): void {
    this.setState({
      selected: this.isSelected(option) ? undefined : option,
    });
    this.props.onSelectOption(option);
  }
}
