import React, { useContext } from "react";
import CreateAccount from "./create-account";
import Login from "./login";

export default function Registration({ setuserData }) {
  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <CreateAccount />
      <Login
        setuserData={setuserData}
        style={{
          position: "absolute",
          top: "25%",
          left: "25%",
        }}
      />
    </div>
  );
}
