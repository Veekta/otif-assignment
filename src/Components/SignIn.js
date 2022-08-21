import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createUser } from "./GlobalState";
import LoadingFile from "./LoadingFile";
import swal from "sweetalert2";

const SignIn = () => {
  const [loading, setLoading] = useState(false);

  const toggleLoad = () => {
    setLoading(true);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formSchema = yup.object().shape({
    username: yup.string().required("This field cannot be empty"),
    password: yup.string().required("This field cannot be empty"),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = handleSubmit(async (value) => {
    const { username, password } = value;
    console.log(value);
    const url =
      "https://otif-server-dot-otif-mx.uc.r.appspot.com/access/signin";
    toggleLoad();

    await axios
      .post(url, { username, password })
      .then((res) => {
        console.log(res.data);
        dispatch(createUser(res.data));
        swal.fire({
          title: "Sucess",
          text: "Welcome to OTIF",
          icon: "success",
        });
      })
      .catch((err) => {
        swal.fire({
          title: "Failed",
          text: "error",
          icon: "failed",
        });
        setLoading(false);
      });
    reset();
    navigate("/");
  });

  return (
    <Container>
      <Wrapper>
        {loading ? <LoadingFile /> : null}
        <Top>OTIF SignIn</Top>
        <Card>
          <Form onSubmit={onSubmit}>
            <Holder>
              <Label>username</Label>
              <Input placeholder="username" {...register("username")} />
              <Error>{errors.message && errors?.message.username}</Error>
            </Holder>
            <Holder>
              <Label>Password</Label>
              <Input placeholder="Password" {...register("password")} />
              <Error>{errors.message && errors?.message.password}</Error>
            </Holder>

            <Button type="submit">Sign in</Button>
            <Div>
              Don't have an Account? <Span>Sign up Here</Span>
            </Div>
          </Form>
        </Card>
      </Wrapper>
    </Container>
  );
};

export default SignIn;

const Top = styled.div`
  color: white;
  text-transform: uppercase;
  font-size: 25px;
  margin-bottom: 10px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 23px;
  }
`;
const Span = styled.div`
  margin-left: 5px;
  text-decoration: none;
  color: darkorange;
  cursor: pointer;
  font-size: 14px;
`;

const Div = styled.div`
  display: flex;
  margin-top: 10px;
  color: white;
  font-size: 14px;
`;

const Button = styled.button`
  width: 80%;
  margin-top: 30px;
  height: 40px;
  font-size: 15px;
  text-transform: uppercase;
  color: white;
  font-weight: 600;
  outline: none;
  border: 0;
  background-color: #26cd4d;
  border-radius: 5px;

  transition: all 350ms;
  :hover {
    cursor: pointer;
    transform: scale(1.01);
  }
`;

const Error = styled.div`
  color: red;
  font-weight: 500;
  font-size: 12px;
`;

const Input = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 3px;
  padding-left: 5px;
  margin-bottom: 5px;
  ::placeholder {
  }
  border: 1px solid silver;
  outline: none;
`;

const Label = styled.label`
  font-weight: 500;
  margin-bottom: 10px;
  color: white;
`;

const Holder = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  align-items: flex-start;
  margin-top: 10px;
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 28px;
`;

const Card = styled.div`
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  width: 500px;
  min-height: 300px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  padding: 20px 0;
  flex-direction: column;
  background-color: #272b33;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
  background-color: #0a0c10;
  flex-direction: column;
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #0a0c10;
`;
