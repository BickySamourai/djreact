import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {
    Form, Input,  Icon,  Button, DatePicker, Select
  } from 'antd';
import * as actions from '../store/actions/auth';
  
  const FormItem = Form.Item;
  const Option = Select.Option;

  
  class Signup extends React.Component {
    state = {
      confirmDirty: false,
    };
  
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
            this.props.onAuth(
                values.userName, 
                values.email,
                values.password,
                values.confirm,
                values.lastname,
                values.firstname,
                values.categories,
                values.birthdate);
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
        <Form onSubmit={this.handleSubmit}>
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
                required: true, message: 'Please input your E-mail!',
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
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Mot de passe"  onBlur={this.handleConfirmBlur} />
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator('lastname', {
                rules: [{
                required: true,
                message: 'Please input your name',
                }],
            })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Entre ton nom" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('firstname', {
                rules: [{
                required: true,
                message: 'Please input your firstname',
                }],
            })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Entre ton prénom" />
            )}
          </FormItem>
          <FormItem>
          {getFieldDecorator('categories', {
            rules: [
              { required: true, message: 'Please select your favourite colors!', type: 'array' },
            ],
          })(
            <Select mode="multiple" placeholder="Please select favourite colors">
              <Option value="red">Red</Option>
              <Option value="green">Green</Option>
              <Option value="blue">Blue</Option>
            </Select>
          )}
        </FormItem>
          <FormItem>
          {getFieldDecorator('birthdate',{
            rules: [{ type: 'object', required: true, message: 'Donnez votre date de naissance!' }]
            })(
            <DatePicker placeholder = 'Date de naissance' />
          )}
        </FormItem>

          <FormItem>
                    <Button type ="primary" htmlType="submit" > S'inscrire </Button> Ou 
                    
                    <NavLink 
                    to ='/login'> Connectez-vous!
                    </NavLink>
          </FormItem>
        </Form>
      );
    }
  }
  
  const SignupForm = Form.create()(Signup);

  const mapStateToProps = state => { //mapStateToProps : convert state from the store into properties
    return {
      loading: state.loading,
      error: state.error
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      onAuth: (username, email, password1, password2, lastname, firstname, categories, birthdate ) =>  dispatch(actions.authSignup(username, email, password1, password2, lastname, firstname, categories, birthdate ))
  
    }
  }

  export default connect(mapStateToProps,mapDispatchToProps)(SignupForm);
  