import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import Typography from "@material-ui/core/Typography";
import MapWithAMarker from './MapWithAMarker';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {geolocated} from 'react-geolocated';
import TextField from "@material-ui/core/TextField";


const refs = {};

class LocalizacaoIndividuo extends Component {
  constructor(props) {
    super(props);
   
  }


  handleSubmit(evt) {
    evt.preventDefault();
    this.props.onSubmit();
  }

  render() {
    return (
      <React.Fragment>
        
        <Typography variant="subheading" gutterBottom>
          Localização
        </Typography>
      <Typography variant="caption" gutterBottom>
          Selecione a localização do individuo a ser cadastrado. Você pode alterar a localização como quiser!
        </Typography>
        
        <div>
          <MapWithAMarker
            isMarkerShown={this.props.isMarkerShown}
            currentLocation={this.props.currentLocation}
            DefaultLocation={this.props.DefaultLocation}
            onPositionChanged={this.props.onPositionChanged}
            onMarkerMounted={this.props.onMarkerMounted}
            />
        </div>

        <Grid container spacing={24}>

            <Grid item xs={12} >
                  <TextField
                      id="DescricaoLocal"
                      name="DescricaoLocal"
                      label="Descrição do Local ou ponto de referência"
                      fullWidth  
                      onChange={this.props.onChangeDescLocal}
                      
              
                  />
            </Grid>
            <br/>
            <Grid item xs={12}>
              <Button
                id="next"
                onClick={e => this.handleSubmit(e)}
                variant="contained"
                fullWidth
                color="primary"
              >
                OK, PRÓXIMO
              </Button>
            </Grid>
          </Grid>
      </React.Fragment>
    );
  }
}



export default LocalizacaoIndividuo