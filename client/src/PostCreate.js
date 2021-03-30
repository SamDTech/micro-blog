import axios from 'axios';
import React, { useState } from 'react';

const PostCreate = () => {
  const [title, setTitle] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      'http://localhost:4000/posts',
      { title },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    setTitle('')
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="">Title</label>
        <input
          type="text"
          value={title}
          className="form-control"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default PostCreate;
