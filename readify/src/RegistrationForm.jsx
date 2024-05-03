/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './RegistrationForm.css'

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: ''
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (formData.name.length < 3 || formData.name.length > 30)
      errors.name = 'Name must be between 3 and 30 characters.';
    if (!formData.email.includes('@'))
      errors.email = 'Email must contain an "@" symbol.';
    if (
      formData.password.length < 10 ||
      !/[!@#$%^&*(),.?":{}|<>]/g.test(formData.password)
    )
      errors.password =
        'Password must be at least 10 characters long with at least one special character.';
    if (formData.password !== formData.repeatPassword)
      errors.repeatPassword = 'Passwords do not match.';
    return errors;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      console.log('Registration Data:', formData);
      alert('Registration successful!');
      setFormData({ name: '', email: '', password: '', repeatPassword: '' });
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="registration-form">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {formErrors.name && <p className="error-message">{formErrors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {formErrors.email && <p className="error-message">{formErrors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {formErrors.password && <p className="error-message">{formErrors.password}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="repeatPassword">Repeat Password:</label>
          <input
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleChange}
            required
          />
          {formErrors.repeatPassword && (
            <p className="error-message">{formErrors.repeatPassword}</p>
          )}
        </div>
        <button
          type="submit"
          className="sign-up-button"
          disabled={Object.keys(formErrors).length > 0 || Object.values(formData).some(value => value === '')}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
