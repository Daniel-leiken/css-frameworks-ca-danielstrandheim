const options = {
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTGVpa2VuIiwiZW1haWwiOiJEYW5TdHIxNjIyMUBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTczNjg2MjU0NX0.6jkhKB8V-xHdJcFJ6cso8nCUTa_xgV2DJT4knWnoqJ0',
    'X-Noroff-API-Key': 'f1174243-8934-4994-8987-80c3aa38f4a9',
  },
};

// Fetch and display posts
async function fetchPosts() {
  try {
    const response = await fetch('https://v2.api.noroff.dev/social/posts', options);
    if (!response.ok) {
      throw new Error(`Error fetching posts: ${response.statusText}`);
    }

    const posts = await response.json();
    renderPosts(posts.data); // Make sure you pass the correct data property
  } catch (error) {
    console.error(error.message);
    document.getElementById('post-feed').innerText = 'Failed to load posts. Please try again.';
  }
}

// Render posts in the DOM
function renderPosts(posts) {
  const postFeed = document.getElementById('post-feed');
  postFeed.innerHTML = ''; // Clear any existing posts

  // Create a container for the posts
  let row = document.createElement('div');
  row.className = 'row';

  // Fallback image URL
  const fallbackImage = '/images/default_image.png';

  posts.forEach((post, index) => {
    const postElement = document.createElement('div');
    postElement.className = 'col-md-4 mb-4';

    // Check if the post has media (image)
    const mediaContent = post.media && post.media.url ? 
      `<img src="${post.media.url}" alt="${post.media.alt}" class="card-img-top"/>` :
      `<img src="${fallbackImage}" alt="Fallback Image" class="card-img-top"/>`;

    // Create the post HTML structure
    postElement.innerHTML = `
      <div class="card">
        ${mediaContent}
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${post.body}</p>
          <a href="#" class="btn btn-secondary">Read More</a>
        </div>
      </div>
    `;

    // Append each post card to the row
    row.appendChild(postElement);

    // Every 3 posts, append the row to the postFeed container
    if ((index + 1) % 3 === 0 || index === posts.length - 1) {
      postFeed.appendChild(row);
      // Create a new row for the next set of 3 posts
      row = document.createElement('div');
      row.className = 'row';
    }
  });
}

// Call the fetchPosts function on page load
fetchPosts();