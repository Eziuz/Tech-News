const contenedor =
    document.getElementById("all-news-container");

const buscador =
    document.getElementById("search-input");

const botonesFiltro =
    document.querySelectorAll(".filter-button");

let categoriaSeleccionada = "Todas";

const paginacion =
    document.getElementById("pagination");

let paginaActual = 1;

let favoritos =
    (JSON.parse(localStorage.getItem("favoritos")) || []).map(Number);

const noticiasPorPagina = 6;



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

                    <button class="favorite-button list-favorite ${favoritos.includes(noticia.id) ? "active" : ""}" data-id="${noticia.id}">
                        ${favoritos.includes(noticia.id) ? "♥" : "♡"}
                    </button>

                    <a href="detalle.html?id=${noticia.id}" class="read-more">Leer más</a>

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

    paginaActual = 1;

    actualizarVista(noticiasFiltradas);

}

function mostrarPagina(listaNoticias) {
    
    const inicio =
        (paginaActual -1)* noticiasPorPagina;
    
    const fin =
        inicio + noticiasPorPagina;

    const noticiasPagina =
        listaNoticias.slice(inicio,fin);

    mostrarNoticias(noticiasPagina);
}

function crearPaginacion(listaNoticias){
    
    paginacion.innerHTML="";

    const totalPaginas =
        Math.ceil(
            listaNoticias.length /
            noticiasPorPagina
        );
    
    const botonAnterior = 
        document.createElement("button");
        botonAnterior.textContent = "<";

        if(paginaActual == 1){

            botonAnterior.disabled = true;
        }

        botonAnterior.addEventListener("click", () => {
        
            paginaActual--;
            actualizarVista(listaNoticias);

        });

        paginacion.appendChild(botonAnterior);

    for(
        let pagina = 1;
        pagina <= totalPaginas;
        pagina++
    )
    {
        const boton = document.createElement("button");

        boton.textContent = pagina;

        boton.dataset.page = pagina;

        if(pagina === paginaActual){

            boton.classList.add("active");
        }

        boton.addEventListener("click", () => {

            paginaActual = pagina;

            mostrarPagina(listaNoticias);

            crearPaginacion(listaNoticias);

        });

        paginacion.appendChild(boton);
    }

    const botonDespues =
        document.createElement("button");
        botonDespues.textContent = ">";

    if(paginaActual === totalPaginas){
        botonDespues.disabled = true;
    }

    botonDespues.addEventListener("click", () => {

        paginaActual++;
        actualizarVista(listaNoticias);
    });

    paginacion.appendChild(botonDespues);
    
}

function actualizarVista(listaNoticias){
    
    mostrarPagina(listaNoticias);

    crearPaginacion(listaNoticias);
}

contenedor.addEventListener("click", event => {

    const boton =
        event.target.closest(".favorite-button");


    if (!boton) {
        return;
    }


    const id =
        Number(boton.dataset.id);


    if (favoritos.includes(id)) {

        favoritos =
            favoritos.filter(idFavorito =>
                idFavorito !== id
            );


        boton.textContent = "♡";

        boton.classList.remove("active");

    } else {

        favoritos.push(id);

        boton.textContent = "♥";

        boton.classList.add("active");

    }


    localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos)
    );

});

fetch("data/noticias_30_detalle.json")
    .then(respuesta => respuesta.json())
    .then(noticias =>{

        actualizarVista(noticias);

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


