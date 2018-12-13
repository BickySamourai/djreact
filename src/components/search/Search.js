import React, { Component } from "react";
import axios from 'axios';

class NavbarSearch extends Component {
   

   handleChange = e => {
      axios.get('http://127.0.0.1:8000/api/search/music_name='+e.target.value).then(res => {
         /*this.setState({
            tab: res.data
         })*/
         console.log(res.data)
      })
   };

   render() {
      return (
         <input type="text" onChange={this.handleChange} />
      );
   }
}

export default NavbarSearch;