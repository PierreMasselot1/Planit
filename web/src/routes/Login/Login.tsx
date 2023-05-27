import React from "react";

function Login() {
  const [userName, setUserName] = React.useState<string>(""); // username could be email? or just username
  const [password, setPassword] = React.useState<string>("");

  const handleLogin = () => {
    // TODO: once backend is implemented
    console.log("username: ", userName, "password: ", password);
    console.log("login");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-4xl font-bold text-white">Login</div>
      <form onSubmit={handleLogin}>
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
      </form>
    </div>
  );
}

export default Login;
