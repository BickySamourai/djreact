// import external modules
import 'antd/es/form/style/index.css';

import React from "react";
import { NavLink, withRouter,Redirect } from "react-router-dom";
import {
   Row,
   Col,
   Input,
   FormGroup,
   Button,
   Card,   
   CardBody,
   CardFooter,Alert
} from "reactstrap";
import * as actions from '../../redux/actions/auth';
import {connect} from 'react-redux';
import {Form, Icon} from 'antd'
const FormItem = Form.Item;

class Login extends React.Component {

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
            this.props.onAuth(values.userName, values.password);
        }
      });
      
    }

   render() {
      let errorMessage = null;
        if(this.props.error){
            errorMessage = <Alert color='danger'>{this.props.error}</Alert>
        }
      const { getFieldDecorator } = this.props.form;

      return (
         <div> 
            {this.props.token && <Redirect to =''/>}
            {!this.props.token &&
         <div className="container">
            <Row className="full-height-vh">
               <Col xs="12" className="d-flex align-items-center justify-content-center">
                  <Card className="gradient-indigo-purple text-center width-400">
                     <CardBody>
                        <h2 className="white py-4">Login</h2>
                        {errorMessage}
                        
                        <Form onSubmit={this.handleSubmit} className="pt-2">
                        <FormItem>
                          {getFieldDecorator('userName', {
                          rules: [{ required: true, message: 'Entrez votre login ou email!' }],
                          })(
                          <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Login" />
                          )} 
                      </FormItem>

                      <FormItem>
                          {getFieldDecorator('password', {
                          rules: [{ required: true, message: 'Entrez votre mot de passe!' }],
                          })(
                          <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Mot de passe" />
                          )}
                      </FormItem>

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
                        <div className="float-center">
                           <NavLink to="/pages/register" className="text-white">
                              S'enregistrer
                           </NavLink>
                        </div>
                     </CardFooter>
                  </Card>
               </Col>
            </Row>
         </div>
         }
         </div>
      );
   }
}

const LoginForm = Form.create()(Login);

const mapStateToProps = state => { //mapStateToProps : convert state from the store into properties
  return {
    loading: state.reducer.loading,
    error: state.reducer.error,
    token: state.reducer.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username,password) =>  dispatch(actions.authLogin(username,password))

  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(LoginForm));
