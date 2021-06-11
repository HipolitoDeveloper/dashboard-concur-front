import { BrowserRouter, Route } from "react-router-dom";
import { Switch } from "react-router";

import Login from "./view/molecules/Login";
import Home from "./view/pages/Home";
import PrivateRoute from "./view/molecules/PrivateRoute";
import Layout from "./view/molecules/Layout";
import ShowCase from "./view/pages/ShowCase";
import VideoList from "./view/pages/VideoList";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Layout>
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute exact path="/vitrine" component={ShowCase} />
          <PrivateRoute exact path="/videos" component={VideoList} />
        </Layout>
        <Route exact path="*" component={Login} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
