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
    console.log(postsElement)
};

// Show Initial Posts
showPosts();