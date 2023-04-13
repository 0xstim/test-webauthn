import { useState, useEffect } from 'react'
import { client } from '@passwordless-id/webauthn' 
import './App.css'

type registration = {
  username: string,
  credential: {
    id: string,
    publicKey: string,
    algorithm: string,
  },
  authenticatorData: string,
  clientData: string,
}


function App() {
  const [result, setResult] = useState<string>("Nothing")
  const challenge: string = "a7c61ef9-dc23-4806-b486-2428938a547e"
  const [waAvailable, setWaAvailable] = useState<string>("false")
  const [localAuthenticator, setLocalAuthenticator] = useState<string>("false")

  useEffect(() => {
    checkWebAuthn()
    checkLocalAuthenticator()
  })

  const checkWebAuthn = async () => {
    const isAvailable = await client.isAvailable()
    setWaAvailable(isAvailable.toString())
  }

  const checkLocalAuthenticator = async () => {
    const isLocalAuthenticator = await client.isLocalAuthenticator()
    setLocalAuthenticator(isLocalAuthenticator.toString())
  }

  const registerUser = async () => {
    const registration: registration = await client.register("zxstim", window.crypto.randomUUID())
    setResult(JSON.stringify(registration))
  }



  return (
    <div className="App">
      <h1>Test WebAuthn</h1>
      <div className="card">
        <button onClick={registerUser}>
          Register
        </button>
      </div>
      <div>{result}</div>
      <div>{waAvailable}</div>
      <div>{localAuthenticator}</div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
