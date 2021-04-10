import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignUp from './components/SignUp/signUp'
import LogIn from './components/LogIn/LogIn'
import ForgotPassword from './components/Forgot_Password/forgot_password'
import { Container } from '@material-ui/core';
import ResetPassword from './components/ResetPassword/resetPassword'
import Appbar from './components/Dashboard/Dashboard'
// import CreateNotes from './components/Dashboard/note/CreateNotes'
import ErrorPage from './components/errorPage'
import GetNote from './components/Dashboard/GetNote/getNote'

function App() {
  return (
    <Container maxWidth="md">
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={SignUp}></Route>
          <Route path='/login' exact component={LogIn}></Route>
          <Route path='/forgot_password' exact component={ForgotPassword}></Route>
          <Route path='/resetPassword' component={ResetPassword}></Route>
          <Route path='/getnote' component={GetNote}></Route>
          {localStorage.getItem('token') && <Route path='/dashboard' exact component={Appbar}></Route>}
          <Route component={ErrorPage} ></Route>
          {/* <Route path='/create_notes' component={CreateNotes}></Route> */}
        </Switch>
      </BrowserRouter>
    </div>
    </Container>
  );
}

export default App;
