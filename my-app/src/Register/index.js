import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

//============================//

function Register() {
  const [logemail, setLogemail] = useState('');
  const [logpassword, setLogpassword] = useState('');
  const [username, setUsername] = useState('');
  const register = async () => {
    const result = await axios.post(`http://localhost:5000/register`, {
      email: logemail,
      password: logpassword,
      username: username,
    });
  };
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        helo
        <HStack mt="4">
          <Input
            onChange={e => {
              setUsername(e.target.value);
            }}
            type="text"
            placeholder="username"
            width="40"
          ></Input>
          <Input
            onChange={e => {
              setLogemail(e.target.value);
            }}
            type="email"
            placeholder="email"
            width="40"
          ></Input>
          <Input
            onChange={e => {
              setLogpassword(e.target.value);
            }}
            type="password"
            placeholder="password"
            width="40"
          ></Input>
          <Button onClick={register}>inter</Button>
          Read more
        </HStack>
      </Box>
    </ChakraProvider>
  );
}

export default Register
