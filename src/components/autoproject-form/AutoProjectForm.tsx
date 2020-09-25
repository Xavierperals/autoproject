import React from 'react';
import { Title } from '../title/Title';
import { Description } from '../description/Description';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import './AutoProjectForm.scss';

interface Props {
}

interface State {
}

export class AutoProjectForm extends React.Component<Props, State> {
  public render(): React.ReactNode {
    return (
      <div>
        <Title/>
        <Description/>
        {this.renderFirstStep()}

      </div>
    );
  }

  private renderFirstStep(): React.ReactNode {
    return (
      <div className="step">
        <div className="title">1. Localización. Dinos, donde te gustaria vivir?</div>
        <Autocomplete
          freeSolo
          options={[ 'Barcelona', 'Hospitalet' ]}
          renderInput={params => (
            <TextField
              {...params}
              label="Ciudad"
              margin="normal"
              variant="outlined"
              InputProps={{ ...params.InputProps, type: 'search', className: 'input' }}
            />
          )}
        />
      </div>
    );
  }
}


