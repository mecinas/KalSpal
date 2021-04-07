import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import CreateUser from './components/CreateUser'
import DefaultNavbar from './components/DefaultNavbar'
import Footer from "./components/Footer"
import Dashboard from "./components/Dashboard"
import RedirectAfterLogin from "./components/RedirectAfterLogin"

function App() {
  return (
    <div className="App">
      <DefaultNavbar />
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/createUser" component={CreateUser}/>
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/redirectAfterLogin" component={RedirectAfterLogin}/>
        </Switch>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
