import React, { useState, useEffect } from 'react';
import { getpost, addpost, delpost } from '../../Reducer/post';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Style from './style.css';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Post = () => {
  const [newpost, setNewPost] = useState('');
    const [newcomment, setNewComment] = useState('');


  const dispatch = useDispatch();

  const state = useSelector(state => {
    return state;
  });

  useEffect(() => {
    setNewPost('m');
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

      console.log(result.data);
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
  const addcomment = async (postId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/addComment`,
        {
          description: newcomment,
          postId: postId,
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
    <div className="container">
      <h1>POSTS</h1>
      <input
        className="npi"
        onChange={e => {
          setNewPost(e.target.value);
        }}
        placeholder="add Post"
      />
      <button className="addBTN" onClick={addpost}>
        add
      </button>
      {newpost && newpost.length && (
        <>
          {console.log(state.postRD.post)}
          <div className="list">
            {state.postRD.post.map((e, i) => (
              // <div className="list">
              <ul>
                <li>
                  <h1>{e.description}</h1>
                  <img id="imag" src={e.img} />
                  {e.commentId.map(s => (
                    <>
                      <p className="pargraph"> Comment: {s.description}</p>
                    </>
                  ))}
                  <input
                    className="inpup"
                    onChange={e => {
                      setNewPost(e.target.value);
                    }}
                    placeholder="update"
                  />
                  <button className="upBTN" onClick={() => updatepost(e._id)}>
                    update
                  </button>{' '}
                  <button
                    className="delBTN"
                    onClick={() => {
                      del(e._id);
                    }}
                  >
                    delete
                  </button>
                  <input
                    className="npi"
                    onChange={e => {
                      setNewComment(e.target.value);
                    }}
                    placeholder="add comment"
                  />
                  <button className="addBTN" onClick={()=> addcomment(e._id)}>
                    add
                  </button><br/>
                  <button>Like</button>
                </li>
              </ul>
             
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
