import React from 'react'
import {Container, Login as LoginComponent} from "../components/index.js"

function Login() {
  return (
    <div className='py-8'>
        <Container>
            <LoginComponent/>
        </Container>
    </div>
  )
}

export default Login