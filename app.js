const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
	const request = {
		part: 'snippet',
		type: 'video',
		key: 'AIzaSyB7HCUseDwSloFDrEGkWaQ6n54vnmDif4Q',
		q: searchTerm
	}
	$.getJSON(YOUTUBE_SEARCH_URL, request, callback);
}

// function getDataFromApi(){
// 	gapi.client.setApiKey("AIzaSyB7HCUseDwSloFDrEGkWaQ6n54vnmDif4Q");
//     gapi.client.load('youtube', 'v3', function() {
//     	getDataFromApi();
//     });
// 	$.getJSON(getDataFromApi)
// }

// function makeRequest() {
//     var request = gapi.client.youtube.search.list({
// 		part: 'snippet',
// 		type: 'video',
// 		q:'searchTerm',
//     });
//     makeRequest()
// }


function renderResult(result) {
  return `
    <div>
      <a class="js-result-name" href="${result.html_url}" target="_blank">${result.name}</a>
    </div>
  `;
}


function displayYoutubeSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.results').html(results);
}


function onSubmit() {
  $('.search-form').submit(event => {
    event.preventDefault();
    const searchTermInput = $(this).find('.input-box');
    const dataRequest = searchTermInput.val(); //clear out input
    searchTermInput.val("");
    getDataFromApi(dataRequest, displayYoutubeSearchData);
  });
}

$(onSubmit);
