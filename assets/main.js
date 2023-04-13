
const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCX9NJ471o7Wie1DQe94RVIg&part=snippet%2Cid&order=date&maxResults=12';

const content = null || document.getElementById('content');
const content2 = null || document.getElementById('content2');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '811d735663mshf7713789237e26bp120e47jsn29e0ef68fe45',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetchData(urlApi){
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}

// función que se llama, dependemos del lamado, así misma se llama, cuando la detecta, se hace llamar.
//función anónima
(async ()=>{
    try {
        console.log("se está ejecutando")
        const videos = await fetchData(API);
        console.log(videos);
        let view = `
        ${videos.items.map(video => `
        <a href="https://youtube.com/watch?v=${video.id.videoId}" target="_blank">
            <div class="group">
                    <div
                    class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${video.snippet.thumbnails.high.url}" alt="" class="w-full" />
                    </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-400">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                        ${video.snippet.title}
                    </h3>
                </div>
            </div>
        </a>
        `).slice(0,12).join('')}
        `;
        let view2 = `
        ${videos.items.map(video => `
        <div class="group">
                <iframe  src="https://youtube.com/embed/${video.id.videoId}">
                </iframe>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-400">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                        ${video.snippet.title}
                    </h3>
                </div>
            </div>
        `).slice(0,8).join('')}
        `;

        console.log("acá "+view);
        content.innerHTML = view;
        content2.innerHTML = view2;
    } catch (error) {
        console.log(error);
    }
})();