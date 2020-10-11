import React from 'react';
import { Title } from '../title/Title';
import { Description } from '../description/Description';
import './AutoProjectForm.scss';
import { SizeOption, SizeOptions } from '../size-options/SizeOptions';
import { HousePrice } from '../house-price/HousePrice';
import { ApiClient } from '../../api/ApiClient';
import { Region } from '../../entities/Region';
import autobind from 'autobind-decorator';
import { City } from '../../entities/City';
import { LocationQuestions } from './partials/LocationQuestions';
import { Step } from './common/Step';
import { CommentQuestion } from './partials/CommentQuestion';
import { ContactQuestions } from './partials/ContactQuestions';
import { FinalExplanation } from '../final-explanation/FinalExplanation';
import { Button } from '@material-ui/core';
import swal from 'sweetalert2';
import { SubmitResponse } from '../../api/SubmitResponse';

interface Props {
}

interface State {
  regions: Region[];
  selectedRegion?: Region;
  selectedCity?: City;
  neighborhood?: string;
  selectedSizeOption?: SizeOption;
  housePrice?: number;
  comment?: string;
  name?: string;
  phone?: string;
  email?: string;
  wantsContact: boolean;
}

@autobind
export class AutoProjectForm extends React.Component<Props, State> {

  private readonly apiClient: ApiClient;

  public constructor(props: Props) {
    super(props);
    this.apiClient = new ApiClient();

    this.state = {
      regions: [],
      wantsContact: false,
    };
  }

  public async componentDidMount(): Promise<void> {
    this.setState({
      regions: await this.apiClient.requestRegions(),
    });
  }

  public render(): React.ReactNode {
    return (
      <div>
        <Title/>
        <Description/>
        {this.renderLocationQuestions()}
        {this.renderSizeQuestions()}
        {this.renderHousePriceQuestion()}
        {this.renderCommentQuestion()}
        {this.renderContactQuestions()}
        <FinalExplanation onCheckboxChange={this.handleOnWantsContactCheckboxChange}/>
        <div className="submit-button-wrapper">
          <Button variant="contained" size="large" color="primary" onClick={this.onClickButton}>
            Enviar!
          </Button>
        </div>
      </div>
    );
  }

  private renderLocationQuestions(): React.ReactNode {
    return (
      <LocationQuestions
        regions={this.state.regions}
        onRegionInputChange={this.handleOnRegionInputChange}
        selectedRegion={this.state.selectedRegion}
        onCityInputChange={this.handleOnCityInputChange}
        selectedCity={this.state.selectedCity}
        onNeighborhoodInputChange={this.handleOnNeighborhoodInputChange}
      />
    );
  }

  private handleOnRegionInputChange(selectedRegion: Region | undefined): void {
    this.setState({
      selectedRegion,
      selectedCity: undefined,
    });
  }

  private handleOnCityInputChange(selectedCity: City | undefined): void {
    this.setState({ selectedCity });
  }

  private handleOnNeighborhoodInputChange(neighborhood: string): void {
    this.setState({ neighborhood });
  }

  private renderSizeQuestions(): React.ReactNode {
    return (
      <Step title="Tamaño. ¿Cómo de grande lo necesitas?">
        <SizeOptions onSelectOption={this.handleOnSizeOptionsSelectChange}/>
      </Step>
    );
  }

  private handleOnSizeOptionsSelectChange(selectedSizeOption: SizeOption | undefined): void {
    this.setState({ selectedSizeOption });
  }

  private renderHousePriceQuestion(): React.ReactNode {
    return (
      <Step title="¿Cuánto estas dispuesto a gastar? (Recuerda que necesitarás disponer de un 25% inicial...)">
        <HousePrice onChange={this.handleOnHousePriceChange}/>
      </Step>
    );
  }

  private handleOnHousePriceChange(value: number): void {
    this.setState({
      housePrice: value,
    });
  }

  private renderCommentQuestion(): React.ReactNode {
    return (
      <CommentQuestion onCommentChange={this.handleOnCommentInputChange}/>
    );
  }

  private handleOnCommentInputChange(comment: string): void {
    this.setState({ comment });
  }

  private renderContactQuestions(): React.ReactNode {
    return (
      <ContactQuestions
        onNameInputChange={this.handleOnNameInputChange}
        onPhoneNumberInputChange={this.handleOnPhoneNumberInputChange}
        onEmailInputChange={this.handleOnEmailInputChange}
      />
    );
  }

  private handleOnNameInputChange(name: string): void {
    this.setState({ name });
  }

  private handleOnPhoneNumberInputChange(phone: string): void {
    this.setState({ phone });
  }

  private handleOnEmailInputChange(email: string): void {
    this.setState({ email });
  }

  private async onClickButton(): Promise<void> {
    const response: SubmitResponse = await this.apiClient.submitForm({
      region: this.state.selectedRegion?.name,
      city: this.state.selectedCity?.name,
      neighborhood: this.state.neighborhood,
      size: this.state.selectedSizeOption?.value,
      house_price: this.state.housePrice,
      comment: this.state.comment,
      name: this.state.name,
      email: this.state.email,
      phone_number: this.state.phone,
      wants_contact: this.state.wantsContact,
    });

    if (response.success) {
      await swal.fire('Formulario enviado!', 'Revisa tu correo', 'success');
    } else {
      console.log(response.errors)
    }
  }

  private handleOnWantsContactCheckboxChange(checked: boolean): void {
    this.setState({
      wantsContact: checked,
    });
  }
}


