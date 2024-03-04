// Declare variables

const discussLeft = document.getElementById("discuss-left");
const discussRight = document.getElementById("discuss-right");
const latestPostsContainer = document.getElementById("latest-posts-container");
const markAsRead = document.getElementById("mark-as-read");
let markAsReadValue = parseInt(
  document.getElementById("mark-as-read").innerText
);
let countMarkAsRead = 0;

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
                <div class="avatar ${
                  post.isActive
                    ? "online"
                    : "before:bg-red-600 before:rounded-full before:w-[16%] before:h-[16%] before:absolute before:right-[6%] before:top-[6%] before:outline-2 before:outline-white before:outline"
                }">
                    <div class="w-[50px] rounded-full">
                        <img src=${post.image} />
                    </div>
                </div>
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
                    <button onclick="markRead(event)" class="read-btn"><img src="./images/email 1.png" alt="" /></button>
                  </div>
                </div>
              </div>
            </div>
    `;
    discussLeft.appendChild(div);
  });
};

// Mark Read

const markRead = (event) => {
  // increase the read count
  countMarkAsRead += 1;

  // update the count
  markAsRead.innerText = countMarkAsRead;

  const title =
    event.target.parentElement.parentElement.parentElement.parentElement
      .childNodes[3].innerText;

  const views =
    event.target.parentElement.parentElement.parentElement.parentElement
      .childNodes[9].childNodes[3].childNodes[3].innerText;

  const div = document.createElement("div");

  div.innerHTML = `
    <div class="bg-white p-8 my-4 rounded-2xl flex justify-between">
              <h5 class="font-bold text-base">
                ${title}
              </h5>
              <div class="flex items-center pr-2">
                <img src="./images/tabler-icon-eye.png" alt="" />
                <p>${views}</p>
              </div>
            </div>
    
    `;
  discussRight.appendChild(div);
};

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
                <div class="flex gap-2">
                    <img src="./images/calendar.png" alt="">
                    <p>${
                      post.author.posted_date
                        ? post.author.posted_date
                        : "No Publish Date"
                    }</p>
                </div>
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

// search functionality

const search = async () => {
  const searchFieldValue = document.getElementById("search-field").value;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchFieldValue}`
  );
  const data = await res.json();
  const posts = data.posts;

  //   hidden left and right and show spinner
  discussLeft.classList.add("hidden");
  discussRight.classList.add("hidden");
  document.getElementById("loading-spinner").innerHTML = `
      <span class="loading loading-spinner loading-lg block mx-auto"></span>
    `;

  //   Set timeout for late data display and remove the spinner

  setTimeout(() => {
    discussLeft.classList.remove("hidden");
    discussRight.classList.remove("hidden");
    document.getElementById("loading-spinner").innerHTML = "";

    // Clearing previous left side data
    discussLeft.innerHTML = "";
    displayData(posts);
  }, 2000);
};

loadData();

latestPosts();
