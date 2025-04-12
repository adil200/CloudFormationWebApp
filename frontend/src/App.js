import React, { useState } from 'react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('signUp');
  const [responseMessage, setResponseMessage] = useState('');
  const [formData, setFormData] = useState({ userName: '', mail: '', password: '' });

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setResponseMessage('');
    setFormData({ userName: '', mail: '', password: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = activeTab === 'signUp' ? 'http://localhost:8080/signUp' : 'http://localhost:8080/logIn';
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.text();
      setResponseMessage(result);
    } catch (error) {
      setResponseMessage('Error: Unable to connect to the server.');
    }
  };

  if (responseMessage) {
    return <h1>{responseMessage}</h1>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>CloudFormation Web App</h1>
        <p>Your gateway to seamless cloud management</p>
      </header>
      <div className="App-body">
        <div className="App-left">
          <h2>About the App</h2>
          <p>This is a demo application showcasing a dashboard with user authentication.</p>
          <p>Features:</p>
          <ul>
            <li>Secure user authentication</li>
            <li>Responsive design</li>
            <li>Easy-to-use interface</li>
          </ul>
          <p>Explore the app and experience the power of cloud management at your fingertips!</p>
        </div>
        <div className="App-right">
          <div className="App-tabs">
            <button
              className={activeTab === 'signUp' ? 'active' : ''}
              onClick={() => handleTabSwitch('signUp')}
            >
              Sign Up
            </button>
            <button
              className={activeTab === 'logIn' ? 'active' : ''}
              onClick={() => handleTabSwitch('logIn')}
            >
              Log In
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="userName"
              placeholder="Username"
              value={formData.userName}
              onChange={handleInputChange}
              required
            />
            {activeTab === 'signUp' && (
              <input
                type="email"
                name="mail"
                placeholder="Email"
                value={formData.mail}
                onChange={handleInputChange}
                required
              />
            )}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button type="submit">{activeTab === 'signUp' ? 'Sign Up' : 'Log In'}</button>
          </form>
        </div>
      </div>
      <footer className="App-footer">
        <p>&copy; 2023 CloudFormation Web App | Designed with ❤️ by CloudFormation Team</p>
        <p>Contact us: support@cloudformation.com</p>
      </footer>
    </div>
  );
}

export default App;
