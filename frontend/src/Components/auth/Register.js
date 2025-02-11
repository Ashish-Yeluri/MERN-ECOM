import React, { useState, useEffect } from 'react'
import { useLoginMutation, useRegisterMutation } from '../../redux/api/authApi'


import toast from 'react-hot-toast';

function Register() {

  let [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  })
  
  let {name, email,  password} = user

  console.log(email)
  console.log(password)

  let [register, { isLoading, isError, error, data }] = useRegisterMutation()
  
  console.log(data)

  let handleRegisterSubmit = (e) => {
    e.preventDefault()
    console.log(user)

    register(user)

  }

    useEffect(() => {
    if (isError) {
      toast.error(error.data.message)
    }
  }, [isError])
  
  let handleChange = (e) => {
   setUser({...user, [e.target.name]: e.target.value})
 }
  
  return (
    <div className='row m-5'>
      <div className='d-flex justify-content-center'>
        <div className='col-4  m-3 border border-2 p-4'>
        <h4 className='my-3'>Register</h4>
          <form onSubmit={handleRegisterSubmit}>
        <div>
          <label htmlFor="" className='form-label'>Name</label>
              <input type="text" className='form-control'
                name='name'
                value={name}
                onChange={handleChange}
              />
          </div>
          <div>
          <label htmlFor="" className='form-label'>Email</label>
              <input type="email" className='form-control'
                name='email'
                value={email}
                onChange={handleChange}
              />
          </div>
          <div>
          <label htmlFor="" className='form-label'>Password</label>
              <input type="password" className='form-control'
                name='password'
                value={password}
                onChange={handleChange}
              />
          </div>
          {/* <a href="" className='float-end mt-3'>Forget password</a> */}
            <button className='btn btn-primary w-100 mt-3' type='submit' disabled={isLoading} >{isLoading ? "User cretaing in db": "Register" }</button>
         
          <div>
            <a href="" className='float-end mt-3'>Login</a>
          </div>
        </form>
      </div>
      </div>
    </div>
  )
}

export default Register