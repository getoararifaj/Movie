document.addEventListener('DOMContentLoaded', () => {
    const filmForm = document.querySelector('#film-form form');
    const titleInput = document.querySelector('#title');
    const genreInput = document.querySelector('#genre');
    const actorInput = document.querySelector('#actor');
    const imageInput = document.querySelector('#image');
    const filmList = document.querySelector('#films');
    const searchInput = document.querySelector('#search');

    function getFilms() {
        return JSON.parse(localStorage.getItem('films')) || [];
    }

    function saveFilms(films) {
        localStorage.setItem('films', JSON.stringify(films));
    }

    function renderFilms(films) {
        filmList.innerHTML = '';
        films.forEach((film, index) => {
            const div = document.createElement('div');
            div.className = 'grid-item';
            div.innerHTML = `
                <img src="${film.image}" alt="${film.title}">
                <div>
                    <strong>${film.title}</strong>
                    <span>${film.genre}</span>
                    <span>${film.actor}</span>
                </div>
                <button onclick="deleteFilm(${index})">Fshij</button>
            `;
            filmList.appendChild(div);
        });
    }

    window.deleteFilm = function(index) {
        const films = getFilms();
        films.splice(index, 1);
        saveFilms(films);
        renderFilms(films);
    }

    filmForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = titleInput.value;
        const genre = genreInput.value;
        const actor = actorInput.value;
        const image = imageInput.value;

        const films = getFilms();
        films.push({ title, genre, actor, image });
        saveFilms(films);
        renderFilms(films);

        filmForm.reset();
    });

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const films = getFilms().filter(film =>
            film.title.toLowerCase().includes(query) ||
            film.genre.toLowerCase().includes(query) ||
            film.actor.toLowerCase().includes(query)
        );
        renderFilms(films);
    });

    renderFilms(getFilms());
});
