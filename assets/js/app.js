// DOM Elements
const postsContainer = document.getElementById("posts-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");

// Global Variables
let limit = 5;
let page = 1;

// Fetch Posts from API
async function getPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);

    const data = await res.json();

    return data;
};

// show posts in DOM
async function showPosts() {
    const posts = await getPosts();

    posts.forEach(post => {
        const postsElement = document.createElement("div");
        postsElement.classList.add("post");
        postsElement.innerHTML = `
         <div class="number">${post.id}</div>
         <div class="post-info">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}</p>
        </div>
        `;

    postsContainer.appendChild(postsElement);
    });
   
};

// Show Loader and fetch more posts
function showLoading() {
    loading.classList.add("show");

    setTimeout(() => {
        loading.classList.remove("show");

        setTimeout(() => {
            page++;
            showPosts();
        }, 300);
    }, 1000);
};

// Filter Posts by input
function filterPosts(e) {
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll(".post");
    // console.log(term)

   posts.forEach(post => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
};

// Show Initial Posts
showPosts();


// Loads the hidden posts on scroll
window.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight }
 = document.documentElement;

 if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
 };
});

// Filter loaded posts by keywords
filter.addEventListener("input", filterPosts);