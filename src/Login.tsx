import { useEffect, useState } from 'react';
import { useAuth } from './AuthContext'; // Replace with correct import path

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Implement your login logic here (e.g., send a POST request to your backend API)
    console.log('Login attempt:', { username, password }); // Placeholder for now

    // Update isAuthenticated based on login success (replace with actual logic)
    setIsAuthenticated(true); // Replace with condition based on login response
    // const response = await axios.post('/api/login', { username, password });
    // Assuming successful login response includes a session ID or JWT
    // const sessionId = response.data.sessionId; // Replace with your API's response format
    const sessionId = "abc"

    // Set session ID or JWT in local storage or cookies
    localStorage.setItem('sessionId', sessionId); // Adjust storage mechanism as needed

    // Clear form fields (optional)
    setUsername('');
    setPassword('');
  };

  useEffect(() => {
    const storedSessionId = localStorage.getItem('sessionId');
    console.log(storedSessionId)
    if (storedSessionId) {
        setIsAuthenticated(true);
    }
}, [setIsAuthenticated]);

  return (
    <div className="login-container">
    <h1>Login</h1>
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  </div>
  );
}

export default Login;