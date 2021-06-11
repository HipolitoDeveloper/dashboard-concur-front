import Routes from "./routes";
import UserProvider from "./contexts/User/UserContext";
import ShowCaseProvider from "./contexts/ShowCase/ShowCaseContext";

function App() {
  return (
    <UserProvider>
      <ShowCaseProvider>
        <Routes />
      </ShowCaseProvider>
    </UserProvider>
  );
}

export default App;
