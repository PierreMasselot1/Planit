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
    <div className="flex flex-col justify-center items-center mt-14 ">
      <form onSubmit={handleLogin} className="flex flex-col">
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
        />{" "}
        <Button onClick={handleLogin} className="mb-2 mt-1">Login</Button>
        <label htmlFor="rememberMe" className="text-white">
          <input
            className=" align-middle mr-2 rounded border-gray-300 text-primary-500 focus:ring-primary-500 "
            type="checkbox"
            checked={rememberUser}
            onChange={(e) => setRememberUser(e.target.checked)}
          />
          Remember me
        </label>
      </form>

      <div className="text-white mt-3">
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
