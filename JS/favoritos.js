const contenedor =
    document.getElementById("favorites-container");

const mensajeVacio =
    document.getElementById("favorites-empty");

let favoritos =
    JSON.parse(localStorage.getItem("favoritos")) || [];

let todasLasNoticias =[];

function actualizarFavoritos () {

    const noticiasFavoritas =

    todasLasNoticias.filter( noticia =>
            
        favoritos.includes(noticia.id)
    );

    mostrarFavoritos(noticiasFavoritas);

}

function mostrarFavoritos(listaNoticias){

    contenedor.innerHTML ="";

    if (listaNoticias.length === 0) {

        mensajeVacio.innerHTML = `
            <h2>
                No tienes noticias favoritas
            </h2>

            <p>
                Guarda noticias desde Inicio o Todas las noticias.
            </p>

            <a
                href="noticias.html"
                class="explore-button-favorite"
            >
                Explorar noticias
            </a>
        `;

        return;
    }

    mensajeVacio.innerHTML = "";

    listaNoticias.forEach(noticia => {

        const tarjeta = `
          
        <article class="all-news-card">
            <div class="all-news-image">

                <img src="${noticia.imagen}" alt="${noticia.titulo}">

            </div>

            <div class="all-news-content">

                <div class="news-meta">

                    <span class="category">
                        ${noticia.categoria}
                    </span>

                    <span class="news-date">
                        ${noticia.fecha}
                    </span>

                </div>

                <h3>
                    ${noticia.titulo}
                </h3>

                <p>
                    ${noticia.descripcion}
                </p>

                <div class="news-card-footer">

                    <button type ="button" class="favorite-button list-favorite" data-id="${noticia.id}">
                        ♥
                    </button>

                    <a href="detalle.html?id=${noticia.id}" class="read-more">Leer más</a>

                </div>

            </div>

        </article>
        `;

        contenedor.innerHTML += tarjeta;
    });

    const botonesFavoritos =
        document.querySelectorAll(".favorite-button");

    botonesFavoritos.forEach(boton => {

        boton.addEventListener("click", () => {

            const id=
                Number(boton.dataset.id);
            
            favoritos =
                favoritos.filter(idFavorito =>
                    idFavorito !== id
                );

            console.log(favoritos);

            localStorage.setItem(
                "favoritos",
                JSON.stringify(favoritos)
            );

            actualizarFavoritos();

        });

    });

}

fetch("data/noticias_30_detalle.json")
    .then(respuesta => respuesta.json())
    .then(noticias => {

        todasLasNoticias = noticias;

        actualizarFavoritos();
    
    });
