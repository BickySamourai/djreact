// import external modules
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {
   Row,
   Col,
   Input,
   FormGroup,
   Button,
   Card,   
   CardBody,
   CardFooter
} from "reactstrap";
import * as actions from '../../store/actions/auth';
import {connect} from 'react-redux';
import {Form} from 'antd'


class Register extends Component {
   state = {
      confirmDirty: false,
    };

   handleSubmit = (e) => {
      e.preventDefault();
      
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
           console.log(values.birthdate);
            this.props.onAuth(
                values.userName, 
                values.email,
                values.password,
                values.confirm,
                values.lastname,
                values.firstname,
                values.birthdate);
        } else {
            console.log('error...!!');
        }
      });
    }
  
    handleConfirmBlur = (e) => {
      const value = e.target.value;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
  
    compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    }
  
    validateToNextPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    }

   render() {
      const { getFieldDecorator } = this.props.form;

      return (
         <div className="container">
            <Row className="full-height-vh">
               <Col xs="12" className="d-flex align-items-center justify-content-center">
                  <Card className="gradient-indigo-purple text-center width-400">
                     <CardBody>
                        <h2 className="white py-4">Inscription</h2>
                        <Form onSubmit={this.handleSubmit} className="pt-2">
                           <FormGroup>
                              <Col md="12">
                                 {getFieldDecorator('userName', {
                                 rules: [{ required: true, message: 'Please input your username!' }],
                                 })(
                                    <Input
                                       type="text"
                                       className="form-control"
                                       name="inputName"
                                       id="inputName"
                                       placeholder="Login"
                                       required
                                    />
                                 )}
                              </Col>
                           </FormGroup>

                           <FormGroup>
                              <Col md="12">
                              {getFieldDecorator('lastname', {
                              rules: [{
                                 required: true,
                                 message: 'Please input your name',
                                 }],
                              })(
                                    <Input type="text" className="form-control" name="inputName" id="inputName" placeholder="Nom" required />
                              )}
                              </Col>
                           </FormGroup>
                           
                           

                           <FormGroup>
                              <Col md="12">
                              {getFieldDecorator('firstname', {
                                 rules: [{
                                 required: true,
                                 message: 'Please input your firstname',
                                 }],
                              })(
                                 <Input type="text" className="form-control" name="inputName" id="inputName" placeholder="Prénom" required />
                              )}
                              </Col>
                           </FormGroup>
                           <FormGroup>
                              <Col md="12">
                              {getFieldDecorator('birthdate',{
                              rules: [{ required: true, message: 'Donnez votre date de naissance!' }]
                              })(
                                    <Input type="date" className="form-control" name="inputName" id="inputName" required />
                              )}
                              </Col>
                           </FormGroup>

                           <FormGroup>
                              <Col md="12">
                                 {getFieldDecorator('email', {
                                 rules: [{
                                    type: 'email', message: 'The input is not valid E-mail!',
                                 }, {
                                    required: true, message: 'Please input your E-mail!',
                                 }],
                                 })(
                                    <Input type="email" className="form-control" name="inputEmail" id="inputEmail" placeholder="Email" required />
                                 )}
                              </Col>
                           </FormGroup>

                           <FormGroup>
                              <Col md="12">
                              {getFieldDecorator('password', {
                              rules: [{
                                 required: true, message: 'Please input your password!',
                              }, {
                                 validator: this.validateToNextPassword,
                              }],
                              })(
                                 <Input type="password" className="form-control" name="inputPass" id="inputPass" placeholder="Mot de passe" required/>
                              )}
                              </Col>
                           </FormGroup>
                           <FormGroup>
                              <Col md="12">
                              {getFieldDecorator('confirm', {
                              rules: [{
                                 required: true, message: 'Please confirm your password!',
                              }, {
                                 validator: this.compareToFirstPassword,
                              }],
                              })(
                                 <Input type="password" className="form-control" name="inputPass" id="inputPass" 
                                 placeholder="Retapé le mot de passe" onBlur={this.handleConfirmBlur} required/>
                              )}
                              </Col>
                           </FormGroup>




                           <FormGroup>
                              <Col md="12">
                                 <Button type="submit" color="danger" block className="btn-pink btn-raised">
                                    Envoyer
                                 </Button>
                              </Col>
                           </FormGroup>
                        </Form>
                     </CardBody>
                     <CardFooter>
                        <div className="float-left">
                           <NavLink to="/pages/forgot-password" className="text-white">
                              Mot de passe oublié ?
                           </NavLink>
                        </div>
                        <div className="float-right">
                           <NavLink to="/pages/login" className="text-white">
                              Connexion
                           </NavLink>
                        </div>
                     </CardFooter>
                  </Card>
               </Col>
            </Row>
         </div>
      );
   }
}


const SignupForm = Form.create()(Register);

const mapStateToProps = state => { //mapStateToProps : convert state from the store into properties
  return {
    loading: state.loading,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, email, password1, password2, lastname, firstname, birthdate ) =>  dispatch(actions.authSignup(username, email, password1, password2, lastname, firstname, birthdate ))

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignupForm);