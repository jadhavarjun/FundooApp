import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignUp from './components/SignUp/signUp'
import { Container } from '@material-ui/core';

function App() {
  return (
    <Container maxWidth="md">
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/signup' exact component={SignUp}></Route>
        </Switch>
      </BrowserRouter>
    </div>
    </Container>
  );
}

export default App;
