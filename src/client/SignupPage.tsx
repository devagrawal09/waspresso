import { Link } from "react-router-dom";

import { SignupForm } from "@wasp/auth/forms/Signup";

const SignupPage = () => {
  return (
    <div className="w-1/3 m-auto flex flex-col justify-center h-screen">
      <SignupForm />
      <br />
      <span>
        I already have an account (<Link to="/login">go to login</Link>).
      </span>
    </div>
  );
};

export default SignupPage;
