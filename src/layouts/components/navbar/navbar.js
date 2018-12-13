// import external modules
import React from "react";
import { Link } from "react-router-dom";
import {
   Form,
   Collapse,
   Navbar,
   Nav,
   UncontrolledDropdown,
   DropdownToggle,
   DropdownMenu,
   DropdownItem
} from "reactstrap";
import {
   Menu,
   MoreVertical,
   LogOut
} from "react-feather";

import userImage from "../../../assets/img/portrait/small/avatarCustom.png";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../redux/actions/auth';


class ThemeNavbar extends React.Component {
   handleClick = e => {
      this.props.toggleSidebarMenu("open");
   };
   constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
         isOpen: false
      };
   }
   toggle() {
      this.setState({
         isOpen: !this.state.isOpen
      });
   }

   render() {
      var user_fullname = localStorage.getItem("user_lastname") + " " + localStorage.getItem("user_firstname");
      return (
         <Navbar className="navbar navbar-expand-lg navbar-light bg-faded">
            <div className="container-fluid px-0">
               <div className="navbar-header">
                  <Menu
                     size={14}
                     className="navbar-toggle d-lg-none float-left"
                     onClick={this.handleClick.bind(this)}
                     data-toggle="collapse"
                  />
                  <Form className="navbar-form mt-1 float-left" role="search">
                     
                  </Form>
                  {/* <Moon size={20} color="#333" className="m-2 cursor-pointer"/> */}
                  <MoreVertical
                     className="mt-1 navbar-toggler black no-border float-right"
                     size={50}
                     onClick={this.toggle}
                  />
               </div>

               <div className="navbar-container">
                  <Collapse isOpen={this.state.isOpen} navbar>
                     <Nav className="ml-auto float-right" navbar>
                        <UncontrolledDropdown nav inNavbar className="pr-1">
                           <DropdownToggle nav>
                              <img src={userImage} alt="logged-in-user" className="rounded-circle width-35" />
                           </DropdownToggle>
                           <DropdownMenu right>
                              <DropdownItem>
                                 <span className="font-small-3">
                                    {user_fullname}
                                 </span>
                              </DropdownItem>
                              <DropdownItem divider />
                              <Link to="/pages/login" className="p-0">
                                 <DropdownItem onClick = {this.props.logout} >
                                    <LogOut size={16} className="mr-1" /> Déconnexion
                                 </DropdownItem>
                              </Link>
                           </DropdownMenu>
                        </UncontrolledDropdown> 
                     </Nav>
                  </Collapse>
               </div>
            </div>
         </Navbar>
      );
   }
}

const mapDispatchToProps = dispatch => {
   return {
      logout: () => dispatch(actions.logout())
 
   }
 }
 
 export default withRouter(connect(null,mapDispatchToProps)(ThemeNavbar));
