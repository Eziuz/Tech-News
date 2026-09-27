const contenedor =
    document.getElementById("all-news-container");

const buscador =
    document.getElementById("search-input");

const botonesFiltro =
    document.querySelectorAll(".filter-button");

let categoriaSeleccionada = "Todas";

function mostrarNoticias(listaNoticias){

    contenedor.innerHTML ="";

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

                    <button class="favorite-button list-favorite" data-id="${noticia.id}">
                        ♡
                    </button>

                    <a href="#" class="read-more">Leer más</a>

                </div>

            </div>

        </article>
        `;

        contenedor.innerHTML += tarjeta;


    });
}

function aplicarfiltros (noticias){

    const textoBusqueda =
        buscador.value.toLowerCase().trim();

    const noticiasFiltradas = 
            noticias.filter(noticia => {
             
            const titulo =
                noticia.titulo.toLowerCase();
            
            const categoria =
                noticia.categoria.toLowerCase();
            
            const descripcion =
                noticia.descripcion.toLowerCase();

            const coincideBusqueda =
                titulo.includes(textoBusqueda) ||
                categoria.includes(textoBusqueda) ||
                descripcion.includes(textoBusqueda);
            
            const coincideCategoria = 
                categoriaSeleccionada === "Todas" ||
                noticia.categoria === categoriaSeleccionada;
            
            return (coincideCategoria && coincideBusqueda);
        });

    mostrarNoticias(noticiasFiltradas);  

}

fetch("data/noticias.json")
    .then(respuesta => respuesta.json())
    .then(noticias =>{

        mostrarNoticias(noticias);

        buscador.addEventListener("input", () => {

            aplicarfiltros(noticias);

    });

    botonesFiltro.forEach(boton => {
        
        boton.addEventListener("click", () =>{

             categoriaSeleccionada =
                boton.dataset.category;

            botonesFiltro.forEach(botonFiltro => {

                botonFiltro.classList.remove("active");
            });

            boton.classList.add("active");

             aplicarfiltros(noticias);

        });
    });
});


