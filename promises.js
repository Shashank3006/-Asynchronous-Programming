
        function fetchWithTimeout() {
            //function  to  return onley reject promise run  5 seconds delay
            const timeout = new Promise((resolve, reject) => {
                setTimeout(() => reject(new Error('Operation timed out.')), 5000);
            });
            //Using fetch API to get data from the dummyjson API
            //function to return fetch promise
            const fetchData = fetch('https://dummyjson.com/posts')
                .then(response => {
                    //Check if the response is  not ok then throw an error
                    if (!response.ok) throw new Error('Network error');
                    //If the response is ok then return the response in json  and json() allshow retun promise
                    return response.json();
                });
               //Using Promise.race to return the first promise that resolves or rejects  both are acepted 
            return Promise.race([fetchData, timeout]);
        }
        //Function to handle the click event
        function handleClick() {
            //Get the result div element
            const resultDiv = document.getElementById('result');
            //Set the result div text content to loading
            resultDiv.textContent = 'Loading...';
            //Call the fetchWithTimeout function and then handle the response
            //If the response is ok then map the data to get the titles and join them with new line
            fetchWithTimeout()
                .then(data => {
                    //Check if the data is an object and has posts property in posts we can access only titles
                    const titles = data.posts.map(post => `• ${post.title}`).join('\n');
                    resultDiv.textContent = titles;
                })
                //If there is an error then catch the error and set the result div text content to the error message
                .catch(error => {
                    resultDiv.textContent = error.message;
                });
        }