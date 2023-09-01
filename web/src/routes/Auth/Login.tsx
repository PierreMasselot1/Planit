import React, { useContext } from "react";
import Button from "../../components/Common/Button";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../../api/api_user";
import { UserContext } from "../../components/Auth/userContext";

function Login() {
  const [userName, setUserName] = React.useState<string>(""); // username could be email? or just username
  const [password, setPassword] = React.useState<string>("");
  const [rememberUser, setRememberUser] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const { refreshUser } = useContext(UserContext);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginAPI(userName, password, rememberUser);
    refreshUser();
    setUserName("");
    setPassword("");
    navigate("/"); //redirect to home page
  };

  return (
    <div className="flex flex-col justify-center items-center mt-14">
      <form onSubmit={handleLogin} className="flex flex-col">
        <input
          className="my-1 h-full border rounded py-0.5 px-2 leading-tight focus:outline-none focus:border-primary-500"
          type="text"
          placeholder="Username/Email"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          className="mt-1 mb-2 h-full border rounded py-0.5 px-2 leading-tight focus:outline-none focus:border-primary-500"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <input
            className="mr-2"
            type="checkbox"
            checked={rememberUser}
            onChange={(e) => setRememberUser(e.target.checked)}
          />
          <label htmlFor="rememberMe" className="text-white">
            Remember me
          </label>
        </div>

        <Button onClick={handleLogin}>Login</Button>
      </form>

      <div className="text-white">
        {" "}
        Need an account?{" "}
        <a href="/signup" className="text-primary-500">
          {" "}
          Signup
        </a>
      </div>
    </div>
  );
}

export default Login;
