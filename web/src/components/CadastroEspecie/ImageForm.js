import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ImageComponent from "components/UploadImg/ImageComponent.js";
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
    marginTop: theme.spacing.unit * 3
  }
});

class ImageForm extends React.Component {
  constructor() {
    super();
    this.state = {
      blocksave:true
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  
  handleSubmit(evt) {
    evt.preventDefault();
    //this.props.onSubmit();
    if(!this.state.blocksave){
      this.props.onSubmit();
    }
    else{
      this.notify(3);
      this.notify(4,"É preciso uma fotografia e uma imagem da espécie para concluir!");
    }
    
  }
  changeblocksave = bool => {
    var newState = this.state;
    newState.blocksave = bool;
    
    this.setState(
      newState
    );

    
  }

  handleBack(evt) {
    evt.preventDefault();
    this.props.onBack();
  }

  notify(n, desc){
    switch (n) {
      case 1:
        toast.success("Especie Cadastrada com Sucesso.");
        break;
      case 2:
        toast.error("Um ou mais campos não estão preenchidos.");
        break;
      case 3:
        toast.dismiss();
        break;
      case 4:
        toast.error(desc);
        break;
      default:
        toast("Isso foi clicado mas não fez nada.");
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        
        <Typography variant="title" gutterBottom>
            Imagens
          </Typography>
          <Typography variant="caption" gutterBottom>
            Selecione uma fotografia e um desenho representativo da espécie (Obrigatório).
          </Typography>
     
     
            <form onSubmit={this.handleSubmit}>
            <Grid container spacing={24}>
               
              
               
                  <ImageComponent 
                    handleChangeImage = {this.props.handleChangeImage}
                    changeblocksave= {this.changeblocksave}
                  />
                  
              
              
            
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <Button
                id="back"
                onClick={e => this.handleBack(e)}
                variant="contained"
                className={classes.button}
              >
                VOLTAR
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                id="next"
                onClick={e => this.handleSubmit(e)}
                variant="contained"
                color="primary"
                className={classes.button}
              >
                SAlVAR
              </Button>
            </Grid>
            </Grid>
            </Grid>
        </form>
        
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
      </React.Fragment>
      
      
    );
  }
}
export default withStyles(styles)(ImageForm);
