import React, { useState, useEffect } from 'react';
import { getpost, addpost, delpost } from './../Reducer/post';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
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
const Task = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [post, setPost] = useState([]);
  const [local, setLocal] = useState('');

  useEffect(() => {
    postshow();
  }, []);
//   const navigate = useNavigate();
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    setLocal(savedToken);
    postshow();
  }, []);
  const dispatch = useDispatch();
  const state = useSelector(state => {
    return {
      signin: state.signin,
      posts: state.posts,
    };
  });
  const postshow = async () => {
    const result = await axios.get(`http://localhost:5000/getPost`, {
      headers: {
        Authorization: `Bearer ${local}`,
      },
    });
    setPost(result.data);
  };
  const del = async id => {
    try {
      const res = await axios.delete(`http://localhost:5000/deletePost/${id}`);
      postshow();
    } catch (error) {
      console.log(error);
    }
  };
  const update = async id => {
    try {
      const res = await axios.delete(`http://localhost:5000/updatePost/${id}`);
      postshow();
    } catch (error) {
      console.log(error);
    }
  };
  const [newpost, setNewPost] = useState('');
  const addpost = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/addPost`,
        {
          name: newpost,
        },
        {
          headers: {
            Authorization: `Bearer ${local}`,
          },
        }
      );
      postshow(local);
    } catch (error) {
      console.log(error);
    }
  };

  const logoutBTN = () => {
    localStorage.clear();
    // navigate('/');
  };
  const updateTask = async id => {
    await axios.put(
      `http://localhost:5000/getPost/${id}`,
      {
        post: post,
      },
      {
        headers: {
          Authorization: `Bearer ${local}`,
        },
      }
    );
    postshow(local);
  };
  return (
    <div>
      <h1>Tasks</h1>
      <Input
        onChange={e => {
          setNewPost(e.target.value);
          console.log(e);
        }}
        placeholder="add task"
      />{' '}
      <Button onClick={addpost}>add</Button>
      {post.map(e => (
        <ul>
          <li>
            {e.name}
            <Button
              onClick={() => {
                del(e._id);
              }}
            >
              delete
            </Button>
            <Input
              onChange={e => {
                setPost(e.target.value);
                console.log(e);
              }}
              placeholder="update"
            ></Input>
            <Button onClick={updateTask(e._id)}>update</Button>
          </li>{' '}
        </ul>
      ))}
      <Button onClick={logoutBTN}>signout</Button>
    </div>
  );
};

export default Task;
