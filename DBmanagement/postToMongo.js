const fs = require('fs').promises; // Use fs.promises for async file operations

async function postToMongo() {
  try {
    // Read the contents of the output.json file asynchronously
    const data = await fs.readFile('output.json', 'utf8');
    const entries = JSON.parse(data);

    // Import node-fetch using dynamic import()
    const { default: fetch } = await import('node-fetch');

    // Create an array to store all the promises for the fetch requests
    const fetchPromises = [];

    // Iterate over each entry and create a fetch request
    entries.forEach(entry => {
      const url = 'http://localhost:3000/news'; // Adjust the URL accordingly
      const postData = {
        id_news: entry.id,
        content: entry.text,
        url: entry.url
      };

      // Push each fetch request promise into the array
      fetchPromises.push(
        fetch(url, {
          method: 'POST',
          body: JSON.stringify(postData),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(json => {
          console.log('Server response:', json);
        })
        .catch(error => {
          console.error('There was a problem with the request:', error);
        })
      );
    });

    // Wait for all fetch requests to complete
    await Promise.all(fetchPromises);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the function to start the asynchronous process
postToMongo();
