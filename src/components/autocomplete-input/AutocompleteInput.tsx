import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import React, { ChangeEvent } from 'react';

interface Props {
  onChange?: (event: ChangeEvent<{}>, value: string | null) => void;
  label: string;
  options: string[];
  disabled: boolean;
}

export const AutocompleteInput = (props: Props) => (
  <div className="input-wrapper">
    <Autocomplete
      options={props.options}
      disabled={props.disabled}
      onChange={props.onChange}
      renderInput={params => (
        <TextField
          {...params}
          label={props.label}
          disabled={props.disabled}
          margin="normal"
          variant="filled"
          InputProps={{
            ...params.InputProps,
            type: 'search',
            className: 'input',
            // startAdornment: (
            //   <InputAdornment position="end" variant="filled">
            //     <AccountCircle/>
            //   </InputAdornment>
            // ),
          }}
        />
      )}
    />
  </div>
);
