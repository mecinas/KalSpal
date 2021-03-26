import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from './components/Login'
import DefaultNavbar from './components/DefaultNavbar'


function App() {
  return (
    <div className="App">
      <DefaultNavbar />
      <Router>
        <Switch>
          <Route exact path="/" component={Login}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
