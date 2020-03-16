const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.static(path.join(__dirname, './dist')));

// production mode
if(process.env.NODE_ENV === 'production') {
  try {
    app.get('*', (req, res) => {
      console.log('request');
      try {
        // res.sendFile(path.join(__dirname = './dist/index.html'));
        res.sendFile(path.join(__dirname, './dist/index.html'));
      } catch(err) {
        console.log(err);
        res.json({ error: true, msg: 'could not send file...' });
      }
    })
  } catch(e) {
    console.log({
      error: e,
      message: 'could not'
    });
  }
}

/* --- */


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});