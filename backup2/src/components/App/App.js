import React, {useContext} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
// import Signup from './component/Signup'
// import Signin from './component/Signin'
import Home from '../Home/home'
import Register from '../Register/register'
import {firebaseAuth} from '../../provider/AuthProvider'

function App() {

  console.log(firebaseAuth)

  const { token } = useContext(firebaseAuth)

  console.log(token)

  return (
    <>
    {/* switch allows switching which components render.  */}
      <Switch>
        {/* route allows you to render by url path */}

        <Route exact path='/' render={rProps => token === null ? <Register /> : <Home />} />
        {/* <Route exact path='/signin' component={Signin} />
        <Route exact path='/signup' component={Signup} /> */}
        <Route exact path='/register' component={Register} />
      </Switch>
    </>
  );
}

export default App;
