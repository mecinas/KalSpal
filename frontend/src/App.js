import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import DefaultNavbar from './components/DefaultNavbar'

function App() {
  return (
    <div className="App">
      <DefaultNavbar />
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
