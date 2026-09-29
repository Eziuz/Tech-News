const parametros =
    new URLSearchParams(window.location.search);

const idNoticia =
    Number(parametros.get("id"));

const articulo =
    document.getElementById("article-detail");

const contenedorRelacionadas =
    document.getElementById("related-news-container");

function mostrarNoticiasRelacionadas(
    noticias,
    noticiaSeleccionada
) {

    const relacionadas =
        noticias.filter(noticia =>
            noticia.categoria === noticiaSeleccionada.categoria &&
            noticia.id !== noticiaSeleccionada.id
        );

    const relacionadasLimitadas =
    relacionadas.slice(0, 3);
        contenedorRelacionadas.innerHTML = "";


    relacionadasLimitadas.forEach(noticia => {

        const tarjetaRelacionada = `

            <article class="related-card">

                <img
                    src="${noticia.imagen}"
                    alt="${noticia.titulo}"
                >


                <div class="related-card-meta">

                    <span class="related-category">
                        ${noticia.categoria}
                    </span>

                    <span class="related-date">
                        ${noticia.fecha}
                    </span>

                </div>


                <a
                    href="detalle.html?id=${noticia.id}"
                    class="related-title"
                >
                    ${noticia.titulo}
                </a>

            </article>

        `;


        contenedorRelacionadas.innerHTML +=

        tarjetaRelacionada;

    });
}





fetch("data/noticias_30_detalle.json")
    .then(respuesta => respuesta.json())
    .then (noticias => {

        const noticiaSeleccionada = 
            noticias.find(noticia =>
                noticia.id === idNoticia
            );
        
        if(!noticiaSeleccionada) {

            articulo.innerHTML = `

            <h1>
                Noticia no encontrada           
            </h1>
            
            <p>
                La noticia solicitada no existe
            </p>
            
            `;
            
            return;
        }

        let contenidoHTML = "";

        noticiaSeleccionada.contenido.forEach(seccion => {

            if (seccion.subtitulo !== "") {

                contenidoHTML += `
                
                <h2>
                    ${seccion.subtitulo}
                </h2>
                
                `;
            }

            contenidoHTML += `
            
            <p>
                ${seccion.texto}
            </p>
             
            `;

        });

        articulo.innerHTML = `
        
            <p class="breadcrumb">
                    Inicio / Noticias / ${noticiaSeleccionada.categoria}
            </p>
                
            <span class="detail-category">
                ${noticiaSeleccionada.categoria}
            </span>

            <h1>
                ${noticiaSeleccionada.titulo}
            </h1>

            <div class="article-meta">
                <span>
                    ${noticiaSeleccionada.autor}
                </span>

                <span>
                    *
                </span>

                <span>
                    ${noticiaSeleccionada.fecha}
                </span>

            </div>

            <img class="detail-main-image" src="${noticiaSeleccionada.imagen}" alt = "${noticiaSeleccionada.titulo}">

            ${contenidoHTML}

        `;

        mostrarNoticiasRelacionadas(noticias,noticiaSeleccionada);
    });