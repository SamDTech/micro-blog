import axios from 'axios';
import React, { useState } from 'react';

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    setContent('');
    try {
      await axios.post(
        `http://posts.com/posts/${postId}/comments`,
        { content },
        { headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="">New Comment</label>
          <input
            type="text"
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CommentCreate;
