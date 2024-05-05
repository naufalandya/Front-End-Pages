import { useState, FormEvent } from 'react'; 
import axios from 'axios';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => { 
    e.preventDefault();

    axios.post('http://localhost:5002/api/v1/users', formData)
      .then(response => {
        console.log('Response:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
    <h1>Register Form</h1>
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <br />
      <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
      <br />
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
      <br />
      <button type="submit">Register</button>
    </form>
  </div>
  );
};

export default RegisterForm;
