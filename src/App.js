import { CssBaseline } from '@material-ui/core';
import Dashboard from './pages/common/Dashboard';
import LoginComponent from './pages/common/LoginComponent'
import Error from './pages/common/Error'
import { ProtectedRoute } from './components/routing/ProtectedRoute';
import { BrowserRouter as Router , Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {

  const auth = useSelector((state) => state.auth.authenticated);  
  console.log("app.js : "+auth);

  return (
    <div className="App">
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
