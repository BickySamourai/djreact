// import external modules
import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

// import internal(own) modules
import registerServiceWorker from "./registerServiceWorker";
import { store } from "./redux/storeConfig/store";
import "font-awesome/css/font-awesome.min.css";
import "./index.scss";
import Spinner from "./components/spinner/spinner";

const LazyApp = lazy(() => import("./app/app"));

ReactDOM.render(
   <Provider store={store}>
      <Suspense fallback={<Spinner />}>
        <LazyApp />
      </Suspense>
   </Provider>,
   document.getElementById("root")
);
registerServiceWorker();
