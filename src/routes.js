// import { useEffect } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { Switch } from "react-router";

import Login from "./view/molecules/Login";
import Home from "./view/pages/Home";
import PrivateRoute from "./view/molecules/PrivateRoute";
import SideMenu from "./view/molecules/SideMenu";
import * as PropTypes from "prop-types";
import Layout from "./view/molecules/Layout";

const Routes = () => {
  // useEffect(() => {
  //   messaging
  //     .getToken({
  //       vapidKey:
  //         'BBOsh2ON9WkhLMmz9BtPByMAe-5-GOYVH_ZpUn1kGEYofQJq28c-71inrAxpSSWinBFULA_vtVufeiVYDq704YM',
  //     })
  //     .then((currentToken) => {
  //       if (currentToken) {
  //         console.log(currentToken);
  //       } else {
  //         // Show permission request UI
  //         console.log(
  //           'No registration token available. Request permission to generate one.',
  //         );
  //       }
  //     })
  //     .catch((err) => {
  //       console.log('An error occurred while retrieving token. ', err);
  //     });

  //   messaging.onMessage((payload) => {
  //     console.log('Message received. ', payload);
  //   });
  // });

  return (
    <BrowserRouter>
      <Switch>
        <Layout>
          <Route exact path="/" component={Login} />
          <PrivateRoute exact path="/home" component={Home} />
        </Layout>
        <Route exact path="*" component={Login} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
