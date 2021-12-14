import React from 'react';
import axios from 'axios';
import Register from './component/Register/index';
import Login from './component/Login/index';
import Post from './component/Post/index';
import Reset from './component/reset/index';

import { Routes, Route } from 'react-router-dom';


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
          <>
            <Routes>
              <Route exact path="/" element={<Register />} />
              <Route exact path="/posts" element={<Post />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/reset" element={<Reset />} />
            </Routes>
          </>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
