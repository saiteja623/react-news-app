
import {BrowserRouter as Router , Route,Switch} from 'react-router-dom';
import Home from './components/Home'
import About from './components/About'
import Login from './components/Login'
import Register from './components/Register'
import Error404 from './components/Error404';
import Logout from './components/Logout';
import Nav from './components/nav';
import {UserProvider} from './components/userContext';

function App() {
  return (<>
    <Router>
      <UserProvider>
      <Nav/>
    <br/>
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/login" exact>
        <Login/>
      </Route>
      <Route path="/register" exact>
        <Register />
      </Route>
      <Route path="/about" exact>
        <About />
      </Route>
      <Route path="/logout">
        <Logout/>
      </Route>
      <Route >   
        <Error404 />
      </Route>
    </Switch>
    </UserProvider>

    </Router>
    </>
  );
}

export default App;
