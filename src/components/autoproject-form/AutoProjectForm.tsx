import React, { ChangeEvent } from 'react';
import { Title } from '../title/Title';
import { Description } from '../description/Description';
import { createMuiTheme, TextField, Theme, ThemeProvider } from '@material-ui/core';
import './AutoProjectForm.scss';
import { AutocompleteInput } from '../autocomplete-input/AutocompleteInput';
import { Option, SizeOptions } from '../size-options/SizeOptions';
import { HousePrice } from '../house-price/HousePrice';
import { ApiClient } from '../../api/ApiClient';
import { Region } from '../../entities/Region';
import autobind from 'autobind-decorator';
import { City } from '../../entities/City';

interface Props {
}

interface State {
  regions: Region[];
  selectedRegion?: Region;
  selectedCity?: City;
  neighborhood?: string;
  selectedSizeOption?: Option;
  comment?: string;
  commentError: boolean;
}

@autobind
export class AutoProjectForm extends React.Component<Props, State> {

  private readonly apiClient: ApiClient;

  public constructor(props: Props) {
    super(props);
    this.apiClient = new ApiClient();

    this.state = {
      regions: [],
      commentError: false,
    };
  }

  public async componentDidMount(): Promise<void> {
    this.setState({
      regions: await this.apiClient.requestRegions(),
    });
  }

  public render(): React.ReactNode {
    return (
      <ThemeProvider theme={this.configureTheme()}>
        <Title/>
        <Description/>
        {this.renderFirstStep()}
        {this.renderSecondStep()}
        {this.renderThirdStep()}
        {this.renderFourthStep()}
      </ThemeProvider>
    );
  }

  private configureTheme(): Theme {
    return createMuiTheme({
      palette: {
        type: 'dark',
        primary: {
          main: '#69f0ae',
        },
        secondary: {
          main: '#69f0ae',
        },
      },
    });
  }

  private renderFirstStep(): React.ReactNode {
    return (
      <div className="step">
        <div className="title">Localización. Dinos, ¿Dónde te gustaría vivir?</div>
        <div className="inputs">
          <AutocompleteInput
            label="Comarca"
            options={this.state.regions.map(r => r.name)}
            disabled={false}
            onChange={this.handleOnRegionInputChange}
          />
          <AutocompleteInput
            label="Población"
            options={this.state.selectedRegion?.cities.map(c => c.name) || []}
            disabled={!this.state.selectedRegion}
            onChange={this.handleOnCityInputChange}
          />
          <div className="input-wrapper">
            <TextField
              label="Barrio / Zona"
              variant="filled"
              margin="normal"
              fullWidth={true}
              disabled={!this.state.selectedCity}
              onChange={this.handleOnNeighborhoodInputChange}
              InputProps={{
                type: 'search',
                className: 'input',
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  private handleOnRegionInputChange(event: ChangeEvent<{}>, value: string | null): void {
    if (!!value) {
      this.setState({
        selectedRegion: this.state.regions.find(region => region.name === value),
      });
    }
  }

  private handleOnCityInputChange(event: ChangeEvent<{}>, value: string | null): void {
    if (!!value) {
      this.setState({
        selectedCity: this.state.selectedRegion!.cities.find(city => city.name === value),
      });
    }
  }

  private handleOnNeighborhoodInputChange(event: ChangeEvent<HTMLInputElement>): void {
    this.setState({
      neighborhood: event.target.value,
    });
  }

  private renderSecondStep(): React.ReactNode {
    return (
      <div className="step">
        <div className="title">Tamaño. ¿Cómo de grande lo necesitas?</div>
        <div className="inputs">
          <SizeOptions onSelectOption={this.handleOnSizeOptionsSelectChange}/>
        </div>
      </div>
    );
  }

  private handleOnSizeOptionsSelectChange(option: Option | undefined): void {
    this.setState({
      selectedSizeOption: option,
    });
  }

  private renderThirdStep(): React.ReactNode {
    return (
      <div className="step">
        <div className="title">
          ¿Cuánto estas dispuesto a gastar? (Recuerda que necesitarás disponer de un 25% inicial...)
        </div>
        <div className="inputs">
          <HousePrice/>
        </div>
      </div>
    );
  }

  private renderFourthStep(): React.ReactNode {
    return (
      <div className="step">
        <div className="title">Añádenos un comentario</div>
        <div className="inputs">
          <div className="input-wrapper">
            <TextField
              label="Comentario"
              variant="filled"
              margin="normal"
              fullWidth={true}
              multiline={true}
              onChange={this.handleOnCommentInputChange}
              rows={4}
              rowsMax={4}
              error={this.state.commentError}
              helperText={this.state.commentError ? 'Comentario demasiado largo.' : ''}
              InputProps={{
                className: 'input',
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  private handleOnCommentInputChange(event: ChangeEvent<HTMLInputElement>): void {

    const value = event.target.value;

    if (value.length > 150) {
      this.setState({
        commentError: true,
      });
    } else {
      this.setState({
        commentError: false,
        comment: value,
      });
    }
  }
}


