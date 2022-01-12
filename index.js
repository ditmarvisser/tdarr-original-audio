const apiKeyTMDB = "6916ab0589053145100ff85e25d72ce5";
const apiKeySonarr = "6ea11f4568d34aa7b0c96148570b5c40";
const apiKeyRadarr = "2a28a93e5ed24a89a6c81ed2c46eda72";

function sonarrIndex() {
	fetch(`http://localhost:8989/api/series?apikey=${apiKeySonarr}`)
		.then((response) => {
			return response.json();
		})
		.then((series) => {
			series.forEach((serie) => {
				fetch(
					`https://api.themoviedb.org/3/find/${serie.tvdbId}?api_key=${apiKeyTMDB}&external_source=tvdb_id`
				)
					.then((response) => {
						return response.json();
					})
					.then((data) => {
						console.log(serie.title);
						if (data.tv_results.length == 1) {
							// console.log(data.tv_results[0]);
							console.log(
								data.tv_results[0].name +
									", " +
									data.tv_results[0].original_language
							);
						} else {
							// console.log(data.tv_results);
						}
						console.log("");
					})
					.catch((err) => {
						console.log(err);
					});
			});
		})
		.catch((err) => {
			console.log(err);
		});
}

function radarrIndex() {
	fetch(`http://localhost:7878/api/v3/movie?apikey=${apiKeyRadarr}`)
		.then((response) => {
			return response.json();
		})
		.then((movies) => {
			movies.forEach((movie) => {
				// matchIdToTMDB(movie.title, movie.tvdbId, "tmdb", "movie");
				fetch(
					`https://api.themoviedb.org/3/movie/${movie.tmdbId}?api_key=${apiKeyTMDB}&external_source=tvdb_id`
					)
					.then((response) => {
						return response.json();
					})
					.then((data) => {
						console.log(movie.title);
						console.log(
								data.title +
									", " +
									data.original_language
							);
						console.log("");
					})
					.catch((err) => {
						console.log(err);
					});
			});
		})
		.catch((err) => {
			console.log(err);
		});
}

// matchIdToTMDB("393205", "tvdb");
// sonarrIndex();
radarrIndex();
