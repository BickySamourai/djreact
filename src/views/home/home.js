import React, { Component, Fragment } from "react";
import {Redirect, withRouter} from 'react-router-dom'
import {
   Card,
   CardImg,
   CardBody,
   Row,
   Col
} from "reactstrap";
import MusicPlayer from 'react-responsive-music-player';
import axios from 'axios';
import {connect} from 'react-redux';

class Home extends Component {
   
   constructor(props){
      super(props);
      this.state = {
         tab:[],
      };
   } 

   componentDidMount(){
      axios.get('http://127.0.0.1:8000/api/').then(res => {
         this.setState({
            tab: res.data
         })
         //console.log("lol : " + res.data)
      }) 
   }

   render() {
      console.log(this.props)
      return (         
         <Fragment>
            <Row>
               {!this.props.token && <Redirect to ='/pages/login'/>}
               {this.props.token &&
               this.state.tab.map(function(item, index){
                    return <Col sm="12" md="3">
                    <Card>
                       <CardImg height="200" top width="100%" src={item.music_cover} alt="Card cap" />
                       <CardBody>
                             <MusicPlayer  progressColor={"red"}  playlist={this.state.tab[index]} /> 
                       </CardBody>
                    </Card> 
                 </Col>
               }, this)
            }
            </Row>
         </Fragment>
      );
   }
}

const mapStateToProps = state => { //mapStateToProps : convert state from the store into properties
   console.log(state)
  return {
    token: state.reducer.token
  }
}
export default withRouter(connect(mapStateToProps)(Home));