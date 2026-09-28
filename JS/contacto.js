const formulario =
    document.getElementById("contact-form");

const nombre =
    document.getElementById("nombre");

const correo = 
    document.getElementById("correo");

const asunto =
    document.getElementById("asunto");

const mensaje =
    document.getElementById("mensaje");

const datos =
    document.getElementById("datos");

const successMessage =
    document.getElementById("success-message");

const errorNombre =
    document.getElementById("error-nombre");

const errorCorreo =
    document.getElementById("error-correo");

const errorAsunto =
    document.getElementById("error-asunto");

const errorMensaje =
    document.getElementById("error-mensaje");

const errorDatos =
    document.getElementById("error-datos");


formulario.addEventListener("submit", event => {
    
    event.preventDefault();

    console.log("Formulario enviado");
    console.log("valor del nombre", nombre.value);

    let formularioValido = true;

    errorNombre.textContent ="";
    errorCorreo.textContent = "";
    errorAsunto.textContent = "";
    errorMensaje.textContent = "";
    errorDatos.textContent = "";
    successMessage.textContent = "";

    if(nombre.value.trim() === ""){

        errorNombre.textContent =

        "El nombre completo es obligatorio";

        formularioValido = false;
    }

    const patronCorreo =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if(correo.value.trim() ===""){

        errorCorreo.textContent = "El correo electrónico es obligatorio.";

        formularioValido = false;

    } else if(!patronCorreo.test(correo.value.trim())){

        errorCorreo.textContent = "El correo electrónico es obligatorio.";

        formularioValido = false;
    }

    if(asunto.value.trim() === ""){

        errorAsunto.textContent = "El asunto es obligatorio.";
        formularioValido = false;
    }

    if(mensaje.value.trim() === "") {

        errorMensaje.textContent = "El mensaje es obligatorio";
        formularioValido = false;
    }

    if(!datos.checked){
        errorDatos.textContent ="Debes aceptar el tratamientoo de datos.";
        formularioValido = false;
    }

    if(formularioValido === true) {

        successMessage.textContent = "¡Mensaje enviado correctamente!";

        formulario.reset();
    }
});


