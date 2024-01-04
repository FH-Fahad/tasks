import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup, error, loading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (password !== confirmPassword) {
    //   // alert("Passwords do not match!");
    //   useSignup({ error: "Passwords do not match!" });
    //   return;
    // }

    await signup(email, password, confirmPassword);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button disabled={loading}>{loading ? "Loading..." : "Signup"}</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default Signup;
