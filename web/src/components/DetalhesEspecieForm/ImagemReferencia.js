import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import ara from './araucaria.jpg';
import des from './araucaria-silhouette-vector.jpg';
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
    flexDirection:'row',
    display: 'inline-block',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing.unit * 4,
    marginBottom: 20,
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
});

class ImagemReferencia extends React.Component {
  state = {
    activeStep: 0,
  };

 
  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  render() {
    const { classes, theme } = this.props;
    const { activeStep } = this.state;

   const tutorialSteps = [
      {
        imgPath: this.props.especie.fot,
        
      },
      {
        imgPath: this.props.especie.desen,
      },
  
    ];

    const maxSteps = tutorialSteps.length;
    console.log(this.props.especie)
    return (
        <div className={classes.root}>
          <h6></h6>
            {console.log(tutorialSteps)}
            <img
              className={classes.img}
              src={tutorialSteps[activeStep].imgPath}
              alt={tutorialSteps[activeStep].label}
            />
            <MobileStepper
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              className={classes.mobileStepper}
              nextButton={
                <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
                  Próximo
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
              }
              backButton={
                <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
                  {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                  Anterior
            </Button>
              }
            />
        
        </div>

    );

  }
}

ImagemReferencia.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ImagemReferencia);