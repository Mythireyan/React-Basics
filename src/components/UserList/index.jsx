import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserDetailContext } from "../../App";
import { UPDATE_USER_LIST } from "../../redux/actions";

export default function UserList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const usersList = useSelector((state) => state.usersList);

  const users = useContext(UserDetailContext);

  const handleDeleteUser = (id) => {
    const filteredUser = usersList?.filter((user) => user?.id !== id);
    dispatch(UPDATE_USER_LIST(filteredUser));
  };

  return (
    <div>
      <a href="/">Back</a>
      {usersList?.length ? (
        usersList.map((user) => (
          <div key={user.id}>
            <h1>Welcome, {user.username}</h1>
            <div style={{ display: "flex" }}>
              <button
                onClick={() => handleDeleteUser(user.id)}
                style={{ marginRight: "5px" }}
              >
                Delete
              </button>
              <button onClick={() => navigate(`/edit/${user?.id}`)}>
                {" "}
                Edit
              </button>
            </div>
          </div>
        ))
      ) : (
        <h1>No users found</h1>
      )}
    </div>
  );
}
