// import external modules
import React, { Component, Fragment } from "react";
import { connect } from 'react-redux'
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";

// Styling
import "../../../assets/scss/components/sidebar/sidebar.scss";

// import internal(own) modules
import SideMenuContent from "./sidemenu/sidemenu";
import SidebarHeader from "./sidebarHeader/sidebarHeader";
import { FoldedContentConsumer } from "../../../utility/context/toggleContentContext";
import templateConfig from "../../../templateConfig";
import bgImg1 from "../../../assets/img/sidebar-bg/01.jpg";



class Sidebar extends Component {
   state = {
      collapsedSidebar: templateConfig.sidebar.collapsed,
      width: window.innerWidth
   };
   updateWidth = () => {
      this.setState(prevState => ({
         width: window.innerWidth
      }));
   };

    handleCollapsedSidebar = (collapsedSidebar) => {
       this.setState({collapsedSidebar})
    }

   componentDidMount() {
      if (window !== "undefined") {
         window.addEventListener("resize", this.updateWidth, false);
      }
   }

   componentWillUnmount() {
      if (window !== "undefined") {
         window.removeEventListener("resize", this.updateWidth, false);
      }
   }
   handleMouseEnter = e => {
      this.setState(prevState => ({
         collapsedSidebar: false
      }));
   };

   handleMouseLeave = e => {
      this.setState(prevState => ({
         collapsedSidebar: true
      }));
   };

   render() {
      return (
        <Fragment>
         <FoldedContentConsumer>
            {context => (
               <div
               data-active-color="white"
               data-background-color={(this.props.color === '') ? templateConfig.sidebar.backgroundColor: this.props.color}
                  className={classnames("app-sidebar", {
                     "": !this.state.collapsedSidebar,
                     collapsed: this.state.collapsedSidebar
                  },
                  {
                     "hide-sidebar":(this.state.width < 991 && this.props.sidebarState === "close"),
                     "":this.props.sidebarState === "open"
                  }
                  )}
                  onMouseEnter={context.foldedContent ? this.handleMouseEnter : null}
                  onMouseLeave={context.foldedContent ? this.handleMouseLeave : null}
               >
                  <SidebarHeader toggleSidebarMenu={this.props.toggleSidebarMenu} sidebarBgColor={this.props.color} />
                  <PerfectScrollbar className="sidebar-content">
                     <SideMenuContent collapsedSidebar={this.state.collapsedSidebar} toggleSidebarMenu={this.props.toggleSidebarMenu} />
                  </PerfectScrollbar>

                  {/* {this.props.img === '' ? ( */}
                  {templateConfig.sidebar.backgroundImage ? (
                    (this.props.imgurl === '') ? 
                        <div 
                        className="sidebar-background"
                        style={{ backgroundImage: "url('" + templateConfig.sidebar.backgroundImageURL + "')" }}>
                        </div>
                    : 
                        <div 
                        className="sidebar-background"
                        style={{ backgroundImage: "url('" + this.props.imgurl + "')" }}>
                        </div>
                  ) :
                  (
                    (this.props.imgurl === '') ? 
                        <div className="sidebar-background"></div>
                    : 
                        <div 
                        className="sidebar-background"
                        style={{ backgroundImage: "url('" + this.props.imgurl + "')" }}>
                        </div>
                  )
                }
               </div>
            )}
         </FoldedContentConsumer>
        </Fragment>
    );
   }
}

const mapStateToProps = state => ({
    color: 'black',
    img: bgImg1,
    imgurl: bgImg1,
    /*size: state.customizer.sidebarSize,
    collapsed: state.customizer.sidebarCollapsed*/
})
  
const mapDispatchToProps = dispatch => ({
})
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sidebar)
