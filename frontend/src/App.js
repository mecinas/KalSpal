import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Home from './components/Home'
import CreateUser from './components/CreateUser'
import DefaultNavbar from './components/DefaultNavbar'
import Footer from "./components/Footer"
import Dashboard from "./components/Dashboard"
import RedirectAfterLogin from "./components/RedirectAfterLogin"
import Account from "./components/Account"

//TODOS
//Zarządzanie kontem
//Konstrukcja budowy przechowywania info
//Zarządzanie znajomymi

function App() {
  const [isLogged, setIsLogged] = useState(false);


  return (
    <div className="App">
      <DefaultNavbar isLogged={isLogged}/>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/createUser" >
            <CreateUser />
          </Route>

          <Route path="/dashboard">
            <Dashboard setIsLogged={setIsLogged} />
          </Route>

          <Route path="/redirectAfterLogin" >
            <RedirectAfterLogin/>
          </Route>

          <Route path="/account" >
            <Account />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
