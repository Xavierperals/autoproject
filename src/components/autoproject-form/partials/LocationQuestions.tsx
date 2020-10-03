import React, { ChangeEvent } from 'react';
import { Step } from '../common/Step';
import { AutocompleteInput } from '../../autocomplete-input/AutocompleteInput';
import { TextField } from '@material-ui/core';
import { Region } from '../../../entities/Region';
import { City } from '../../../entities/City';
import autobind from 'autobind-decorator';

interface Props {
  regions: Region[];
  onRegionInputChange(region: Region | undefined): void;
  selectedRegion: Region | undefined;
  onCityInputChange(city: City | undefined): void;
  selectedCity: City | undefined;
  onNeighborhoodInputChange(neighborhood: string): void;
}

interface State {

}

@autobind
export class LocationQuestions extends React.PureComponent<Props, State> {
  public render(): React.ReactNode {

    const { regions, selectedRegion, selectedCity } = this.props;

    return (
      <Step title="Localización. Dinos, ¿Dónde te gustaría vivir?">
        <AutocompleteInput
          label="Comarca"
          options={regions.map(r => r.name)}
          disabled={false}
          onChange={this.handleOnRegionInputChange}
        />
        <AutocompleteInput
          label="Población"
          options={selectedRegion?.cities.map(c => c.name) || []}
          disabled={!selectedRegion}
          onChange={this.handleOnCityInputChange}
        />
        <div className="input-wrapper">
          <TextField
            label="Barrio / Zona"
            variant="filled"
            margin="normal"
            fullWidth={true}
            disabled={!selectedCity}
            onChange={this.handleOnNeighborhoodInputChange}
            InputProps={{
              type: 'search',
              className: 'input',
            }}
          />
        </div>
      </Step>
    );
  }

  private handleOnRegionInputChange(event: ChangeEvent<{}>, value: string | null): void {
    const selectedRegion = this.props.regions.find(region => region.name === value);
    this.props.onRegionInputChange(selectedRegion);
  }

  private handleOnCityInputChange(event: ChangeEvent<{}>, value: string | null): void {
    const selectedCity = this.props.selectedRegion!.cities.find(city => city.name === value);
    this.props.onCityInputChange(selectedCity);
  }

  private handleOnNeighborhoodInputChange(event: ChangeEvent<HTMLInputElement>): void {
    this.props.onNeighborhoodInputChange(event.target.value);
  }
}