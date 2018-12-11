import React from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter, Redirect} from 'react-router-dom';
import * as actions from '../store/actions/auth';

import {
    Form, Spin, Icon, Input, Button
  } from 'antd';
  
const FormItem = Form.Item;


const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;


  
  class Login extends React.Component {
   /* state = {
      token: localStorage.getItem('token')
    };*/
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
          console.log(this.props.error)
            errorMessage = <p>{this.props.error}</p>
        }
      const { getFieldDecorator } = this.props.form;
      console.log(this.state)
      return (
          <div> 
            {localStorage.getItem('token') && <Redirect to ='/'/>}
            {!localStorage.getItem('token') &&
            <div>
              {errorMessage}
              {
                
                  this.props.loading ?
                  <Spin indicator={antIcon} />

                  :

                  <Form onSubmit={this.handleSubmit} className="login-form">
                      <FormItem>
                          {getFieldDecorator('userName', {
                          rules: [{ required: true, message: 'Please input your username!' }],
                          })(
                          <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Login" />
                          )}
                      </FormItem>

                      <FormItem>
                          {getFieldDecorator('password', {
                          rules: [{ required: true, message: 'Please input your Password!' }],
                          })(
                          <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Mot de passe" />
                          )}
                      </FormItem>

                      <FormItem>
                          <Button type ="primary" htmlType="submit" className="login-form-button"> Se connecter </Button> Ou 
                          
                          <NavLink 
                          to ='/signup'> Inscrivez-vous!
                          </NavLink>
                      </FormItem>
                  </Form>
              }
              </div>
            }
            
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

  export default withRouter(connect(mapStateToProps,mapDispatchToProps)(LoginForm));
  