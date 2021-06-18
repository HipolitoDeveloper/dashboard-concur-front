import { BrowserRouter, Route } from "react-router-dom";
import { Switch } from "react-router";

import Login from "./view/molecules/Login";
import Home from "./view/pages/Home";
import PrivateRoute from "./view/molecules/PrivateRoute";
import Layout from "./view/molecules/Layout";
import ShowCase from "./view/pages/ShowCase";
import VideoList from "./view/pages/VideoList";
import PostList from "./view/pages/PostList";
import PostCreator from "./view/pages/PostCreator";
import VideoCreator from "./view/pages/VideoCreator";

import TagsProvider from "./contexts/Tags/TagsContext";
import ShowCaseProvider from "./contexts/ShowCase/ShowCaseContext";
import BlogProvider from "./contexts/Blog/BlogContext";
import VideosProvider from "./contexts/Video/VideoContext";

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
          <TagsProvider>
            <VideosProvider>
              <PrivateRoute exact path="/videos" component={VideoList} />
              <PrivateRoute
                exact
                path="/video/criador"
                component={VideoCreator}
              />
            </VideosProvider>
            <BlogProvider>
              <PrivateRoute exact path="/posts" component={PostList} />
              <PrivateRoute
                exact
                path="/post/criador"
                component={PostCreator}
              />
            </BlogProvider>
          </TagsProvider>
        </Layout>
        <Route exact path="*" component={Login} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
