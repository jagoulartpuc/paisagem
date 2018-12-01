import React, { Component } from 'react';
import { render } from 'react-dom';

import Typography from "@material-ui/core/Typography";
import Map from './map';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {geolocated} from 'react-geolocated';
import TextField from "@material-ui/core/TextField";
import {listIndividuosByEspecie} from "services/especies/especies";
import {getImageByIndividuos} from "services/individuos/individuos";
import IndividuoModalWrapped from "components/IndividuoModal/IndividuoModal"


const refs = {};



class ListaIndividuos extends Component {
  constructor(props) {
    super(props);
    this.state = {
        lat: 0,
        long: 0,
        isMarkerShown: false,
        imagensUpload: [],
        imagens: [],
        especies:{},
        modalIndividuo: false,
      step: 0,
    }
  }


componentDidMount() {
    this.showCurrentLocation();
    

}


showCurrentLocation = async () => {
    var indiv = await listIndividuosByEspecie(this.props.id);
    
    if (navigator.geolocation) {
        
      navigator.geolocation.getCurrentPosition(
        position => {
           
          this.setState({
              indiv,
              lat: position.coords.latitude,
              long: position.coords.longitude,
              isMarkerShown: true
          })
         
        }
        
      ), { maximumAge: Infinity, timeout: 5000, enableHighAccuracy: true }
    } else {
      console.log("error")
    }

  }

  onMarkerMounted = ref => {
    refs.marker = ref;

  }


  onClickIndividuo = async id => {
    var state = this.state;
    state.imagens = await getImageByIndividuos(id);
    this.setState({
      state
    },console.log("clicou", this.state.imagens),
    this.openCloseModal())
  };

  openCloseModal = ()=>{
    var trocaValorModal = !this.state.modalIndividuo;
    this.setState({ modalIndividuo: trocaValorModal });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.onSubmit();
  }

  render() {
    console.log(this.state.indiv)
    return (
      <React.Fragment>

      <Typography variant="subheading" gutterBottom>
          Aqui você pode ver todos indivíduos cadastrados e suas localizações
        </Typography>
        
        <div>
          <Map
            isMarkerShown={this.state.isMarkerShown}
            lat={this.state.lat}
            long={this.state.long}
            onMarkerMounted={this.onMarkerMounted}
            individuos={this.state.indiv}
            onClickIndividuo={this.onClickIndividuo}
            />
        </div>
        <div>
        
        <IndividuoModalWrapped
            clickIndividuo={this.openCloseModal}
            open={this.state.modalIndividuo}
            imagens={this.state.imagens}
        />
        
      </div>



      </React.Fragment>
    );
  }
}



export default ListaIndividuos












