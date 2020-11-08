import React from 'react';
import { Title } from '../title/Title';
import { Description } from '../description/Description';
import './AutoProjectForm.scss';
import { SizeOptions } from '../size-options/SizeOptions';
import { HousePrice } from '../house-price/HousePrice';
import { ApiClient } from '../../api/ApiClient';
import { Region } from '../../entities/Region';
import autobind from 'autobind-decorator';
import { City } from '../../entities/City';
import { LocationQuestions } from './partials/LocationQuestions';
import { Step } from './common/steps/Step';
import { CommentQuestion } from './partials/CommentQuestion';
import { ContactQuestions } from './partials/ContactQuestions';
import { FinalExplanation } from '../final-explanation/FinalExplanation';
import { Button } from '@material-ui/core';
import swal from 'sweetalert2';
import { SubmitResponse } from '../../api/SubmitResponse';
import { Option, Options } from './common/options/Options';

interface Props {
}

interface State {
  regions: Region[];
  selectedRegion?: Region;
  selectedCity?: City;
  neighborhood?: string;
  housePrice: number;
  housePriceError: boolean;
  selectedSizeOption: Option;
  selectedRoomsOption: Option;
  comment?: string;
  name?: string;
  phone?: string;
  email?: string;
  wantsContact: boolean;
  formTriedToSend: boolean;
}

@autobind
export class AutoProjectForm extends React.Component<Props, State> {

  private readonly apiClient: ApiClient;

  public constructor(props: Props) {
    super(props);
    this.apiClient = new ApiClient();

    this.state = {
      regions: [],
      housePrice: 100_000,
      housePriceError: false,
      selectedSizeOption: { text: 'Entre 80 y 100 m2', value: 'BETWEEN_80_AND_100' }, // Chapuza
      selectedRoomsOption: { text: '3', value: '3' },
      wantsContact: false,
      formTriedToSend: false,
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
        {this.renderHousePriceQuestion()}
        {this.renderSizeQuestions()}
        {this.renderRoomsQuestion()}
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
        neighborhood={this.state.neighborhood}
        formTriedToSend={this.state.formTriedToSend}
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
    this.setState({ selectedCity, neighborhood: '' });
  }

  private handleOnNeighborhoodInputChange(neighborhood: string): void {
    this.setState({ neighborhood });
  }

  private renderSizeQuestions(): React.ReactNode {
    return (
      <Step title="Superficie. ¿Cómo de grande lo necesitas?">
        <SizeOptions onSelectOption={this.handleOnSizeOptionsSelectChange}/>
      </Step>
    );
  }

  private handleOnSizeOptionsSelectChange(selectedSizeOption: Option): void {
    this.setState({ selectedSizeOption });
  }

  private renderHousePriceQuestion(): React.ReactNode {
    return (
      <Step title="¿Cuánto estás dispuesto a gastar? Deberás disponer de un 20% inicial">
        <HousePrice
          initialPrice={this.state.housePrice}
          onChange={this.handleOnHousePriceChange}
        />
      </Step>
    );
  }

  private handleOnHousePriceChange(value: number, error: boolean): void {
    this.setState({
      housePrice: value,
      housePriceError: error,
    });
  }

  private renderRoomsQuestion(): React.ReactNode {
    return (
      <Step title="Habitaciones">
        <Options
          options={[
            { text: 'Local Comercial', value: '0' },
            { text: '1', value: '1' },
            { text: '2', value: '2' },
            { text: '3', value: '3' },
            { text: '4', value: '4' },
            { text: '5', value: '5' },
            { text: 'Más de 5', value: '>5' },
          ]}
          initialOption={this.state.selectedRoomsOption}
          onSelectOption={this.handleOnRoomsSelectChange}
        />
      </Step>
    );
  }

  private handleOnRoomsSelectChange(option: Option): void {
    this.setState({
      selectedRoomsOption: option,
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
        nameError={this.state.formTriedToSend && !this.state.name}
        phoneError={this.state.formTriedToSend && !this.state.phone}
        emailError={this.state.formTriedToSend && !this.state.email}
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

  private handleOnWantsContactCheckboxChange(checked: boolean): void {
    this.setState({
      wantsContact: checked,
    });
  }

  private async onClickButton(): Promise<void> {

    const isAllOk = this.checkErrors();

    if (!isAllOk) {
      this.setState({
        formTriedToSend: true,
      });
      return;
    } else {
      this.setState({
        formTriedToSend: false,
      });
    }

    const response: SubmitResponse = await this.apiClient.submitForm({
      region: this.state.selectedRegion?.name,
      city: this.state.selectedCity?.name,
      neighborhood: this.state.neighborhood,
      house_price: this.state.housePrice,
      size: this.state.selectedSizeOption?.value,
      rooms: this.state.selectedRoomsOption?.value,
      comment: this.state.comment,
      name: this.state.name,
      email: this.state.email,
      phone_number: this.state.phone,
      wants_contact: this.state.wantsContact,
    });

    if (response.success) {
      await swal.fire('Formulario enviado!', 'Te vamos a redirigir a nuestra página web.', 'success');
      this.redirectAfterFormSubmit();
    } else {
      await swal.fire('Hay errores en el formulario', '', 'error');
    }
  }

  private redirectAfterFormSubmit(): void {
    window.location.href = 'https://www.pisosautopromocio.com';
  }

  private checkErrors(): boolean {
    const {
      selectedRegion, selectedCity, housePriceError, selectedSizeOption, selectedRoomsOption, email, name, phone,
    } = this.state;

    return !!selectedRegion &&
      !!selectedCity &&
      !housePriceError &&
      !!selectedSizeOption &&
      !!selectedRoomsOption &&
      !!email &&
      !!name &&
      !!phone;
  }
}


