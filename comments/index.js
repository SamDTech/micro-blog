const { randomBytes } = require('crypto');
const express = require('express');
const cors = require('cors');
const { default: axios } = require('axios');

const app = express();

app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const { content } = req.body;
  const id = randomBytes(4).toString('hex');

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id, content });

  commentsByPostId[req.params.id] = comments;
  try {
    await axios.post('http://localhost:4005/events', {
      type: 'CommentCreated',
      data: {
        id,
        content,
        postId: req.params.id,
      },
    });

    res.status(201).json(comments);
  } catch (error) {
    console.log(error.message);
  }
});

app.post('/events', (req, res) => {
  console.log('received event', req.body.type);

  res.send({});
});

app.listen(4001, () => {
  console.log('app listening on port 4001');
});
