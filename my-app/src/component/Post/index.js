import React, { useState, useEffect } from 'react';
import { getpost, addpost, delpost } from '../../Reducer/post';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Style from './style.css'

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Post = () => {
  const [newpost, setNewPost] = useState('');

  const dispatch = useDispatch();

  const state = useSelector(state => {
    return state;
  });

  useEffect(() => {
    postshow();
  }, []);

  const postshow = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/getPost`, {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      });

      dispatch(getpost(result.data));
    } catch (error) {
      console.log(error);
    }
  };

  const del = async id => {
    try {
      const res = await axios.delete(`${BASE_URL}/deletePost/${id}`, {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      });
    
    postshow();
    } catch (error) {
      console.log(error);
    }
    
  };

  const updatepost = async id => {
    await axios.put(
      `${BASE_URL}/updatePost/${id}`,
      {
        description: newpost,
      },
      {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      }
    );

    postshow();
  };

  const addpost = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/addPost`,
        {
          description: newpost,
        },
        {
          headers: {
            Authorization: `Bearer ${state.Login.token}`,
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
            }}
            placeholder="add task"
          />
          <button  onClick={addpost}>add</button>
          {newpost && newpost.length &&(
           <>
          {state.postRD.post.map((e, i) => (
            <ul>
              <li><h1>
               {e.description}</h1>
               

                <button className="delBTN"
                  
                  onClick={() => {
                    del(e._id);
                  }}
                >
                  delete
                </button>

                <input className="inpup"
                  onChange={e => {
                    setNewPost(e.target.value);
                  }}
                  placeholder="update"
                />

                <button className="upBTN" onClick={() => updatepost(e._id)}>update</button>
              </li>
            </ul> 
            
          ))}</>)}
     </div>
  );
};

export default Post;
