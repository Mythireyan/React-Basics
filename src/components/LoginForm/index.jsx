import React from "react";
import CreateAccount from "./create-account";
import Login from "./login";

export default function Registration() {
  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <CreateAccount />
      <Login
        style={{
          position: "absolute",
          top: "25%",
          left: "25%",
        }}
      />
    </div>
  );
}
