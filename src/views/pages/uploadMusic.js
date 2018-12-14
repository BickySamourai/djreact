import React, { Component, Fragment } from "react";
import { Card, CardBody, CardTitle, Row, Col, Button, FormGroup, Label, Input } from "reactstrap";
import { Formik, Form, Field } from "formik";
import { FileText } from "react-feather";
import * as Yup from "yup";
import Select from "react-select";
import { withRouter } from "react-router-dom";
import axios from "axios";
import DropzoneComponent from 'react-dropzone-component';

import { connect } from 'react-redux';

import * as actions from '../../redux/actions/upload';

// import classnames from "classnames";
import ContentHeader from "../../components/contentHead/contentHeader";
import ContentSubHeader from "../../components/contentHead/contentSubHeader";

const formSchema = Yup.object().shape({
   title: Yup.string()
      .required("Required"),
   artist: Yup.string()
      .required("Required"),
   description: Yup.string()
      .required(),
   album: Yup.string()
      .required("Required"),
});

const options = [
   { value: 'Rap', label: 'Rap' },
   { value: 'Jazz', label: 'Jazz' },
   { value: 'RnB', label: 'RnB' },
   { value: 'HipHop', label: 'HipHop' },
   { value: 'Classique', label: 'Classique' },
 ];
 
 var optionSelected = "unknown";


class uploadMusic extends Component {
   state = {
      file : null,
      filepath: null
   };

  constructor(props) {
    super(props);

    // For a full list of possible configurations,
    // please consult http://www.dropzonejs.com/#configuration
    this.djsConfig = {
      addRemoveLinks: true,
     // acceptedFiles: "image/jpeg,image/png,image/gif",
      autoProcessQueue: false
    };

    this.componentConfig = {
      iconFiletypes: ['.jpg', '.png', '.gif'],
      showFiletypeIcon: false,
      postUrl: 'no-url'
    };




    this.success = file => console.log('uploaded', file);

    this.removedfile = file => console.log('removing...', file);

    this.handleFileAdded = (file) => {
      console.log(file);
      this.state.file = file;

    }

    this.handleSubmit = (values) => {
      console.log('in handleSubmit');
      console.log(values);
      console.log(this.state.file);
      this.props.onSubmit(values.title, values.artist, values.description, optionSelected, values.album, this.state.file)
    }

    this.dropzone = null;
  }



   render() {

     const config = this.componentConfig;
     const djsConfig = this.djsConfig;

     const eventHandlers = {
       init: dz => this.dropzone = dz,
       addedfile: this.handleFileAdded,
       success: this.success,
       removedfile: this.removedfile
     }


      return (
         <Fragment>
            <Row>
               <Col sm="12">
                  <Card>
                     <CardBody>
                        <h4 className="form-section"><FileText size={20} color="#212529" /> Informations</h4>
                        <Formik
                           initialValues={{
                              title: "",
                              artist: "",
                              description: "",
                              category: "",
                              album: "",
                           }}
                           validationSchema={formSchema}
                           onSubmit = {this.handleSubmit.bind(this)}

                           /*onSubmit ={ values => {
                              // same shape as initial values
                              //alert("cat : " + values.category);
                              axios.post('http://127.0.0.1:8000/create/',{
                                 title: values.title,
                                 artist: values.artist,
                                 description: values.description,
                              })
                              alert(
                                 "titre : " + values.title + "\n" +
                                 "Artiste : " + values.artist + "\n" +
                                 "Description : " + values.description + "\n" +
                                 "Catégorie : " + optionSelected + "\n" +
                                 "Album : " + values.album + "\n" +
                                 "File : " + this.state.files
                              );
                           }}*/
                        >
                           {({ errors, touched }) => (
                              <Form>
                                 <FormGroup>
                                    <Label for="title">Titre</Label>
                                    <Field name="title" id="title" className={`form-control ${errors.title && touched.title && 'is-invalid'}`} />
                                    {errors.title && touched.title ? <div className="invalid-feedback">{errors.title}</div> : null}
                                 </FormGroup>
                                 <FormGroup>
                                    <Label for="artist">Artiste</Label>
                                    <Field name="artist" id="artist" className={`form-control ${errors.artist && touched.artist && 'is-invalid'}`} />
                                    {errors.artist && touched.artist ? <div className="invalid-feedback">{errors.artist}</div> : null}
                                 </FormGroup>
                                 <FormGroup>
                                    <Label for="description">Description</Label>
                                    <Field component="textarea" rows="3" name="description" id="description" className={`form-control ${errors.description && touched.description && 'is-invalid'}`} />
                                    {errors.description && touched.description ? <div className="invalid-feedback">{errors.description}</div> : null}
                                 </FormGroup>
                                 <FormGroup>
                                    <Label for="category">Catégorie</Label>
                                    <Select
                                       id="category"
                                       name="category"
                                       options={options}
                                       onChange={value => optionSelected = value.value}
                                       onBlur={this.handleBlur}
                                    />
                                    {errors.category && touched.category ? <div className="invalid-feedback">{errors.category}</div> : null}
                                 </FormGroup>
                                 <FormGroup>
                                    <Label for="album">Album</Label>
                                    <Field name="album" id="album" className={`form-control ${errors.album && touched.album && 'is-invalid'}`} />
                                    {errors.album && touched.album ? <div className="invalid-feedback">{errors.album}</div> : null}
                                 </FormGroup>
                                 <FormGroup>
                                    <Label for="file">Séléctionner un fichier audio</Label>

                                   <DropzoneComponent config={config}
                                                      eventHandlers={eventHandlers}
                                                      djsConfig={djsConfig}
                                   />


                                    {errors.file && touched.file ? <div className="invalid-feedback">{errors.file}</div> : null}
                                 </FormGroup>
                                 <Button type="submit">Envoyer</Button>
                              </Form>
                           )}
                        </Formik>
                     </CardBody>
                  </Card>
               </Col>
            </Row>
         </Fragment>
      );
   }
}

const mapStateToProps = state => { //mapStateToProps : convert state from the store into properties
  return {
    filepath: state.filePath
  }
}

const mapDispatchToProps = dispatch => {
  console.log('upload')
  return {
    onSubmit: (title, artist, description, optionSelected, album, files ) =>  dispatch(actions.onSubmit(title, artist, description, optionSelected, album, files ))

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(uploadMusic));