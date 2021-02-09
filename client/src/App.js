import './App.css';
import Landing from './Landing/Landing';
import Home from './Home/Home';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import ProtectedRoute from './router/protectedRoute';
import Login from './Auth/Login';
import Register from './Auth/Register';

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
          <Route exact path='/' component={Landing}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <ProtectedRoute path='/home' component={Home} />
          <Route render={()=> <h1>404 Page Not Found</h1>}></Route>
        </Switch>
    </div>
    </Router>
  );
}

export default App;
