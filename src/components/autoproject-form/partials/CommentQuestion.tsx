import React, { ChangeEvent } from 'react';
import { Step } from '../common/steps/Step';
import { TextField } from '@material-ui/core';
import autobind from 'autobind-decorator';

interface Props {
  onCommentChange(comment: string): void;
}

interface State {
  commentError: boolean;
}

@autobind
export class CommentQuestion extends React.PureComponent<Props, State> {

  public constructor(props: Props) {
    super(props);

    this.state = {
      commentError: false,
    };
  }

  public render(): React.ReactNode {
    return (
      <Step title="Añádenos un comentario">
        <div className="input-wrapper">
          <TextField
            label="Comentario (Opcional)"
            variant="filled"
            margin="normal"
            fullWidth={true}
            multiline={true}
            onChange={this.handleOnCommentInputChange}
            rows={4}
            rowsMax={4}
            error={this.state.commentError}
            helperText={this.state.commentError ? 'Comentario demasiado largo.' : ''}
            InputProps={{ className: 'input' }}
          />
        </div>
      </Step>
    );
  }

  private handleOnCommentInputChange(event: ChangeEvent<HTMLInputElement>): void {
    const value = event.target.value;

    this.setState({
      commentError: (value.length > 150),
    });

    this.props.onCommentChange(value);
  }
}
