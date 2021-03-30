const { randomBytes } = require('crypto');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json())

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  const { comment } = req.body;
  const id = randomBytes(4).toString('hex');

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id, comment });

  commentsByPostId[req.params.id] = comments;

  res.status(201).json(comments);
});

app.listen(4001, () => {
  console.log('app listening on port 4001');
});
