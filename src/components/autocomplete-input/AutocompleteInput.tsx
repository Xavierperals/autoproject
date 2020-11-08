import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import React, { ChangeEvent } from 'react';

interface Props {
  onChange?: (event: ChangeEvent<{}>, value: string | null) => void;
  value: string;
  label: string;
  options: string[];
  disabled: boolean;
  error: boolean;
}

export const AutocompleteInput = (props: Props) => (
  <div className="input-wrapper">
    <Autocomplete
      options={props.options}
      disabled={props.disabled}
      onChange={props.onChange}
      value={props.value}
      renderInput={params => (
        <TextField
          {...params}
          label={props.label}
          disabled={props.disabled}
          margin="normal"
          variant="filled"
          value={props.value}
          error={props.error}
          InputProps={{
            ...params.InputProps,
            type: 'search',
            className: 'input',
          }}
        />
      )}
    />
  </div>
);
