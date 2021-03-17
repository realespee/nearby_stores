import React, {useContext} from 'react';
import {firebaseAuth} from '../../provider/AuthProvider'
// import {withRouter} from 'react-router-dom'
import './css/register.css'


const Register = (props) => {

    const {handleSignin, handleSignup, inputs, setInputs, errors,} = useContext(firebaseAuth)

  
    // Handle Signin
   
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('handleSubmit')
        handleSignin()
        
    }
    const handleChange = e => {
        const {name, value} = e.target
        console.log(inputs)
        setInputs(prev => ({...prev, [name]: value}))
    }

    // Handle Signup
  
    const handleSubmit2 = async (e) => {
      e.preventDefault()
      console.log('handleSubmit')
      //wait to signup 
      await handleSignup()
      //push home
      props.history.push('/')
    }

    // const handleChange = e => {
    //   const {name, value} = e.target
    //   console.log(inputs)
    //   setInputs(prev => ({...prev, [name]: value}))
    // }


  
  
  
  
  
  return (
    <div className='wrapper'>    
        <div className="container">
        <div id='heading'className="pb-2 pt-3" >
            <div id='logo'>constiFinder</div>
             <small> Find Construction Stores and Services Near You</small>     
        </div>
        <div className="row" id="parent">
            <div className="col-md-6 col-12 card d-block border-0 py-2">
                <a href="" className="btn btn-outline-success" id='login-button' data-toggle="collapse" data-target="#cardLogin" data-parent="#parent">Login</a>
                <a href="" className="btn btn-outline-success" id='register-button' data-toggle="collapse" data-target="#cardRegister" data-parent="#parent">Register</a>
                <div className="collapse show py-2" id="cardLogin">
                          <div className="card">
                            <div className="card-block">
                              <h2 className="text-center">Login</h2>
                              <ul className="list-inline text-center">
                                  <li className="list-inline-item"><a className="btn btn-lg" href="" title="Twitter"><i className="fa fa-2x fa-twitter"></i></a>&nbsp; </li>
                                  <li className="list-inline-item"><a className="btn btn-lg" href="" title=""><i className="fa fa-2x fa-google-plus"></i></a>&nbsp; </li>
                                  <li className="list-inline-item"><a className="btn btn-lg" href="" title="Facebook"><i className="fa fa-2x fa-facebook"></i></a></li>
                              </ul>
                              <form onSubmit={handleSubmit}>
                                  <div className="form-group row">
                                      <label for="inputEmailForm" className="sr-only control-label">Email</label>
                                      <div className="offset-sm-2 col-sm-8">
                                          {/* <input type="text" className="form-control" id="inputEmailForm" placeholder="Email" required=""></input> */}
                                          <input className="form-control" id="inputEmailForm" onChange={handleChange} name="email" placeholder='Email' value={inputs.email} />
                                      </div>
                                  </div>
                                  <div className="form-group row">
                                      <label for="inputPasswordForm" className="sr-only control-label">Password</label>
                                      <div className="offset-sm-2 col-sm-8">
                                          {/* <input type="text" className="form-control" id="inputPasswordForm" placeholder="Password" required=""></input> */}
                                          <input type="password" className="form-control" id="inputPasswordForm" onChange={handleChange} name="password" placeholder='password' value={inputs.password} />
                                      </div>
                                  </div>
                                  <div className="form-group row">
                                      <div className="offset-sm-2 col-sm-8 pb-3 pt-2">
                                          <button type="submit" className="btn btn-success btn-lg btn-block">Sign-in</button>
                                      </div>
                                  </div>
                              </form>
                            </div>
                          </div>
                </div>
                <div className="collapse py-2" id="cardRegister">
                    <div className="card">
                        <div className="card-block">
                            <h2 className="text-center">Register</h2>
                            <ul className="list-inline text-center">
                                <li className="list-inline-item"><a className="btn btn-lg" href="" title="Twitter"><i className="fa fa-2x fa-twitter"></i></a>&nbsp; </li>
                                <li className="list-inline-item"><a className="btn btn-lg" href="" title=""><i className="fa fa-2x fa-google-plus"></i></a>&nbsp; </li>
                                <li className="list-inline-item"><a className="btn btn-lg" href="" title="Facebook"><i className="fa fa-2x fa-facebook"></i></a></li>
                            </ul>
                            <form onSubmit={handleSubmit2}>
                                <div className="form-group row">
                                    <label for="input2EmailForm" className="sr-only control-label">Username</label>
                                    <div className="offset-sm-2 col-sm-8">
                                        <input type="text" className="form-control" id="input2EmailForm" placeholder="Username" required=""></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="input2EmailForm" className="sr-only control-label">Email</label>
                                    <div className="offset-sm-2 col-sm-8">
                                        <input type="text" className="form-control" id="input2EmailForm" onChange={handleChange} name="email" placeholder='Email' value={inputs.email}></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="input2PasswordForm" className="sr-only control-label">Password</label>
                                    <div className="offset-sm-2 col-sm-8">
                                        <input type="password" className="form-control" id="input2PasswordForm" onChange={handleChange} name="password" placeholder='password' value={inputs.password} ></input>
                                    </div>
                                </div>
                                {/* <div className="form-group row">
                                    <label for="input2Password2Form" className="sr-only control-label">Confirm Password</label>
                                    <div className="offset-sm-2 col-sm-8">
                                        <input type="text" className="form-control" id="input2Password2Form" placeholder="Confirm Password" required=""></input>
                                    </div>
                                </div> */}
                                <div className="form-group row">
                                    <div className="offset-sm-2 col-sm-8 pb-3 pt-2">
                                        <button type="submit" className="btn btn-success btn-lg btn-block">Register</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>

  );
};

export default Register;