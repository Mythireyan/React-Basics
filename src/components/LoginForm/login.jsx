import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_USER_LIST } from "../../redux/actions/index";
import "./loginForm.css";

export default function Login({ setuserData, page }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const unique_id = uuid();

  const [formInput, setformInput] = useState({});
  const [click, setclick] = useState(false);
  const [passError, setpassError] = useState(false);

  const usersList = useSelector((state) => state.usersList);

  // Handle change in input value
  const handleInputChange = ({ target }) => {
    if (page === "edit") {
      setformInput({ ...formInput, [target.name]: target.value });
    } else {
      setformInput({
        ...formInput,
        [target.name]: target.value,
        id: unique_id,
      });
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setclick(true);
    const { username, password1, password2 } = formInput;
    if (username && password1 && password2 && confirmPassword()) {
      console.log("submitted!!");
      page !== "edit" && setuserData(formInput);

      if (page === "edit") {
        const id = window.location?.pathname?.split("/")[2];
        const filteredList = usersList?.filter((item) => item?.id !== id);
        dispatch(UPDATE_USER_LIST([...filteredList, formInput]));
        setclick(false);
        navigate("/users");
      } else {
        dispatch(UPDATE_USER_LIST([...usersList, formInput]));
        setformInput({});
        setclick(false);
      }
    }
  };

  // Function to confirm password
  const confirmPassword = () => {
    const { password1, password2 } = formInput;
    if (password1 !== password2) {
      setpassError(true);
      return false;
    }
    setpassError(false);
    return true;
  };

  // UseEffect to display default value when the user tries to edit
  useEffect(() => {
    if (page === "edit") {
      const id = window.location?.pathname?.split("/")[2];
      const editingUser = usersList?.find((user) => user?.id === id);

      const { username, password1, password2 } = editingUser;
      setformInput({
        username,
        password1,
        password2,
        id,
      });
    }
  }, []);

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="login-form">
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        onChange={(e) => handleInputChange(e)}
        className="login-form-input"
        value={formInput?.username || ""}
      />
      {!formInput.username && click ? "This is required" : null}
      <label htmlFor="password1">Password</label>
      <input
        type="password"
        name="password1"
        onChange={(e) => handleInputChange(e)}
        className="login-form-input"
        value={formInput?.password1 || ""}
      />
      {!formInput.password1 && click ? "This is required" : null}
      <label htmlFor="password2">Confirm Password</label>
      <input
        type="password"
        name="password2"
        onChange={(e) => handleInputChange(e)}
        className="login-form-input"
        value={formInput?.password2 || ""}
      />
      {!formInput.password2 && click ? "This is required" : null}
      {passError ? "Password does'nt match" : null}
      <button type="submit">
        {page === "edit" ? "Edit User" : "Create Account"}
      </button>
    </form>
  );
}
