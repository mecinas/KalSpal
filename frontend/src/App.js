import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './components/Home'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
