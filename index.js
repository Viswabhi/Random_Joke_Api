import express from 'express';
import axios from 'axios';

const app = express();
const port = 3002;


const helper = async () => {
  try {
    const response = await axios.get('https://api.chucknorris.io/jokes/random');
    return response.data.value; 
  } catch (error) {
    console.error('Error fetching joke:', error.message);
    throw new Error('Failed to fetch joke from API');
  }
};

app.get('/', async (req, res) => {
  try {
    const joke = await helper(); 
    res.json({ joke }); 
  } catch (error) {
    res.status(500).json({ error: 'Error fetching joke. Please try again later.' });
  }
});

app.get('/api/image/random', async (req, res) => {
    try {
        const response = await axios.get("https://picsum.photos/200", { responseType: 'arraybuffer' });
        res.set('Content-Type', 'image/jpeg'); 
        res.send(response.data);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Error fetching random image');
    }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
