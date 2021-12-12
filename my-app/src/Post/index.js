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


const Post = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [post, setPost] = useState([]);
  const [local, setLocal] = useState('');
  // useEffect(() => {
  //   postshow();
  // }, []);
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    setLocal(savedToken);
  }, []);
  console.log(local);
  const state = useSelector(state => {
    return {
      Login: state.Login,
      postRD: state.postRD,
    };
  });
  const postshow = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/getPost`, {
        headers: {
          Authorization: `Bearer ${local}`,
        },
      });
      setPost(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);

    }
  };
  const del = async id => {
    try {
      const res = await axios.delete(`${BASE_URL}/deletePost/${id}`);
      postshow();
    } catch (error) {
      console.log(error);
    }
  };
  const updatepost = async id => {
    await axios.put(
      `${BASE_URL}/updatePost/${id}`,
      {
        post:post
      },
      {
        headers: {
          Authorization: `Bearer ${local}`,
        },
      }
    );
    postshow(local);
  };
  const [newpost, setNewPost] = useState('');
  const addpost = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/addPost`,
        {
          description: newpost,
        },
        {
          headers: {
            Authorization: `Bearer ${local}`,
          },
        }
      );
      postshow();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Tasks</h1>
      <input
        onChange={e => {
          setNewPost(e.target.value);
          console.log(e);
        }}
        placeholder="add task"
      />{' '}
      <button onClick={addpost}>add</button>
      {post.map((e, i) => (
        <ul>
          <li>
            {e.description}
            {e.commentId}
            {e.like}

            <button
              onClick={() => {
                del(e._id);
              }}
            >
              delete
            </button>
            <input
              onChange={e => {
                setPost(e.target.value);
                console.log(e);
              }}
              placeholder="update"
            />
            <button onClick={updatepost(e._id)}>update</button>
          </li>{' '}
        </ul>
      ))}
    </div>
  );
};

export default Post;
