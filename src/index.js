import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Catalog from './Components/Catalog/Catalog';
import Quarter from './Components/Quarter/Quarter';
import Deliverer from './Components/Deliverer/Deliverer';
import Orders from './Components/Orders/Orders';
import OrderUpdateForm from './Components/Orders/OrderUpdateForm';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

const Root = () => {
  return (
      <Router>
          <Switch>
              <Route exact path='/' component={App} />
              <Route exact path='/catalogue' component={Catalog} />
              <Route exact path='/commandes' component={Orders} />
              <Route exact path='/commandes/detail/:id' component={OrderUpdateForm} />
              <Route exact path='/quartiers' component={Quarter} />
              <Route exact path='/livreurs' component={Deliverer} />
          </Switch>
      </Router>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();