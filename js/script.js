// fetch
// mengambil class
const searchButton = document.querySelector('.search-button');
// ketika di klik jalakan function berikut
searchButton.addEventListener('click', function() {

	const inputKeyword = document.querySelector('.input-keyword');
	// methode fetch pengganti ajax
	fetch(linkFilm() + '&s=' + inputKeyword.value)
		// jika data sudah di kembalikan lakukan
		.then(response => response.json())
		// karena berbentuk promise, untuk menjalankan secara asynchronous maka lakukan kembali
		.then(response => {
			const movies = response.Search;
			// meneyiapkan cards
			let cards = '';
			// cards berisi 10 film
			movies.forEach(m => cards += showCard(m));
			// masukn k dlm movie container
			// mengambil class movie-container
			const movieContainer = document.querySelector('.movie-container');
			// timpa movie-container dengan cards
			movieContainer.innerHTML = cards;


			// mengambil class modal-detail-button
			const modalDetailButton =  document.querySelectorAll('.modal-detail-button');
			// ktika tombol detail di klik lakukan
			modalDetailButton.forEach(btn => {
				btn.addEventListener('click', function(){
					// ambil imdbid
					const imdbid = this.dataset.imdbid;
					// console.log(imdbid);
					fetch(linkFilm() + '&i=' + imdbid)
						// jika data sudah di kembalikan lakukan
						.then(response => response.json())
						// karena berbentuk promise, untuk menjalankan secara asynchronous maka lakukan kembali
						.then(m => {
							const movieDetail = showMovieDetail(m);
							const modalBody = document.querySelector('.modal-body');
							modalBody.innerHTML = movieDetail;
								// $('.modal-body').html(movieDetail);
								// console.log(movieDetail);

						});

				});

			});

		});
});


function linkFilm() {
	return `http://www.omdbapi.com/?apikey=dca61bcc`
}


function showCard(m) {
	return `<div class="col-md-4 my-4">
				<div class="card text-center">
		           	<img src="${m.Poster}" class="card-img-top">
				   	<div class="card-body">
				   		<h5 class="card-title">${m.Title}</h5>
				        <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
				        <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Detail</a>
			     	</div>
				</div>
	      	</div>`;
};


function showMovieDetail(m){
	return `<div class="container-fluid">
				<div class="row">                
					<div class="col-md-3">
						<img src="${m.Poster}" class="img-fluid">
	                </div>
					<div class="col-md">
		                <ul class="list-group">
							<li class="list-group-item"><h4>${m.Title} ${m.Year}</h4></li>
							<li class="list-group-item"><strong>Director : </strong>${m.Director}</li>
							<li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
							<li class="list-group-item"><strong>Writer : </strong>${m.Writer}</li>
							<li class="list-group-item"><strong>Plot : </strong><br>${m.Plot}</li>
						</ul>
		           	</div>				                
				</div>
			</div>`;
};                                                                                                                       