//  const API_URL = 'https://dummyjson.com/posts';
//         const TIMEOUT_DURATION = 5000; // 5 seconds

//         const fetchButton = document.getElementById('fetchButton');
//         const dataContainer = document.getElementById('dataContainer');

//         function fetchWithTimeout(url, timeout = TIMEOUT_DURATION) {
//             return Promise.race([
//                 fetch(url),
//                 new Promise((_, reject) =>
//                     setTimeout(() => reject(new Error('Request timed out')), timeout)
//                 )
//             ]);
//         }

  function fetchWithTimeout() {
            //function  to  return onley reject promise run  5 seconds delay
            const timeout = new Promise((resolve, reject) => {
                setTimeout(() => reject(new Error('Operation timed out.')), 5000);
            });
            //Using fetch API to get data from the dummyjson API
            //function to return fetch promise
            const fetchData = fetch('https://dummyjson.com/posts')
               
               //Using Promise.race to return the first promise that resolves or rejects  both are acepted 
            return Promise.race([fetchData, timeout]);
        }


// Function to handle the click event uaing async/await
        async function fetchData() {
            try {
                const resultDiv = document.getElementById('result');
            //Set the result div text content to loading
            resultDiv.textContent = 'Loading...';
                
                const response = await fetchWithTimeout();
                    //Check if the response is  not ok then throw an error
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
// If the response is ok then return the data
                const data = await response.json();
                
                    //Check if the data is an object and has posts property in posts we can access only titles
                const titles = data.posts.map(post => `• ${post.title}`).join('\n');
                    resultDiv.textContent = titles;
            } catch (error) {
                // If there is an error then catch the error and set the result div text content to the error message
                 resultDiv.textContent = error.message;
            }
        }

