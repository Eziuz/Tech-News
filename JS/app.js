fetch('/data/noticias.json')
    .then(respuesta => respuesta.json())
    .then(noticias => {
    const contenedor =
    document.getElementById("news-container");

    noticias.forEach(noticia => {
    const tarjeta = `
        <article class="news-card">
                        
            <div class="news-image">

                <img src="${noticia.imagen}" alt="${noticia.titulo}">
                         
                    <button class="favorite-button">
                        ♡
                    </button>
            </div>
            <div class="news-content">
                <span class="category"> ${noticia.categoria} </span>
                    <h3> 
                        ${noticia.titulo}
                    </h3>
                    <p>
                        ${noticia.descripcion}
                    </p>
                    <a href="#" class="read-more">Ver más → </a>
            </div>
        </article>
        `; contenedor.innerHTML += tarjeta;

    });

    const botonesfavoritos = document.querySelectorAll(".favorite-button");
    botonesfavoritos.forEach(boton => {
        boton.addEventListener("click", () => {

            if (boton.textContent === "♡") {
                boton.textContent = "♥️";
            } else {
                boton.textContent = "♡";
            }
        });
    })
});