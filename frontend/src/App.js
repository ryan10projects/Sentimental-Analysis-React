import './App.css';
import React, { useEffect, createContext, useReducer, useContext } from 'react'
import { Switch, Route, BrowserRouter as Router, useHistory } from "react-router-dom";
import { reducer, initialState } from './reducers/usereducers';
import FormQuestions from './components/formQuestions';
import Login from './components/Login';
import SignUp from './components/Signup';
import AllForms from './components/allform';
import SingleForm from './components/singleform';
import Home from './components/Home';
import Navbar from './components/Navbar';

export const UserContext = createContext();

const Routing = () => {

  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  console.log("state is = ", state)


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });   //As when user closes the application the state is also destroyed so to give acess to protected data we update the state.
    } else {
      history.push('/userlogin');
    }
  }, []);

  return (
    <Router history={history}>
      <Switch>
        
        <Route exact path="/userLogin" component={Login}></Route>
        <Route exact path="/userSignup" component={SignUp}></Route>
        <Route exact path="/userHome" component={Home}></Route>
        <Route exact path="/createform" component={FormQuestions}></Route>
        <Route exact path="/allform" component={AllForms}></Route>
        <Route exact path="/form/:id" component={SingleForm}></Route>
      </Switch>
    </Router>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Routing />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
