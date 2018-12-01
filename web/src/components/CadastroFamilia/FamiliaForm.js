import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import withStyles from "@material-ui/core/styles/withStyles";


const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit * 5
  }
});
class FamiliaForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(evt) {
    evt.preventDefault();
    this.props.onSubmit();
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <TextField
                id="nome"
                name="nome"
                multiline
                label="Nome"
                helperText="Informe o nome da familia"
                onChange={this.props.onChangeNome}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="descricao"
                name="descricao"
                multiline
                label="Descrição geral da familia"
                helperText="Forneça uma breve descrição geral da  familia"
                onChange={this.props.onChangeDescricao}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container spaing={24}>
            <Grid item xs={12}>
            <Button
                id="salvar"
                onClick={e => this.handleSubmit(e)}
                variant="contained"
                color="primary"
                className={classes.button}
              >
                SAlVAR
              </Button>
            </Grid>

          </Grid>
        </form>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(FamiliaForm);
