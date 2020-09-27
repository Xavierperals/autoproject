import React, { ChangeEvent } from 'react';
import { Title } from '../title/Title';
import { Description } from '../description/Description';
import { createMuiTheme, Theme, ThemeProvider } from '@material-ui/core';
import './AutoProjectForm.scss';
import { AutocompleteInput } from '../autocomplete-input/AutocompleteInput';
import { SizeOptions } from '../size-options/SizeOptions';
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
}

@autobind
export class AutoProjectForm extends React.Component<Props, State> {

  private readonly apiClient: ApiClient;

  public constructor(props: Props) {
    super(props);
    this.apiClient = new ApiClient();

    this.state = {
      regions: [],
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
        <div className="title">1. Localización. Dinos, ¿Dónde te gustaría vivir?</div>
        <div className="inputs">
          <AutocompleteInput
            label="Comarca"
            options={this.state.regions.map(r => r.name)}
            disabled={false}
            onChange={this.handleOnRegionInputChange}
          />
          <AutocompleteInput
            label={'Población'}
            options={this.state.selectedRegion?.cities.map(c => c.name) || []}
            disabled={!this.state.selectedRegion}
          />
          <AutocompleteInput label={'Barrio'} options={[ 'Les Corts', 'Gracia', 'Poble Nou' ]} disabled={false}/>
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

  private renderSecondStep(): React.ReactNode {
    return (
      <div className="step">
        <div className="title">2. Tamaño. ¿Cómo de grande lo necesitas?</div>
        <div className="inputs">
          <SizeOptions onSelectOption={() => {
          }}/>
        </div>
      </div>
    );
  }

  private renderThirdStep(): React.ReactNode {
    return (
      <div className="step">
        <div className="title">
          3. ¿Cuánto estas dispuesto a gastar? (Recuerda que necesitarás disponer de un 25% inicial...)
        </div>
        <div className="inputs">
          <HousePrice/>
        </div>
      </div>
    );
  }
}


