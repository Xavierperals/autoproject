import React, { ChangeEvent } from 'react';
import { Step } from '../common/steps/Step';
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
  neighborhood?: string;
  formTriedToSend: boolean;
}

interface State {

}

@autobind
export class LocationQuestions extends React.PureComponent<Props, State> {

  public render(): React.ReactNode {
    const { regions, selectedRegion, selectedCity, neighborhood, formTriedToSend } = this.props;

    return (
      <Step title="Localización. Dinos, ¿Dónde te gustaría vivir?">
        <AutocompleteInput
          label="Comarca"
          options={regions.map(r => r.name)}
          value={selectedRegion?.name || ''}
          error={formTriedToSend && !selectedRegion}
          disabled={false}
          onChange={this.handleOnRegionInputChange}
        />
        <AutocompleteInput
          label="Población"
          options={selectedRegion?.cities.map(c => c.name) || []}
          value={selectedCity?.name || ''}
          error={formTriedToSend && !selectedCity}
          disabled={!selectedRegion}
          onChange={this.handleOnCityInputChange}
        />
        <div className="input-wrapper">
          <TextField
            label="Barrio / Zona (Optional)"
            variant="filled"
            margin="normal"
            fullWidth={true}
            value={neighborhood}
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
