import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux'; // allows us to acces some of the state from the store
import BaseRouter from './routes';
import 'antd/dist/antd.css';
import CustomLayout from './containers/Layout';
import * as actions from './store/actions/auth';

class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignup();
  }
  render() {
    return (
      <div>
        <Router>
          <CustomLayout {...this.props }>  
            <BaseRouter />
          </CustomLayout>

        </Router>


      </div>
    );
  }
}

const mapStateToProps = state => { //mapStateToProps : convert state from the store into properties
  console.log(state)
  return {
    isAuthenticated: state.token !== null // acces to isAuthenticated as a property
  }
}

const mapDispatchToProps = dispatch => {
  console.log("1")
  return {
    onTryAutoSignup: () =>  dispatch(actions.authCheckState())

  }
}

export default connect(mapStateToProps,mapDispatchToProps) (App);
