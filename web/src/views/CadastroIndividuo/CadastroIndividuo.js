import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";

import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import Page from "views/Page/Page.js";
import "react-toastify/dist/ReactToastify.css";

import LocalizacaoIndividuo from "components/LocalizacaoIndividuo/LocalizacaoIndividuo.js";
import ImgForm from "components/LocalizacaoIndividuo/ImgForm.js";
import SelecionaEspecie from "components/LocalizacaoIndividuo/SelecionaEspecie.js"
import { Grid } from "@material-ui/core";
import { createIndividuo } from "services/especies/especies";
import img from "./plantas.jpg"
import { upload } from "services/uploadImg/uploadImagem";
import { listAll } from "services/especies/especies";
import { ToastContainer, toast } from 'react-toastify';

const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(900 + theme.spacing.unit * 2 * 2)]: {
      width: 800,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit * 3,
      padding: theme.spacing.unit * 3
    }
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  }
});

const steps = ["Localização", "Espécie", "Imagens"];
const refs = {};
class CadastroIndividuo extends Page {
  constructor(props) {
    super(props);
    this.state = {
      
        lat: 0,
        long: 0,
        isMarkerShown: false,
        imagensUpload: [],
        imagens: [],
        especies:{},
        //id_especie : this.props.id_especie,
        id_especie : this.props.match.params.id,
      step: 0,
    }
    this.goToNext = this.goToNext.bind(this);
    this.goToBack = this.goToBack.bind(this);
  }

  showCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          
          this.setState({
            
              lat: position.coords.latitude,
              long: position.coords.longitude,
              isMarkerShown: true


          })
        }
      ), { maximumAge: Infinity, timeout: 5000, enableHighAccuracy: true }
    } else {
      error => console.log(error)
    }

  }

  fillEspecies = async () => {
    var result = await listAll();
    var especies = [{ value: -1, label: "Selecione a espécie *" }];
    
    if (result && result.length > 0) {
      
      result.map(e => {
        var value = e["id_especie"];
        var label = e["nome_cientifico"];

        var especie = {
          value,
          label
        }

        especies.push(especie)
      })
    }
    var state = this.state;
    state.especies = especies;
    
    this.setState({ state })
  };

  componentDidMount() {
    this.showCurrentLocation();
    this.fillEspecies();
  }

  handleChangeImage = imgState => {
    var state = this.state;

    state.imagensUpload.push(imgState);
    this.setState({ state });
  };
  onMarkerMounted = ref => {
    refs.marker = ref;

  }

  onPositionChanged = () => {
    const position = refs.marker.getPosition();
       this.setState({
         lat: position.lat(),
         long: position.lng(),
       })
      }

      goToBack() {
        const { step } = this.state;
        if (step !== 0) {
          this.setState({
            step: step - 1
          });
        }
      }

  getStep(step) {

    switch (step) {
      case 0:
        return (
          <LocalizacaoIndividuo

            onSubmit={this.goToNext}
            isMarkerShown={this.state.isMarkerShown}
            currentLocation={this.state}
            DefaultLocation={this.state.DefaultLocation}
            onPositionChanged={this.onPositionChanged}
            onMarkerMounted={this.onMarkerMounted}
            onChangeDescLocal={this.handleChange}

          />
        );
      case 1:
       console.log(this.state.especies.id_especie)
        return (
          
            <SelecionaEspecie
              onSubmit={this.goToNext}
              onBack={this.goToBack}
              onChange={this.handleChange}
              especiesList={this.state.especies}
              especie={this.props.match.params.id}
            />
          
         
        );

      case 2:
        return (
          <ImgForm
            onBack={this.goToBack}
            onSubmit={this.goToNext}
            handleChangeImage={this.handleChangeImage}

          />
        );
    }
  }


  async goToNext(e, setSnackbar) {
    const { step } = this.state;
    if (step !== 2) {
      //Adicionou o this.renderAuthentication pq triamos probçema mudando de passo
      this.setState({ step: step + 1 }
        
      );
    } else {
      
      var state = this.state;
      var image = [];
      for (var i = 0; i<this.state.imagensUpload.length;i++){
          var path = await upload(this.state.imagensUpload[i])
          image.push(path);
          
      }
      state.imagens = image;
      
      this.setState({
        state
      },() => {
        this.createIndividuo().catch(e => {
          alert("Erro ao Salvar");
        });
        toast.success("Individuo Cadastrado")
      } 

    );

      //var result = await createIndividuo(this.state);

     
      this.setState({ step: 0 })
    }

  }

  async createIndividuo(){
    await createIndividuo(this.state)
  }

  goToBack() {
    const { step } = this.state;
    if (step !== 0) {
      //Adicionou o this.renderAuthentication pq triamos probçema mudando de passo
      this.setState({ step: step - 1 });
    }
  }

  handleChange = campo => event => {
    var individuo = this.state;
    individuo[campo] = event.target.value;
    return this.setState({
      individuo
    });
  };

  handleChangeImage = imgState => {
    //console.log(1,imgState)
    var imageUploadAtual = this.state.imagens;
    imageUploadAtual.push(imgState);
    return this.setState({ imagensUpload : imageUploadAtual }, console.log(this.state));
  };



  async handleSubmitImage(e) {
  e.preventDefault()
  
  await this.setState({qntImagensError : false})
      var imageUploadAtual = this.state.imageUpload ;
      imageUploadAtual.push(this.state.file) ;
      this.setState({ imageUpload: imageUploadAtual });
 
}
authenticated = () => {
  return (
      this.unauthenticated()
    );
  }
  //Alterando para Authenticated pra manter o padrão do resto do sistema.
  unauthenticated = () => {
    const { classes } = this.props;

    return (
      <div
        style={{
          height: "109vh",
          backgroundImage: `url(${img})`,
          paddingTop: "2%",

        }}
      >

        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="display1" align="center">
              Cadastro de Individuo
          </Typography>
            <Stepper activeStep={this.state.step} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {this.getStep(this.state.step)}
          </Paper>
          <ToastContainer
                  position="top-right"
                  autoClose={2000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={true}
                  pauseOnVisibilityChange
                  draggable
                  pauseOnHover
                  />
                  {/* Same as */}
              <ToastContainer />
        </main>
      </div>
    );
  };
}

CadastroIndividuo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CadastroIndividuo);