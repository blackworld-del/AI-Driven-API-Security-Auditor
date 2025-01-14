import React, { useState } from 'react';

const Auth: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem('currentUser'));

  // Handle Registration
  const handleRegister = () => {
    if (!username || !email || !password) {
      setError('All fields are required');
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

    if (existingUsers.some((user: any) => user.email === email)) {
      setError('Email already registered');
      return;
    }

    const newUser = { username, email, password };
    localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));

    alert('Registration successful! You can now log in.');
    setIsRegistering(false);
  };

  // Handle Login
  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((user: any) => user.email === email && user.password === password);

    if (!foundUser) {
      setError('Invalid email or password');
      return;
    }

    localStorage.setItem('currentUser', foundUser.username);
    setLoggedInUser(foundUser.username);
    window.location.reload(); // 🔹 Force re-render to show the Dashboard
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
  <div className="p-6 max-w-sm mx-auto bg-white shadow-lg rounded-lg">
    <h2 className="text-2xl font-bold mb-6 text-gray-800">{isRegistering ? 'Register' : 'Login'}</h2>

    {isRegistering && (
      <input
        type="text"
        className="border border-gray-300 p-3 w-full mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    )}

    <input
      type="email"
      className="border border-gray-300 p-3 w-full mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <input
      type="password"
      className="border border-gray-300 p-3 w-full mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    {error && <p className="text-red-500 mb-4">{error}</p>}

    <button
      className="bg-indigo-500 text-white px-4 py-2 w-full rounded-md hover:bg-indigo-600 transition duration-300"
      onClick={isRegistering ? handleRegister : handleLogin}
    >
      {isRegistering ? 'Register' : 'Login'}
    </button>

    <button className="text-indigo-500 mt-4 w-full text-center" onClick={() => setIsRegistering(!isRegistering)}>
      {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
    </button>
  </div>
</div>
  );
};

export default Auth;
