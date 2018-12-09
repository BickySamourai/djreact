import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import { Form, Input,  Icon,  Button, DatePicker, Select, Checkbox } from 'antd';
import * as actions from '../store/actions/auth';
import ApiCategories from '../utils/apiCategories';
import { timingSafeEqual } from 'crypto';
import axios from 'axios'
  
  const FormItem = Form.Item;
  const Option = Select.Option;

  class Signup extends React.Component {
   
    

    state = {
      confirmDirty: false,
      categories : {},
    };

    
   
  
     componentDidMount() {
       axios.get('http://127.0.0.1:8000/auth/categories/')

      .then(
          (result) => {
    
            this.setState({
              categories: result.data
            });
          },
          // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
          (error) => {
            console.log(error)
          }
        )
    }
    
    handleSubmit = (e) => {

      e.preventDefault();

      this.props.form.validateFieldsAndScroll((err, values) => {

        if (!err) 
            this.props.onAuth(values.userName, values.email, values.password, values.confirm, values.last_name, values.first_name, values.categories);
        
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
      let categories = this.state.categories;
      console.log(categories)
    
     //categories.map((name)=>console.log(name));
      let errorMessage = null;
        if(this.props.error){
            errorMessage = <p>{this.props.error}</p>
        }
      const { getFieldDecorator } = this.props.form;
  
  
      return (
        /*<div> 
            {errorMessage}
            {*/
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
          {getFieldDecorator('categories', {
            rules: [
              { required: true, message: 'Please select your favourite colors!', type: 'array' },
            ],
          })(
            <Select mode="multiple" placeholder="Please select favourite colors">
              <Option value="Rap">Rap</Option>
              <Option value="green">Green</Option>
          <Option value="blue">Blue</Option>
          
            </Select>
          )}
        </FormItem>
          <FormItem>
          <Checkbox >Compte Spotify</Checkbox>
        </FormItem>

          <FormItem>
                    <Button type ="primary" htmlType="submit" > S'inscrire </Button> Ou 
                    
                    <NavLink 
                    to ='/login'> Connectez-vous!
                    </NavLink>
          </FormItem>
        </Form>
        //}</div>
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
      onAuth: (username, email, password1, password2, last_name, first_name, categories ) =>  dispatch(actions.authSignup(username, email, password1, password2, last_name, first_name, categories ))
  
    }
  }

  export default connect(mapStateToProps,mapDispatchToProps)(SignupForm);
  