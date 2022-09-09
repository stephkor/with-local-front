import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { register } from "../../apis/authApis";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await register(email, password);

      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <span> id / email</span>
      <TextField onChange={(e) => setEmail(e.target.value)} />
      <span>password</span>
      <TextField onChange={(e) => setPassword(e.target.value)} />
      <div />
      <Button type={"submit"} onClick={handleSubmit}>
        가입
      </Button>
    </div>
  );
};

export default Register;
