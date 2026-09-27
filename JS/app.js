let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

fetch('/data/noticias.json')
    .then(respuesta => respuesta.json())
    .then(noticias => {
    const contenedor =
    document.getElementById("news-container");

    noticias.forEach(noticia => {

    const iconoFavorito = favoritos.includes(noticia.id) ? "♥" : "♡";

    const tarjeta = `
        <article class="news-card">
                        
            <div class="news-image">

                <img src="${noticia.imagen}" alt="${noticia.titulo}">
                         
                    <button class="favorite-button" data-id="${noticia.id}">${iconoFavorito}</button>
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

            const id = Number(boton.dataset.id);

            if(favoritos.includes(id)){
                favoritos = favoritos.filter(
                    favoritoId => favoritoId !== id
                );
                boton.textContent = "♡";
            } else {
                favoritos.push(id);
                boton.textContent = "♥";
            }
            localStorage.setItem("favoritos", JSON.stringify(favoritos));
        });
    })
});