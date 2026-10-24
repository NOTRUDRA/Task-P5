
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      await signInWithEmailAndPassword(auth, email, password)

      navigate('/')
    } catch (error) {
      alert('Login failed. Please check your email and password.')
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <h1>Login to DEV@Deakin</h1>

        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="email">Email*</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Password*</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <button className="login-submit" type="submit">
            Login
          </button>
        </form>

        <p className="login-signup">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </section>
    </main>
  )
}

export default Login
