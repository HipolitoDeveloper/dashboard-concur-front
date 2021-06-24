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
import EventList from "./view/pages/EventList";
import EventCreator from "./view/pages/EventCreator";
import SignupManager from "./view/pages/SignupManager";

import TagsProvider from "./contexts/Tags/TagsContext";
import ShowCaseProvider from "./contexts/ShowCase/ShowCaseContext";
import BlogProvider from "./contexts/Blog/BlogContext";
import VideosProvider from "./contexts/Video/VideoContext";
import ChatProvider from "./contexts/Chat/ChatContext";
import EventProvider from "./contexts/Event/EventContext";
import SignupProvider from "./contexts/SignupManager/SignupContext";
import UserProvider from "./contexts/User/UserContext";

const Routes = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Layout>
            <ShowCaseProvider>
              <PrivateRoute exact path="/vitrine" component={ShowCase} />
              <PrivateRoute exact path="/home" component={Home} />
            </ShowCaseProvider>

            <TagsProvider>
              <ChatProvider>
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
                <EventProvider>
                  <PrivateRoute exact path="/eventos" component={EventList} />
                  <PrivateRoute
                    exact
                    path="/eventos/criador"
                    component={EventCreator}
                  />
                </EventProvider>
              </ChatProvider>
            </TagsProvider>
            <SignupProvider>
              <PrivateRoute
                exact
                path="/gerenciar/cadastro"
                component={SignupManager}
              />
            </SignupProvider>
          </Layout>
          <Route exact path="*" component={Login} />
        </Switch>
      </BrowserRouter>
    </UserProvider>
  );
};

export default Routes;
