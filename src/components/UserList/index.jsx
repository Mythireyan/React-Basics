import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { UserDetailContext } from "../../App";

export default function UserList() {
  const usersList = useSelector((state) => state.usersList);

  const users = useContext(UserDetailContext);

  return <h1>Welcome, {users.username}</h1>;
}
