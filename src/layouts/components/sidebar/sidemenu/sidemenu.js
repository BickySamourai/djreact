// import external modules
import React, { Component } from "react";

import {
   Home,
   MessageSquare,
   ArrowUp,
   ChevronRight,
   Music
} from "react-feather";
import { NavLink } from "react-router-dom";

// Styling
import "../../../../assets/scss/components/sidebar/sidemenu/sidemenu.scss";
// import internal(own) modules
import SideMenu from "../sidemenuHelper";

class SideMenuContent extends Component {
   render() {
      return (
         <SideMenu className="sidebar-content" toggleSidebarMenu={this.props.toggleSidebarMenu}>
            <SideMenu.MenuSingleItem name="Dashboard">
               <NavLink to="/" activeclassname="active">
                  <i className="menu-icon">
                     <Home size={18} />
                  </i>
                  <span className="menu-item-text">Accueil</span>
               </NavLink>
            </SideMenu.MenuSingleItem>

            <SideMenu.MenuSingleItem name="Spotify">
               <NavLink to="/spotify/login/" activeclassname="active">
                  <i className="menu-icon">
                     <Home size={18} />
                  </i>
                  <span className="menu-item-text">Spotify</span>
               </NavLink>
            </SideMenu.MenuSingleItem>



            <SideMenu.MenuSingleItem>
               <NavLink to="/chat" activeClassName="active">
                  <i className="menu-icon">
                     <MessageSquare size={18} />
                  </i>
                  <span className="menu-item-text">Chat</span>
               </NavLink>
            </SideMenu.MenuSingleItem>


            <SideMenu.MenuSingleItem name="UploadMusic">
               <NavLink to="/pages/upload" activeclassname="active">
                  <i className="menu-icon">
                     <ArrowUp size={18} />
                  </i>
                  <span className="menu-item-text">Télécharger</span>
               </NavLink>
            </SideMenu.MenuSingleItem>

         </SideMenu>
      );
   }
}

export default SideMenuContent;