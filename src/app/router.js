// import external modules
import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Spinner from "../components/spinner/spinner";

// import internal(own) modules
import MainLayoutRoutes from "../layouts/routes/mainRoutes";
import FullPageLayout from "../layouts/routes/fullpageRoutes";
import ErrorLayoutRoute from "../layouts/routes/errorRoutes";

// Main Layout
const LazyHome = lazy(() => import("../views/home/home"));
const LazyChat = lazy(() => import("../views/chat/chat"));
const LazySpotify = lazy(() => import("../views/spotify/SpotifyContainer"));
const LazyUploadPage = lazy(() => import("../views/pages/uploadMusic"));


const LazyBlankPage = lazy(() => import("../views/pages/blankPage"));

// Full Layout
const LazyLogin = lazy(() => import("../views/pages/login"));
const LazyRegister = lazy(() => import("../views/pages/register"));

// Error Pages
const LazyErrorPage = lazy(() => import("../views/pages/error"));



class Router extends Component {
   render() {
      return (
         // Set the directory path if you are deplying in sub-folder
         <BrowserRouter basename="/">
            <Switch>
               {/* Dashboard Views */}
               <MainLayoutRoutes
                  exact
                  path="/"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyHome {...matchprops} />
                     </Suspense>
                  )}
               />
               <MainLayoutRoutes
                  exact
                  path="/spotify/login/"
                  render={matchprops => (
                     <Suspense fallback={<div>Loading ...</div>}>
                        <LazySpotify {...matchprops} />
                     </Suspense>
                  )}
               />

               <MainLayoutRoutes
                  exact
                  path="/chat"
                  render={matchprops => (
                     <Suspense fallback={<div>Loading ...</div>}>
                        <LazyChat {...matchprops} />
                     </Suspense>
                  )}
               />

               {/* Saperate Pages Views */}
               <FullPageLayout
                  exact
                  path="/pages/login"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyLogin {...matchprops} />
                     </Suspense>
                  )}
               />
               <FullPageLayout
                  exact
                  path="/pages/register"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyRegister {...matchprops} />
                     </Suspense>
                  )}
               />
               <MainLayoutRoutes
                  exact
                  path="/pages/blank-page"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyBlankPage {...matchprops} />
                     </Suspense>
                  )}
               />

              <MainLayoutRoutes
                exact
                path="/pages/upload"
                render={matchprops => (
                  <Suspense fallback={<Spinner />}>
                    <LazyUploadPage {...matchprops} />
                  </Suspense>
                )}
              />

               {/* Calender */}
               <ErrorLayoutRoute
                  exact
                  path="/pages/error"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyErrorPage {...matchprops} />
                     </Suspense>
                  )}
               />
               <ErrorLayoutRoute
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyErrorPage {...matchprops} />
                     </Suspense>
                  )}
               />
            </Switch>
         </BrowserRouter>
      );
   }
}

export default Router;
