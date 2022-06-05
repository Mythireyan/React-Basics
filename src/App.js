import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/redux/store";
import Login from "./components/LoginForm";
import UserList from "./components/UserList";

export const UserDetailContext = React.createContext();
export default function App() {
  const [userData, setuserData] = useState();
  return (
    <div>
      <Provider store={store}>
        <UserDetailContext.Provider value={userData}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={<Login setuserData={setuserData} />}
              ></Route>
            </Routes>
            <Routes>
              <Route path="/users" element={<UserList />}></Route>
            </Routes>
          </BrowserRouter>
        </UserDetailContext.Provider>
      </Provider>
    </div>
  );
}
