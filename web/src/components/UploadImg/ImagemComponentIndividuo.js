import React from "react";
import "./ImageComponentStyle.css"
import Alert from '../AlertDialog/Alert.js';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button'
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Switch from '@material-ui/core/Switch';
import md5 from 'md5';
import Grid from "@material-ui/core/Grid";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';

const styles = theme => ({
    buttons: {
        display: "flex",
        justifyContent: "flex-end"
    },
    button: {
        marginTop: theme.spacing.unit * 3,
        marginBottom : theme.spacing.unit * 3
    }
});

class ImageComponentIndividuo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: {},
            imagePreviewUrl: '',
            //qntImagensError: false,
            imageUpload: [],
            tipoImg: "imagem" , //tipo da imagem atual
        };
        this._handleSubmit = this._handleSubmit.bind(this);
    }
    
    _handleSubmit(e) {
        e.preventDefault();
       
            var md5 = require('md5');
            var imageUploadAtual = this.state; 
           
            var Image = new FormData();          
           
            Image.append('imagem', this.state.file); // arquivo em si
            Image.append('nomeImagem', this.state.file.name); //nome do arquivo
            Image.append('nome', md5(this.state.imagePreviewUrl)+ "." + this.state.file.type.split("image/")[1]); //nome a ser salvo no banco
            imageUploadAtual.imageUpload.push(Image);
            
            this.setState({ imageUploadAtual },
                this.props.handleChangeImage(Image),
                toast.success("Imagem enviada")
            );       
    }

    _handleImageChange(e) {
        e.preventDefault();

        //leitura do arquivo (função pronta)
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {

            //console.log(file)
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });

        }
        if (file && file.type.match('image.*')) {
            reader.readAsDataURL(file)
        }
    }
    _handleDelete(row) {
        var i = row.rowIndex;
        document.getElementById('imgTable').deleteRow(i);

        for (var j = 0; j < this.state.imageUpload.length; j++) {
            if (this.state.imageUpload[j].get("imagem") === row.state.file) {
                var list = this.state.imageUpload.splice(j, 1);
                this.setState({ imageUpload: list })
            }
        }

    }


  

    render() {
        const { classes } = this.props;
        let { imagePreviewUrl } = this.state;
        let imagePreview = null;
        if (imagePreviewUrl) {
            imagePreview = (<img src={imagePreviewUrl} height="290" width="490" />);
        } else {
            imagePreview = (<Typography variant="caption" gutterBottom>
                Selecione uma Imagem para Visualização
          </Typography>);
        }
        const lista = (
            [].concat(this.state.imageUpload).map((dado, i) => {
                return <TableRow key={i}>
                    <TableCell>
                        {dado.get("nomeImagem")}
                    </TableCell>
                    
                    <TableCell>
                        <IconButton className={classes.button} aria-label="Delete" color="primary" onClick={(e) => this._handleDelete(this)}>
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                  
                </TableRow>;
            })
        )

        return (
            <Grid container spacing={24}>
             <Grid item xs={12}>
                <div className="previewComponent">
                    <form onSubmit={(e) => this._handleSubmit(e)}>
                    
                        <input className="fileInput"
                            type="file"
                            onChange={(e) => this._handleImageChange(e)} />
                        
                                        
                    <Button id="submitBtn"
                        variant="contained"
                        color="primary"
                        
                        className={classes.button}
                        onClick={(e) => this._handleSubmit(e)}>
                        ENVIAR
                        </Button>
                       
                        {
                            this.props.qntImagensError
                            ?
                            
                            <Alert titulo ="ERRO: Quantidade de Imagens" texto="Quantidade de imagens ultrapassou o limite!" abrir = {this.state.qntImagensError}/>
                            
                            :
                            ""
                        }
                    <div className="imgPreview" >
                        {imagePreview}
                    </div>
             
             
                </form>
                {
                    this.state.imageUpload.length === 0
                        ?
                        ""
                        :
                        <Table className={classes.table} id="imgTable">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Imagem</TableCell> 
                                    <TableCell>Deletar</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>{lista}</TableBody>
                        </Table>

                }

            </div>
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
            </Grid>
            </Grid>
            
        )
    }
}


export default withStyles(styles)(ImageComponentIndividuo);