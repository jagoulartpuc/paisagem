import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import ImageStep from './ImageStep';

function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    outline: "none",
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class IndividuoModal extends React.Component {
 

  render() {
    const { classes } = this.props;

    return (
      <div>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
          onClose={this.props.clickIndividuo}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              INDIVIDUO
            </Typography>
        
           
            {this.props.open ?
                    <ImageStep imagens={this.props.imagens}/>
                            :
                            ""
                            
            }
            <IndividuoModalWrapped />
          </div>
        </Modal>
      </div>
    );
  }
}
IndividuoModal.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  // We need an intermediary variable for handling the recursive nesting.
  const IndividuoModalWrapped = withStyles(styles)(IndividuoModal);
  
  export default IndividuoModalWrapped;