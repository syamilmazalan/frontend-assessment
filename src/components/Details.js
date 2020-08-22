import React, { useState, useEffect } from "react";
import axios from "axios";

const Details = ({ fetchPosts, row, setRow }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const token =
    "94fe8c6239c3510c5374ec0ad08d14347acec65a7325ffbbec8655667b58ff4e";

  useEffect(() => {
    if (row) {
      setTitle(row.title);
      setBody(row.body);
    }
  }, [row]);

  const submitHandler = (e) => {
    e.preventDefault();

    createPost();
  };

  const updateHandler = (e) => {
    e.preventDefault();

    updatePost();
  };

  const addBtnHandler = () => {
    setRow(null);
  };

  const deleteBtnHandler = () => {
    deletePost();
  };

  const createPost = async () => {
    await axios
      .post(
        "https://gorest.co.in/public-api/posts/",
        {
          user_id: 10,
          title: title,
          body: body,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.code === 201) {
          alert("Success! New post created.");
          fetchPosts();
          setTitle("");
          setBody("");
        } else if (response.data.code === 422) {
          alert("Please fill in all the fields.");
        } else {
          alert("Something went wrong.");
        }
      })
      .catch((error) => {
        alert("Something went wrong.");
      });
  };

  const updatePost = async () => {
    await axios
      .patch(
        `https://gorest.co.in/public-api/posts/${row.id}`,
        {
          title: title,
          body: body,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.code === 200) {
          alert("Success! Post has been updated.");
          fetchPosts();
          setTitle("");
          setBody("");
          setRow(null);
        } else if (response.data.code === 422) {
          alert("Please fill in all the fields.");
        } else {
          alert("Something went wrong.");
        }
      })
      .catch((error) => {
        alert("Something went wrong.");
      });
  };

  const deletePost = async () => {
    await axios
      .delete(
        `https://gorest.co.in/public-api/posts/${row.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.code === 204) {
          alert("Success! Post has been deleted.");
          fetchPosts();
          setTitle("");
          setBody("");
          setRow(null);
        } else {
          alert("Something went wrong.");
        }
      })
      .catch((error) => {
        alert("Something went wrong.");
      });
  }

  if (row) {
    return (
      <div>
        <div className='d-flex mb-4'>
          <h3>Edit Post</h3>
          <button
            type='button'
            className='btn btn-secondary ml-3'
            onClick={addBtnHandler}
          >
            Add New Post
          </button>
        </div>
        <form onSubmit={updateHandler}>
          <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              className='form-control'
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='body'>Body</label>
            <textarea
              className='form-control'
              id='body'
              value={body}
              rows='10'
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
          </div>
          <button type='submit' className='btn btn-info'>
            Update
          </button>
          <button
            type='button'
            className='btn btn-danger ml-3'
            onClick={deleteBtnHandler}
          >
            Delete
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <h3 className='mb-4'>Add Post</h3>
        <form onSubmit={submitHandler}>
          <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              className='form-control'
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='body'>Body</label>
            <textarea
              className='form-control'
              id='body'
              value={body}
              rows='10'
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
          </div>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </form>
      </div>
    );
  }
};

export default Details;
