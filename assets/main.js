const API =
  "https://youtube-v31.p.rapidapi.com/search?relatedToVideoId=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCxgfCvxu5k6LSell_bvOQxw&part=id%2Csnippet&type=video&maxResults=9";

const content = null || document.getElementById("content");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "b3365e0178msh4f1bf787a28380cp1f12a4jsncbfb1334ca1c",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

async function fetchData(urlApi) {
  const response = await fetch(urlApi, options);
  const data = await response.json();
  return data;
}

(async () => {
  try {
    const videos = await fetchData(API);
    let view = `
    ${videos.items
      .map(
        (video) => `
      <div class="group">
        <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
          <a target="_blank" href="https://youtube.com/video/${video.id.videoId}">
            <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
          </a>
        </div>
        <div class="mt-4 flex justify-between">
          <h3 class="text-sm text-gray-700 dark:text-slate-400"">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${video.snippet.title}
          </h3>
        </div>
      </div>
    `
      )
      .slice(0, 4)
      .join("")}
    `;
    content.innerHTML = view;
  } catch (error) {
    console.log(error);
  }
})();

