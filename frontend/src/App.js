import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { connect } from "react-redux"

import Home from './components/Home'
import CreateUser from './components/CreateUser'
import DefaultNavbar from './components/DefaultNavbar'
import Footer from "./components/Footer"
import Dashboard from "./components/Dashboard"
import RedirectAfterLogin from "./components/RedirectAfterLogin"
import Account from "./components/account/Account"
import Workouts from './components/workouts/Workouts'
import User from "./components/User"
import { useAuth0 } from '@auth0/auth0-react'
import PrivateRoute from './components/PrivateRoute'
import { setAccessToken, setIsLoggedIn } from './redux/actions'
import './styles/Avatar.css'

//TODOS
//Zarządzanie znajomymi

function App(props) {
  const [isLogged] = useState(localStorage.getItem("isLogged"))
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      props.dispatch(setIsLoggedIn(true))
      localStorage.setItem('isLogged', true)
      async function makeRequest() {
        let acctoken = await getAccessTokenSilently({
          audience: 'https://kal-spal-dev.com'
        });
        if (acctoken !== props.accesstoken) {
          props.dispatch(setAccessToken(acctoken))
        }
      }
      makeRequest();
    }
    else if (!isLoading && !isAuthenticated) {
      props.dispatch(setIsLoggedIn(false))
      localStorage.setItem('isLogged', false)
      props.dispatch(setAccessToken(undefined))
    }
  }, [isLoading, isAuthenticated]);

  return (
    <div className="App">
      <Router>
        <DefaultNavbar isLogged={isLogged} />
        {props.errors.map((e, idx) => (
          <div class="alert alert-danger display-none" role="alert">
            {e}
          </div>
        ))}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/createUser" >
            <CreateUser />
          </Route>

          <PrivateRoute path="/dashboard" component={Dashboard}>
          </PrivateRoute>

          <Route path="/redirectAfterLogin">
            <RedirectAfterLogin />
          </Route>

          <PrivateRoute path="/account" component={Account}>
          </PrivateRoute>

          <PrivateRoute path="/user/:userid" component={User}>
          </PrivateRoute>

          <PrivateRoute path="/workouts" component={Workouts}>
          </PrivateRoute>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

function mapStateToProps(state) {
  return state;
}

export default App = connect(mapStateToProps)(App);
