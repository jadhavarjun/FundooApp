import './App.css';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProtectedRoutes from './protectedRoute'
import SignUp from './components/SignUp/signUp'
import LogIn from './components/LogIn/LogIn'
import ForgotPassword from './components/Forgot_Password/forgot_password'
import ResetPassword from './components/ResetPassword/resetPassword'
import Appbar from './components/Dashboard/Dashboard'
import GetNote from './components/Note/getNote'
import ColorPalete from './components/NoteIcons/colorPalete'


function App() {
  return (
    <Container maxWidth="md">
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/signup' exact component={SignUp}></Route>
          <Route path='/forgot_password' exact component={ForgotPassword}></Route>
          <Route path='/resetPassword' component={ResetPassword}></Route>
          <Route path='/getnote' component={GetNote}></Route>
          <Route path='/color' component={ColorPalete}></Route>
          <ProtectedRoutes  path='/dashboard'  component={Appbar}/>
          <Route path='/' component={LogIn}></Route>
        </Switch>
      </BrowserRouter>
    </div>
    </Container>
  );
}

export default App;
