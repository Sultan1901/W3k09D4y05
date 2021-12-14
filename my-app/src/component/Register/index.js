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
      <Box
        
        borderRadius="3px"
        border="solid silver"
        textAlign="center"
        fontSize="xl"
        w="300px"
        mt="100px"
      >
        <VStack>
          <Input
            textAlign="center"
            mt="30px"
            onChange={e => {
              setUsername(e.target.value);
            }}
            type="text"
            placeholder="username"
            width="40"
          ></Input>
          <Input
            textAlign="center"
            onChange={e => {
              setLogemail(e.target.value);
            }}
            type="email"
            placeholder="email"
            width="40"
          ></Input>
          <Input
            textAlign="center"
            onChange={e => {
              setLogpassword(e.target.value);
            }}
            type="password"
            placeholder="password"
            width="40"
          ></Input>
          <Button onClick={register}>Register</Button>
          <Link exact href="/login">
            Already have account?
          </Link>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default Register
