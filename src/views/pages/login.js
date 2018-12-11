// import external modules
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {
   Row,
   Col,
   Input,
   FormGroup,
   Button,
   Label,
   Card,   
   CardBody,
   CardFooter
} from "reactstrap";
import * as actions from '../../redux/actions/auth';
import {connect} from 'react-redux';
import {Form} from 'antd'

class Login extends Component {
   handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
            this.props.onAuth(values.userName, values.password);
        } 
      });
      this.props.history.push('/');
   }

   render() {
      const { getFieldDecorator } = this.props.form;

      return (
         <div className="container">
            <Row className="full-height-vh">
               <Col xs="12" className="d-flex align-items-center justify-content-center">
                  <Card className="gradient-indigo-purple text-center width-400">
                     <CardBody>
                        <h2 className="white py-4">Login</h2>
                        <Form onSubmit={this.handleSubmit} className="pt-2">
                           <FormGroup>
                              <Col md="12">
                                 {getFieldDecorator('userName', {
                                 rules: [{ required: true, message: 'Please input your username!' }],
                                 })(
                                 <Input type="email" className="form-control" name="inputEmail" id="inputEmail" placeholder="Email" required />
                                 )}
                              </Col>
                           </FormGroup>

                           <FormGroup>
                              <Col md="12">
                                 {getFieldDecorator('password', {
                                 rules: [{ required: true, message: 'Please input your Password!' }],
                                 })(
                                 <Input type="password" className="form-control" name="inputPass" id="inputPass"  placeholder="Password" required />
                                 )}
                              </Col>
                           </FormGroup>

                           <FormGroup>
                              <Col md="12">
                                 <Button type="submit" color="danger" block className="btn-pink btn-raised">
                                    Connexion
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
                           <NavLink to="/pages/register" className="text-white">
                              S'enregistrer
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

const LoginForm = Form.create()(Login);

const mapStateToProps = state => { //mapStateToProps : convert state from the store into properties
  return {
    loading: state.loading,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username,password) =>  dispatch(actions.authLogin(username,password))

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);
