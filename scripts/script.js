const discussSection = document.getElementById("discuss-section");

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
    console.log(post);
    const div = document.createElement("div");
    div.className = "flex flex-col lg:flex-row gap-6 mb-10";
    div.innerHTML = `
    <div
              style="
                background-image: url(./images/discuss-bg.png);
                background-repeat: no-repeat;
                background-size: cover;
              "
              class="flex lg:w-[60%] gap-5 p-10 rounded-3xl"
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
                <div class="flex items-center gap-10 mt-4 opacity-80">
                  <div class="flex gap-2">
                    <img src="./images/tabler-icon-message-2.png" alt="" />
                    <p>260</p>
                  </div>
  
                  <div class="flex gap-2">
                    <img src="./images/tabler-icon-eye.png" alt="" />
                    <p>1,568</p>
                  </div>
  
                  <div class="flex gap-2">
                    <img src="./images/tabler-icon-clock-hour-9.png" alt="" />
                    <p>5 Min</p>
                  </div>
                  <div class="ml-auto">
                    <button><img src="./images/email 1.png" alt="" /></button>
                  </div>
                </div>
              </div>
            </div>
    `;
    discussSection.appendChild(div);
  });

  const div = document.createElement("div");
  div.className = "flex flex-col lg:flex-row gap-6 mt-12 mb-24";
  div.innerHTML = `
  <div
              style="
                background-image: url(./images/discuss-bg.png);
                background-repeat: no-repeat;
                background-size: cover;
              "
              class="p-10 rounded-3xl lg:w-[40%]"
            >
              <div class="flex justify-between">
                <h4 class="text-xl font-bold">Title</h4>
                <div class="flex gap-2">
                  <div><img src="./images/tickmark.png" alt="" /></div>
                  <p>Mark As Read(1)</p>
                </div>
              </div>
              <div class="bg-white p-8 my-4 rounded-2xl flex justify-between">
                <h5 class="font-bold text-base">
                  10 Kids Unaware of Their Halloween Costume
                </h5>
                <div class="flex items-center pr-2">
                  <img src="./images/tabler-icon-eye.png" alt="" />
                  <p>1,568</p>
                </div>
              </div>
            </div>
  
  `;
  discussSection.appendChild(div);
};

loadData();
