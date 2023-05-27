import React from "react";
import Api from "../../helpers/api";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../../components/Common/Button";

function Login() {
  const api = new Api(useAuth0());
  const [userName, setUserName] = React.useState<string>(""); // username could be email? or just username
  const [password, setPassword] = React.useState<string>("");

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // TODO: once backend is implemented
    console.log("username: ", userName, "password: ", password);
    console.log("login");
    api.login(userName, password);

    //reset input fields
    setUserName("");
    setPassword("");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-4xl font-bold text-white">Login</div>
      <form onSubmit={handleLogin} className="flex flex-col">
        <input
          className="mr-2 my-1 h-full border rounded py-0.5 px-2 leading-tight focus:outline-none focus:border-teal-500"
          type="text"
          placeholder="Username/Email"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          className="mr-2 my-1 h-full border rounded py-0.5 px-2 leading-tight focus:outline-none focus:border-teal-500"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button>Login</Button>
      </form>
    </div>
  );
}

export default Login;
