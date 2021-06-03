import { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../../../contexts/User/UserContext";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        currentUser ? <RouteComponent {...routeProps} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
