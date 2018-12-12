// import external modules
import React, { Component } from "react";
import { NavLink, withRouter, Redirect } from "react-router-dom";
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
import { connect } from 'react-redux';
import { Form, Select, Icon } from 'antd'
import axios from 'axios';


const FormItem = Form.Item;

const Option = Select.Option;

const options = [];


class Register extends Component {
   state = {
      confirmDirty: false,
      checked: false,
      token: localStorage.getItem('token')
   };

   handleSubmit = (e) => {
      console.log('register')
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
         if (!err) {
            this.props.onAuth(
               values.userName,
               values.email,
               values.password,
               values.confirm,
               values.last_name,
               values.first_name,
               values.categories);
         }
      });
   }

   handleConfirmBlur = (e) => {
      const value = e.target.value;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
   }

   compareToFirstPassword = (rule, value, callback) => {
      console.log('1')
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
   componentDidMount() {





      axios.get('http://127.0.0.1:8000/auth/categories/')
         .then(resp => {


            resp.data.map((tab, index) => {
               if (!options[index])
                  options.push(<option key={index} value={tab.name}>{tab.name}</option>);

            })


         })
         .catch(error => {
            console.log('error')
            console.log(error)
         })
      console.log(this.state.categories)
   }

   render() {
      let errorMessage = null;
      if (this.props.error) {
         errorMessage = <Alert color='danger'>{this.props.error}</Alert>
      }
      const { getFieldDecorator } = this.props.form;


      console.log(this.state)

      return (
         <div>
            {this.props.token && <Redirect to =''/>}
            {!this.props.token &&
               <div className="container">
                  <Row className="full-height-vh">
                     <Col xs="12" className="d-flex align-items-center justify-content-center">
                       <Card className="gradient-indigo-purple text-center width-400">
                           <CardBody> 
                              <h2 className="white py-4">Inscription</h2>
                              {errorMessage}
                              <Form onSubmit={this.handleSubmit} className="login-form">
                                 <FormItem>
                                   
                                       {getFieldDecorator('userName', {
                                          rules: [{ required: true, message: 'Please input your username!' }],
                                       })(
                                          <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Login" />
                                       )}
                                    
                                 </FormItem>
                                 <FormItem>
                                    
                                       {getFieldDecorator('email', {
                                          rules: [{
                                             type: 'email', message: 'The input is not valid E-mail!',
                                          }, {
                                             required: true, message: 'Please input your E-mail!', color: 'red'
                                          }],
                                       })(
                                          <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                                       )}
                                    
                                 </FormItem>
                                 <FormItem
                                 >
                                    {getFieldDecorator('password', {
                                       rules: [{
                                          required: true, message: 'Please input your password!',
                                       }, {
                                          validator: this.validateToNextPassword,
                                       }],
                                    })(
                                       <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Mot de passe" />
                                    )}
                                 </FormItem>
                                 <FormItem
                                 >
                                    {getFieldDecorator('confirm', {
                                       rules: [{
                                          required: true, message: 'Please confirm your password!',
                                       }, {
                                          validator: this.compareToFirstPassword,
                                       }],
                                    })(
                                       <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Mot de passe" onBlur={this.handleConfirmBlur} />
                                    )}
                                 </FormItem>

                                 <FormItem>
                                    {getFieldDecorator('last_name', {
                                       rules: [{
                                          required: true,
                                          message: 'Please input your name',
                                       }],
                                    })(
                                       <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Entre ton nom" />
                                    )}
                                 </FormItem>
                                 <FormItem>
                                    {getFieldDecorator('first_name', {
                                       rules: [{
                                          required: true,
                                          message: 'Please input your firstname',
                                       }],
                                    })(
                                       <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Entre ton prénom" />
                                    )}
                                 </FormItem>
                                 <FormItem>
                                    
                                    {
                                       getFieldDecorator('categories', {
                                          rules: [
                                             { required: true, message: 'Choissisez au moins une catégorie!', type: 'array' },
                                          ],
                                       })(


                                          <Select multiple placeholder="Catégories préférées" style={{width:'100%'}}>
                                             
                                             {options}

                                          </Select>



                                       )
                                    }
                                    









                                 </FormItem>
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
            } </div>
      );
   }
}


const SignupForm = Form.create()(Register);

const mapStateToProps = state => { //mapStateToProps : convert state from the store into properties
   return {
      loading: state.reducer.loading,
      error: state.reducer.error,
      token: state.reducer.token
   }
}

const mapDispatchToProps = dispatch => {
   console.log('register')
   return {
     onAuth: (username, email, password1, password2, last_name, first_name, categories ) =>  dispatch(actions.authSignup(username, email, password1, password2, last_name, first_name, categories ))
 
   }
 }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignupForm));