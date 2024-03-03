const discussSection = document.getElementById("discuss-section");
const discussLeft = document.getElementById("discuss-left");
const discussRight = document.getElementById("discuss-right");
const markReadContainer = document.getElementById("mark-read-container");
const latestPostsContainer = document.getElementById("latest-posts-container");

// Load data

const loadData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );
  const data = await res.json();
  const allPosts = data.posts;
  displayData(allPosts);
};

// Display data

const displayData = (allPosts) => {
  allPosts.forEach((post) => {
    // console.log(post);
    const div = document.createElement("div");
    div.className = "flex flex-col lg:flex-row gap-6 mb-10";
    div.innerHTML = `
    <div
              style="
                background-image: url(./images/discuss-bg.png);
                background-repeat: no-repeat;
                background-size: cover;
              "
              class="flex w-full gap-5 p-10 rounded-3xl"
            >
              <div>
                <img src=${post.image} class="w-[50px] rounded-3xl" alt="" />
              </div>
              <div class="flex flex-col lg:w-full space-y-3">
                <div class="flex gap-6 opacity-80 font-semibold">
                  <p># ${post.category}</p>
                  <span>Author: ${post.author.name}</span>
                </div>
                <h5 class="font-bold text-xl">
                  ${post.title}
                </h5>
                <p class="mb-6 opacity-80">
                  ${post.description}
                </p>
                <div class="border-b-2 border-dashed"></div>
                <div class="flex items-center gap-4 lg:gap-10 mt-4 opacity-80">
                  <div class="flex gap-2">
                    <img src="./images/tabler-icon-message-2.png" alt="" />
                    <p>${post.comment_count}</p>
                  </div>
  
                  <div class="flex gap-2">
                    <img src="./images/tabler-icon-eye.png" alt="" />
                    <p>${post.view_count}</p>
                  </div>
  
                  <div class="flex gap-2">
                    <img src="./images/tabler-icon-clock-hour-9.png" alt="" />
                    <p>${post.posted_time} Min</p>
                  </div>
                  <div class="ml-auto">
                    <button class="read-btn"><img src="./images/email 1.png" alt="" /></button>
                  </div>
                </div>
              </div>
            </div>
    `;
    discussLeft.appendChild(div);
  });

  const div = document.createElement("div");
  div.className = "flex flex-col lg:flex-row gap-10";
  div.innerHTML = `
  <div
              style="
                background-image: url(./images/discuss-bg.png);
                background-repeat: no-repeat;
                background-size: cover;
              "
              class="p-10 rounded-3xl "
            >
              <div class="flex gap-[60px] justify-between">
                <h4 class="text-xl font-bold">Title</h4>
                <div class="flex gap-2">
                  <div><img src="./images/tickmark.png" alt="" /></div>
                  <p>Mark As Read(0)</p>
                </div>
              </div>
            </div>
  
  `;
  discussRight.appendChild(div);
};

// Mark Read

// Latest posts

const latestPosts = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const posts = await res.json();

  posts.forEach((post) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="mt-12">
            <div class="card bg-base-100 shadow-xl">
              <figure class="px-10 pt-10">
                <img
                  src=${post.cover_image}
                  alt="Shoes"
                  class="rounded-xl"
                />
              </figure>
              <div class="card-body text-left space-y-2">
                <h2 class="font-extrabold text-lg">
                  ${post.title}
                </h2>
                <p class="opacity-80">
                  ${post.description}
                </p>
                <div class="flex items-center gap-4">
                  <div>
                    <img class="w-[50px] rounded-full" src=${
                      post.profile_image
                    } alt="" />
                  </div>
                  <div>
                    <h4 class="text-base font-extrabold">${
                      post.author.name
                    }</h4>
                    <p class="opacity-80">${
                      post.author.designation
                        ? post.author.designation
                        : "unknown"
                    }</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `;

    latestPostsContainer.appendChild(div);
  });
};

const search = async () => {
  const searchFieldValue = document.getElementById("search-field").value;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchFieldValue}`
  );
  const data = await res.json();
  const posts = data.posts;

  discussLeft.innerHTML = "";
  discussRight.innerHTML = "";
  displayData(posts);
};

loadData();

latestPosts();
