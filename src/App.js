import Routes from "./routes";
import UserProvider from "./contexts/User/UserContext";

function App() {
  return (
    <UserProvider>
      <Routes />
    </UserProvider>
  );
}

export default App;
