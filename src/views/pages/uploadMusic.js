import React, { Component, Fragment } from "react";
import { Card, CardBody, CardTitle, Row, Col, Button, FormGroup, Label, Input } from "reactstrap";
import { Formik, Field, Form } from "formik";
import { FileText } from "react-feather";
import * as Yup from "yup";
import axios from "axios"

// import classnames from "classnames";
import ContentHeader from "../../components/contentHead/contentHeader";
import ContentSubHeader from "../../components/contentHead/contentSubHeader";

const formSchema = Yup.object().shape({
   title: Yup.string()
      .required("Required"),
   artist: Yup.string()
      .required("Required"),
   description: Yup.string(),
   album: Yup.string()
      .required("Required"),
});


class blankPage extends Component {

   render() {
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
                           onSubmit ={values => {
                              // same shape as initial values
                              //alert("cat : " + values.category);
                              axios.post('http://127.0.0.1:8000/create/',{
                                 title: values.title,
                                 artist: values.artist,
                                 description: values.description,
                              })
                           }}
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
                                    <Input type="textarea" rows="3" name="description" id="description" className={`form-control ${errors.description && touched.description && 'is-invalid'}`} />
                                    {errors.description && touched.description ? <div className="invalid-feedback">{errors.description}</div> : null}
                                 </FormGroup>
                                 <FormGroup>
                                    <Label for="category">Catégorie</Label>
                                    <Input type="select" id="category" name="category" >
                                             <option value="rap" defaultValue="" disabled="">Rap</option>
                                             <option value="rnb">RnB</option>
                                             <option value="hip_hop">Hip Hop</option>
                                             <option value="jazz">Jazz</option>
                                             <option value="classique">Classique</option>
                                             <option value="pop">Pop</option>
                                    </Input>
                                    {errors.category && touched.category ? <div className="invalid-feedback">{errors.category}</div> : null}
                                 </FormGroup>
                                 <FormGroup>
                                    <Label for="album">Album</Label>
                                    <Field name="album" id="album" className={`form-control ${errors.album && touched.album && 'is-invalid'}`} />
                                    {errors.album && touched.album ? <div className="invalid-feedback">{errors.album}</div> : null}
                                 </FormGroup>
                                 <FormGroup>
                                    <Label for="file">Séléctionner un fichier audio</Label>
                                    <Input type="file" className="form-control-file" name="file" id="file"/>
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

export default blankPage;
