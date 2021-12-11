import React from 'react';
import axios  from 'axios';
import Register from './Register/index';
import Login from './Login/index';
import Post from './Post/index';



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
import { Logo } from './Logo';
 
//============================//


function App() {
  
  
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <VStack>
          <Register />
          <Login/>
          <Post/>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
