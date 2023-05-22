import { Link } from "react-router-dom";

import { LoginForm } from "@wasp/auth/forms/Login";

const LoginPage = () => {
  return (
    <div className="w-1/3 m-auto flex flex-col justify-center h-screen">
      <LoginForm />
      <br />
      <span>
        I don't have an account yet (<Link to="/signup">go to signup</Link>).
      </span>
    </div>
  );
};

export default LoginPage;
