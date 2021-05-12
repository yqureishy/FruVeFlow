// can change any/all class names for CSS...just placeholder stuff
import '../css/CustLoginPage.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const CustLoginPage = ({history}) => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    // This below redirects users to the home page if they're already logged in
    // Not using it right now b/c it makes testing annoying

    // useEffect(() => {
    //     if(localStorage.getItem('customerToken') || localStorage.getItem('adminToken') || localStorage.getItem('staffToken')) {
    //         history.push('/')
    //     }
    // }, [history])

    const customerLoginHandler = async (e) => {
        e.preventDefault()

        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const { data } = await axios.post('/auth/customerLogin', { email, password }, config)

            localStorage.setItem('customerToken', data.token)

            history.push('/')
        } catch (error) {
            setError(error.response.data.error)
            setTimeout(() => {
                setError('')
            }, 5000)
        }
    }

    return (
            <div className = 'login-screen'>
                <form onSubmit={customerLoginHandler} className = 'login-screen__form' autocomplete="off" action="...">
                    <h3 className = 'login-screen__title'>Customer Login</h3>
                    {error && <span className='error-message'>{error}</span>}
                    <div className = 'form-group'>
                        <input type='email' required id='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className = 'form-group'>
                        <input type='password' required id='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <button type = 'submit' className = 'btn btn-primary'>Log In</button>

                    <span className='login-screen__subtext'>Don't have an account? <Link to='/auth/register'>Register</Link></span>
                </form>
            </div>
    )
}

export default CustLoginPage