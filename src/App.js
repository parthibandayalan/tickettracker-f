import { CssBaseline } from "@material-ui/core";
import Dashboard from "./pages/common/Dashboard";
import LoginComponent from "./pages/common/LoginComponent";
import Error from "./pages/common/Error";
import { ProtectedRoute } from "./components/routing/ProtectedRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import CustomizedSnackbars from "./components/CustomizedSnackBar";
import { useEffect } from "react";

function App() {
  const auth = useSelector((state) => state.auth.authenticated);
  console.log("app.js : " + auth);

  useEffect(() => {
    document.title = "Ticket Tracker";
  }, []);

  return (
    <div className="App">
      <CustomizedSnackbars />
      <CssBaseline>
        <Router>
          <Switch>
            <Route exact path="/login" component={LoginComponent} />
            <Route exact path="/error" component={Error} />
            {/*<Route exact path="/" component={Dashboard} />*/}
            <ProtectedRoute path="/" auth={auth} component={Dashboard} />
            {/*<Route path="*" component={() => "404 NOT FOUND"} />*/}
          </Switch>
        </Router>
      </CssBaseline>
    </div>
  );
}

export default App;
