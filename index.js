const express = require('express');
const app = express();
var methodOverride = require('method-override');
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Correct path joining

// Serving static files
app.use(express.static(path.join(__dirname, 'public'))); // Correct path joining

const port = 8080;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

let posts = [
    {
        id: '1',
        username: 'Prabal',
        content: "Hello peeps what's up?"
    },
    {
        id: '2',
        username: 'Kavya',
        content: 'kya chal rha hai ?'
    },
    {
        id: '3',
        username: 'Prajjwal',
        content: 'Behenchod sutta fukne mein itne maze kyu aate hai ?'
    }
];

app.get('/posts', (req, res) => {
    res.render('index.ejs', { posts });
});

app.get('/posts/new', (req, res) => {
    res.render('new.ejs');
});

app.post('/posts', (req, res) => {
    let { username, content } = req.body;
    let newPost = {
        id: `${posts.length + 1}`, // Generate a new ID based on array length
        username: username,
        content: content
    };
    posts.push(newPost);
    res.redirect('/posts');
});

app.get('/posts/:id', (req, res) => {
    let id = req.params.id;
    let post = posts.find(p => p.id === id);
    if (post) {
        res.render('show.ejs', { post });
    } else {
        res.status(404).send('Post not found');
    }
});
app.get('/posts/:id/edit', (req, res) => {
  let id = req.params.id;
  let post = posts.find(p => p.id === id);
  if (post) {
      res.render('edit.ejs', { post });
  } else {
      res.status(404).send('Post not found');
  }
});
app.patch('/posts/:id', (req, res) => {
  let id = req.params.id;
  let newContent = req.body.content;

  // Find the post by ID
  let postIndex = posts.findIndex(p => p.id === id);

  if (postIndex !== -1) {
      // Update the content of the found post
      posts[postIndex].content = newContent;
      res.redirect('/posts');
  } else {
      // If post is not found, return a 404 error
      console.log(`Post with ID ${id} not found.`);
      res.status(404).send('Post not found');
  }
});

app.delete("/posts/:id", (req, res) => {
  let id = req.params.id;
 posts = posts.filter(p => p.id !== id);
 res.redirect('/posts'); 
}); 



