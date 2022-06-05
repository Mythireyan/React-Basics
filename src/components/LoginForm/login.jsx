import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UPDATE_USER_LIST } from "../../redux/actions/index";
import "./loginForm.css";

export default function Login({ setuserData }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formInput, setformInput] = useState({});
  const [click, setclick] = useState(false);
  const [passError, setpassError] = useState(false);

  const handleInputChange = ({ target }) => {
    setformInput({ ...formInput, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setclick(true);
    const { username, password1, password2 } = formInput;
    if (username && password1 && password2 && confirmPassword()) {
      console.log("submitted!!");
      setuserData(formInput);
      navigate("/users");
      dispatch(UPDATE_USER_LIST([formInput]));
    }
  };

  const confirmPassword = () => {
    const { password1, password2 } = formInput;
    if (password1 !== password2) {
      setpassError(true);
      return false;
    }
    setpassError(false);
    return true;
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="login-form">
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        onChange={(e) => handleInputChange(e)}
        className="login-form-input"
      />
      {!formInput.username && click ? "This is required" : null}
      <label htmlFor="password1">Password</label>
      <input
        type="password"
        name="password1"
        onChange={(e) => handleInputChange(e)}
        className="login-form-input"
      />
      {!formInput.password1 && click ? "This is required" : null}
      <label htmlFor="password2">Confirm Password</label>
      <input
        type="password"
        name="password2"
        onChange={(e) => handleInputChange(e)}
        className="login-form-input"
      />
      {!formInput.password2 && click ? "This is required" : null}
      {passError ? "Password does'nt match" : null}
      <button type="submit">Create Account</button>
    </form>
  );
}
