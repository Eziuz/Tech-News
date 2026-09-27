const parametros =
    new URLSearchParams(window.location.search);

const idNoticia =
    Number(parametros.get("id"));

const articulo =
    document.getElementById("article-detail");

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

    });