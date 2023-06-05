import React from "react";
import Button from "../../components/Common/Button";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../../api/api_helpers";

function Login() {
  const [userName, setUserName] = React.useState<string>(""); // username could be email? or just username
  const [password, setPassword] = React.useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    loginAPI(userName, password);
    setUserName("");
    setPassword("");
    navigate("/"); //redirect to home page
  };

  return (
    <div className="flex flex-col justify-center items-center mt-14">
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

        <Button onClick={handleLogin}>Login</Button>
      </form>

      <div className="text-white">
        {" "}
        Need an account?{" "}
        <a href="/signup" className="text-teal-500">
          {" "}
          Signup
        </a>
      </div>
    </div>
  );
}

export default Login;
