import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignUp from './components/SignUp/signUp'
import LogIn from './components/LogIn/LogIn'
import ForgotPassword from './components/Forgot_Password/forgot_password'
import { Container } from '@material-ui/core';
import ResetPassword from './components/ResetPassword/resetPassword'
import Appbar from './components/Dashboard/Appbar'
import CreateNotes from './components/Dashboard/CreateNotes'

function App() {
  return (
    <Container maxWidth="md">
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/signup' exact component={SignUp}></Route>
          <Route path='/login' exact component={LogIn}></Route>
          <Route path='/forgot_password' exact component={ForgotPassword}></Route>
          <Route path='/resetPassword' component={ResetPassword}></Route>
          <Route path='/appbar' component={Appbar}></Route>
          <Route path='/create_notes' component={CreateNotes}></Route>
        </Switch>
      </BrowserRouter>
    </div>
    </Container>
  );
}

export default App;
