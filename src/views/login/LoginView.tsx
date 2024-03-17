import { useEffect, useState } from 'react';
import { useAuth } from '@/AuthContext';
import { useUser } from '@/UserContext';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'

interface User {
  ID: number;
  Name: string;
}

function LoginView() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  // TODO: add user preference in context const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('https://localhost:3000/api/login', {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Email: username,
          Password: password
        }),
      });
  
      // Handle successful login
      if (response.status === 200) {
        setIsAuthenticated(true);
  
        // Set user information
        // response.json().data
        //setUser(data.user); // Assuming user object is in response + localstorage
  
        navigate('/contacts');
      } else {
        // Handle login failure (e.g., display error message)
        console.error('Login failed:', response.json());
      }
    } catch (error) {
      // Handle network errors or other issues
      console.error('Login error:', error);
      // Optionally display an error message to the user
    }
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
    {
      isAuthenticated ? (
        <span>Hello</span>
      ) : (
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
      )
    }
    
  </div>
  );
}

export default LoginView;