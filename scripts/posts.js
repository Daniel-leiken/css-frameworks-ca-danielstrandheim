const options = {
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTGVpa2VuIiwiZW1haWwiOiJEYW5TdHIxNjIyMUBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTczNjg2MjU0NX0.6jkhKB8V-xHdJcFJ6cso8nCUTa_xgV2DJT4knWnoqJ0',  
    'X-Noroff-API-Key': 'f1174243-8934-4994-8987-80c3aa38f4a9',
  },
};

// Fetch and display posts
async function fetchPosts(sortBy = 'newest', searchQuery = '') {
  try {
    let url = 'https://v2.api.noroff.dev/social/posts';

    // If a search query is provided, use the search endpoint
    if (searchQuery) {
      url = `https://v2.api.noroff.dev/social/posts/search?q=${encodeURIComponent(searchQuery)}`;
    } else {
      // Add sorting query if no search query is provided
      if (sortBy) {
        url += `?_sort=${sortBy}`;
      }
    }

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error fetching posts: ${response.statusText}`);
    }

    const posts = await response.json();
    const sortedPosts = searchQuery ? posts.data : sortPosts(posts.data, sortBy);

    renderPosts(sortedPosts);
  } catch (error) {
    console.error(error.message);
    document.getElementById('post-feed').innerText = 'Failed to load posts. Please try again.';
  }
}

// Render posts in the DOM
function renderPosts(posts) {
  const postFeed = document.getElementById('post-feed');
  postFeed.innerHTML = '';

  let row = document.createElement('div');
  row.className = 'row';

  const fallbackImage = '/images/default_image.png';

  posts.forEach((post, index) => {
    const postElement = document.createElement('div');
    postElement.className = 'col-12 col-md-6 col-lg-4 mb-4';

    const mediaContent = post.media && post.media.url
      ? `<img src="${post.media.url}" alt="${post.media.alt}" class="card-img-top"/>`
      : `<img src="${fallbackImage}" alt="Fallback Image" class="card-img-top"/>`;

    postElement.innerHTML = `
      <div class="card">
        ${mediaContent}
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${post.body}</p>
          <a href="#" class="btn btn-secondary read-more-button" data-post-id="${post.id}">Read More</a>
        </div>
      </div>
    `;

    row.appendChild(postElement);

    if ((index + 1) % 3 === 0 || index === posts.length - 1) {
      postFeed.appendChild(row);
      row = document.createElement('div');
      row.className = 'row';
    }
  });

  document.querySelectorAll('.read-more-button').forEach(button => {
    button.addEventListener('click', function (event) {
      const postId = this.getAttribute('data-post-id');
      viewPostById(postId, event);
    });
  });
}

// Sort posts based on the selected criteria
function sortPosts(posts, sortBy) {
  switch (sortBy) {
    case 'newest':
      return posts.sort((a, b) => new Date(b.created) - new Date(a.created));
    case 'oldest':
      return posts.sort((a, b) => new Date(a.created) - new Date(b.created));
    case 'title-asc':
      return posts.sort((a, b) => a.title.localeCompare(b.title));
    case 'title-desc':
      return posts.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return posts;
  }
}

// View a single post by ID
async function viewPostById(postId, event) {
  event.preventDefault();

  try {
    const url = `https://v2.api.noroff.dev/social/posts/${postId}`;
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error fetching post details: ${response.statusText}`);
    }

    const post = await response.json();

    document.getElementById('post-details-title').innerText = post.data.title;
    document.getElementById('post-details-body').innerText = post.data.body;
    document.getElementById('post-details-created').innerText = `Created: ${new Date(post.data.created).toLocaleDateString()}`;
    document.getElementById('post-details-tags').innerText = `Tags: ${post.data.tags.join(', ')}`;

    const postImage = post.data.media && post.data.media.url ? post.data.media.url : '/images/default_image.png';
    document.getElementById('post-details-image').src = postImage;

    const modal = new bootstrap.Modal(document.getElementById('post-details-modal'));
    modal.show();

  } catch (error) {
    console.error(error.message);
    document.getElementById('post-details').innerText = 'Failed to load post details. Please try again.';
  }
}

// Add event listener for the "Sort by" dropdown
document.getElementById('sort-filter').addEventListener('change', function () {
  const sortBy = this.value;
  const searchQuery = document.getElementById('search-input').value;
  fetchPosts(sortBy, searchQuery);
});

// Add event listener for the "Search" input field
document.getElementById('search-input').addEventListener('input', function () {
  const searchQuery = this.value;
  const sortBy = document.getElementById('sort-filter').value;
  fetchPosts(sortBy, searchQuery);
});

// Add event listener for the "Create Post" form submission
document.getElementById('post-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const formData = new FormData(this);
  const postData = {
    title: formData.get('post-title'),
    body: formData.get('post-content'),
  };

  // Check if the image URL is provided
  const imageUrl = formData.get('post-image-url');
  if (imageUrl) {
    postData.media = { url: imageUrl };
  }

  // Create the post
  try {
    const response = await fetch('https://v2.api.noroff.dev/social/posts', {
      method: 'POST',
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(`Error creating post: ${response.statusText}`);
    }

    // Clear the form
    document.getElementById('post-form').reset();

    // Reload posts after creation
    fetchPosts();
  } catch (error) {
    console.error(error.message);
  }
});

// Call the fetchPosts function on page load
fetchPosts();