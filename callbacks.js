 function handleClick() {
            const resultDiv = document.getElementById('result');
            resultDiv.textContent = 'Waiting for 5 seconds...';

            setTimeout(() => {
                fetch('https://dummyjson.com/posts')
                    .then(response => response.json())
                    .then(data => {
                        const titles = data.posts.map(post => `• ${post.title}`).join('\n');
                        resultDiv.textContent = titles;
                    })
                    .catch(error => {
                        resultDiv.textContent = `Error fetching data: ${error.message}`;
                    });
            }, 5000);
        }