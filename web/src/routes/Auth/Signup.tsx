import React from "react";
import Button from "../../components/Common/Button";
import { registerAPI } from "../../api/api_user";

function Signup() {
  const [userName, setUserName] = React.useState<string>(""); // username could be email? or just username
  const [password, setPassword] = React.useState<string>("");

  const handleSignup = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // TODO: once backend is implemented
    console.log("username: ", userName, "password: ", password);
    console.log("signup");
    registerAPI(userName, password);

    //reset input fields
    setUserName("");
    setPassword("");
  };

  return (
    <div className="flex flex-col justify-center items-center mt-14 ">
      <form onSubmit={handleSignup} className="flex flex-col">
        <input
          className="mb-1 rounded py-0.5 px-2 focus:outline-none focus:border-primary-500"
          type="text"
          placeholder="Username/Email"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          className="mb-1 rounded py-0.5 px-2 focus:outline-none focus:border-primary-500"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button className="mb-2 mt-1">Signup</Button>
      </form>

      <div className="text-white mt-3">
        {" "}
        Already have an account?{" "}
        <a href="/login" className="text-primary-500">
          {" "}
          Login
        </a>
      </div>
    </div>
  );
}

export default Signup;
