import { BrowserRouter, Route } from "react-router-dom";
import { Switch } from "react-router";

import Login from "./view/molecules/Login";
import Home from "./view/pages/Home";
import PrivateRoute from "./view/molecules/PrivateRoute";
import Layout from "./view/molecules/Layout";
import ShowCase from "./view/pages/ShowCase";
import VideoList from "./view/pages/VideoList";

import VideosProvider from "./contexts/Video/VideoContext";
import ShowCaseProvider from "./contexts/ShowCase/ShowCaseContext";
import BlogProvider from "./contexts/Blog/BlogContext";
import PostList from "./view/pages/PostList";
import PostCreator from "./view/pages/PostCreator";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Layout>
          <PrivateRoute exact path="/home" component={Home} />
          <ShowCaseProvider>
            <PrivateRoute exact path="/vitrine" component={ShowCase} />
          </ShowCaseProvider>
          <VideosProvider>
            <PrivateRoute exact path="/videos" component={VideoList} />
          </VideosProvider>
          <BlogProvider>
            <PrivateRoute exact path="/posts" component={PostList} />
            <PrivateRoute exact path="/post/criador" component={PostCreator} />
          </BlogProvider>
        </Layout>
        <Route exact path="*" component={Login} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
