import express from 'express';
import axios from 'axios';

const app = express();
const port = 3002;

const helper = async () => {
  try {
    const response = await axios.get('https://api.chucknorris.io/jokes/random');
    return response.data; 
  } catch (error) {
    console.error('Error fetching joke:', error.message);
    throw new Error('Failed to fetch joke from API');
  }
};
app.get('/', async (req, res) => {
  try {
    const jokeData = await helper(); 
    const joke = jokeData.value; 
    const iconUrl = jokeData.icon_url; 

    res.send(`
      <html>
        <head>
          <title>Random Chuck Norris Joke</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              background-color: #f4f4f4;
            }
            .card {
              background: #fff;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              max-width: 400px;
              text-align: center;
            }
            .card img {
              width: 100px;
              border-radius: 50%;
              margin-bottom: 20px;
            }
            .card h3 {
              font-size: 18px;
              color: #333;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <img src="${iconUrl}" alt="Joke Icon" />
            <h3>${joke}</h3>
          </div>
        </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send(`
      <html>
        <head>
          <title>Error</title>
        </head>
        <body>
          <h1>Error fetching joke. Please try again later.</h1>
        </body>
      </html>
    `);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
