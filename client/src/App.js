import './App.css';
import Landing from './Landing/Landing';
import Home from './Home/Home';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
      />
    </div>
    </Router>
  );
}

export default App;
