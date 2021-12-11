import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import "./style.css";
import { useSelector, useDispatch } from 'react-redux';
// import { Tasks } from "../Tasks";
// import { login } from "../reducers/signin";
import { sign } from '../Reducer/login';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Button,
  HStack,
  Input,
} from '@chakra-ui/react';
const BASE_URL = process.env.REACT_APP_BASE_URL;
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [local, setLocal] = useState('');
  // const navigate = useNavigate();
  const state = useSelector(state => {
    return {
      signin: state.Signin,
      tasks: state.Tasks,
    };
  });
  const dispatch = useDispatch();
  console.log(state);
    useEffect(() => {
  const token = localStorage.getItem("token");
  setLocal(token)
    }, [])
  const logInB = async () => {
    const result = await axios.post(`http://localhost:5000/login`, {
      email,
      password,
    });
    const data = {
      user: result.data.result,
      token: result.data.token,
    };
    dispatch(sign(data));
    // headers ={
    //     Authorization:``
    // }
    // localStorage.setItem("token", result.data.token);
  };
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <HStack mt="4">
          {!state.token ? (
            <div className="mainDiv">
              <h1>Login</h1>
              <input
                type="email"
                name="email"
                placeholder="enter Email"
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
              <br />
              <input
                type="password"
                name="email"
                placeholder="enter Password"
                onChange={e => {
                  setPassword(e.target.value);
                }}
              />
              <br />
              <button className="btnMain" onClick={logInB}>
                Login
              </button>
              <br />
            </div>
          ) : (
            <h3></h3>
          )}
        </HStack>
      </Box>
    </ChakraProvider>
  );
};
export default Login;
