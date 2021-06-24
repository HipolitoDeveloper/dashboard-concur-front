import { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../../../contexts/User/UserContext";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser, verifyUser } = useContext(UserContext);

  useEffect(() => {
    const user = async () => {
      verifyUser();
    };
    user();
  }, []);

  return (
    currentUser && (
      <Route
        {...rest}
        render={(routeProps) =>
          currentUser ? (
            <RouteComponent {...routeProps} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    )
  );
};

export default PrivateRoute;
