import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import CreateUser from './components/CreateUser'
import DefaultNavbar from './components/DefaultNavbar'
import Footer from "./components/Footer"

function App() {
  return (
    <div className="App">
      <DefaultNavbar />
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/createUser" component={CreateUser}/>
        </Switch>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
