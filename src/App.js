import { CssBaseline } from "@material-ui/core";
import Dashboard from "./pages/common/Dashboard";
import SignInOut from "./pages/common/SignInOut";
import Error from "./pages/common/Error";
import { ProtectedRoute } from "./components/routing/ProtectedRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import CustomizedSnackbars from "./components/CustomizedSnackBar";
import { useEffect } from "react";
import SignIn from "./pages/common/SignIn";

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
            <Route exact path="/login" component={SignInOut} />
            <Route exact path="/error" component={Error} />
            <Route exact path="/register" component={SignIn} />
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
