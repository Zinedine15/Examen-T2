let textCc = ''; // Variable que guardará el comando detectado
let resultado = ''; // Variable que guardará el resultado de la detección de voz
let usuarioAutenticado = ''; // Variable para almacenar el nombre de usuario autenticado
let contraseñaAutenticada = ''; // Variable para almacenar la contraseña autenticada
let usuario = ''; // Variable para almacenar el nombre de usuario

// Función para obtener la hora del sistema
function obtenerHoraYFechaDelSistema() {
    // Obtener la fecha y hora actual
    var fechaHoraActual = new Date();

    // Extraer el año, mes y día
    var day = fechaHoraActual.getDate();
    var month = fechaHoraActual.getMonth() + 1; // Sumar 1 porque getMonth() devuelve valores de 0 a 11
    var year = fechaHoraActual.getFullYear();

    // Extraer la hora, minutos y segundos
    var hora = fechaHoraActual.getHours();
    var minutos = fechaHoraActual.getMinutes();
    var segundos = fechaHoraActual.getSeconds();

    // Formatear la fecha y hora en formato YYYY-MM-DD HH:MM:SS
    var fechaHoraFormateada = day + "-" + month + "-" + year + ", " + hora + ":" + minutos + ":" + segundos;

    // Devolver la fecha y hora formateada
    return fechaHoraFormateada;
}

// Función para enviar datos a una API ficticia
function enviarDatosAMockAPI(textCc, Usuario) {
    const apiUrl = "https://6604c6232ca9478ea17e7e32.mockapi.io/instruccionesCasa";

    const datos = {
        ordenUsr: textCc,
        user: Usuario, // Nombre de usuario autenticado
        fechaHora: obtenerHoraYFechaDelSistema() // Agregar la hora del sistema
    };

    const options = {
        method: 'POST', // Método HTTP POST para enviar los datos
        headers: {
            'Content-Type': 'application/json' // Especificar el tipo de contenido JSON
        },
        body: JSON.stringify(datos) // Convertir el objeto a JSON
    };

    fetch(apiUrl, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ocurrió un error al enviar los datos a la API.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos enviados exitosamente a la API:', data);
        })
        .catch(error => {
            console.error('Error al enviar los datos a la API:', error);
        });
}

// Función para autenticar al usuario por voz
function autenticarUsuarioPorVoz() {
    // Verificar si el navegador soporta reconocimiento de voz
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();

        recognition.lang = 'es-ES'; // Establecer el idioma de reconocimiento de voz

        // Iniciar el reconocimiento de voz para capturar el nombre de usuario y contraseña
        recognition.start();

        // Evento cuando la voz es detectada
        recognition.onresult = function (event) {
            const results = event.results;
            if (results && results.length > 0) {
                const transcript = results[0][0].transcript.toLowerCase(); // Obtener el texto reconocido y convertirlo a minúsculas

                // Definir usuarios y contraseñas
                const usuariosContraseñas = [
                    { usuario: 'Zinedine', contraseña: '1973' },
                    { usuario: 'Francisco', contraseña: '8246' }
                ];

                let credencialesCorrectas = false;

                // Verificar si la oración contiene cada usuario y su contraseña correspondiente
                for (const { usuario, contraseña } of usuariosContraseñas) {
                    if (transcript.includes(usuario.toLowerCase()) && transcript.includes(contraseña.toLowerCase())) {
                        usuarioAutenticado = usuario;
                        contraseñaAutenticada = contraseña;
                        credencialesCorrectas = true;
                        break;
                    }
                }

                // Verificar si se encontraron credenciales correctas
                if (credencialesCorrectas) {
                    alert("Usuario autenticado: " + usuarioAutenticado);
                    iniciarReconocimientoDeVoz(); // Iniciar el reconocimiento de voz después de la autenticación
                } else {
                    alert("Credenciales incorrectas. Inténtalo de nuevo.");
                    autenticarUsuarioPorVoz(); // Volver a solicitar las credenciales
                }
            } else {
                console.log("No se detectaron resultados de voz.");
            }
        };

        // Evento de error
        recognition.onerror = function (event) {
            console.error('Error de reconocimiento de voz:', event.error);
        };
    } else {
        // Si no hay soporte para reconocimiento de voz
        console.error('El reconocimiento de voz no está soportado en este navegador.');
    }
}
// Función para autenticar al usuario por voz
function autenticarUsuarioPorVoz() {
    // Verificar si el navegador soporta reconocimiento de voz
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        const user = document.getElementById('usuario');

        recognition.lang = 'es-ES'; // Establecer el idioma de reconocimiento de voz

        // Iniciar el reconocimiento de voz para capturar el nombre de usuario y contraseña
        recognition.start();

        // Evento cuando la voz es detectada
        recognition.onresult = function (event) {
            const results = event.results;
            if (results && results.length > 0) {
                const transcript = results[0][0].transcript.toLowerCase(); // Obtener el texto reconocido y convertirlo a minúsculas

                // Definir usuarios y contraseñas
                const usuariosContraseñas = [
                    { usuario: 'Zinedine', contraseña: '1973' },
                    { usuario: 'Francisco', contraseña: '8246' }
                ];

                let usuarioAutenticado = '';
                let contraseñaAutenticada = '';

                // Verificar si la oración contiene cada usuario y su contraseña correspondiente
                for (const { usuario, contraseña } of usuariosContraseñas) {
                    if (transcript.includes(usuario.toLowerCase()) && transcript.includes(contraseña.toLowerCase())) {
                        usuarioAutenticado = usuario;
                        contraseñaAutenticada = contraseña;
                        break;
                    }
                }

                // Verificar si se encontró un usuario autenticado
                if (usuarioAutenticado && contraseñaAutenticada) {
                    alert("Usuario autenticado: " + usuarioAutenticado);
                    user.textContent = 'Usuario Identificado: ' + usuarioAutenticado;
                    iniciarReconocimientoDeVoz(usuarioAutenticado); // Pasar el usuario autenticado como argumento
                } else {
                    alert("Credenciales incorrectas. Inténtalo de nuevo. (Recarga la página)");
                }
            } else {
                console.log("No se detectaron resultados de voz.");
            }
        };

        // Evento de error
        recognition.onerror = function (event) {
            console.error('Error de reconocimiento de voz:', event.error);
        };
    } else {
        // Si no hay soporte para reconocimiento de voz
        console.error('El reconocimiento de voz no está soportado en este navegador.');
    }
}

// Función para iniciar el reconocimiento de voz después de la autenticación
function iniciarReconocimientoDeVoz() {
    const recognition = new webkitSpeechRecognition();
    const resultDiv = document.getElementById('result');

    recognition.lang = 'es-ES'; // Establecer el idioma de reconocimiento de voz

    // Iniciar el reconocimiento de voz
    recognition.start();

    // Evento cuando la voz es detectada
    recognition.onresult = function (event) {
        const result = event.results[0][0].transcript; // Obtener el texto reconocido

        resultado = result;
        resultDiv.textContent = 'Orden identificada: ' + resultado;
        console.log("Comando Detectado: ", resultado);

        //Palabras clave de indentificación
        const kw1 = 'encender';
        const kw1_1 = 'prende';
        const kw1_2 = 'enciende';

        const kw2 = 'apagar';
        const kw2_1 = 'apaga';

        const kw3 = 'abrir';
        const kw3_1 = 'Abre';

        const kw4 = 'cerrar';
        const kw4_1 = 'cierra';

        const kw5 = 'Activar';

        const kw6 = 'desactivar';

        const lugar1 = 'recámara';
        const lugar1_1 = 'cuarto';
        const lugar2 = 'sala';
        const lugar3 = 'jardín';

        const obj1 = 'ventilador';
        const obj2 = 'cortinas';
        const obj3 = 'alarma';
        const obj4 = 'cámaras';

        //switch de indentificación de ordenes
        switch (true) {
            //luz encendida (recamara)
            case (resultado.includes(kw1) && resultado.includes(lugar1)) || (resultado.includes(kw1) && resultado.includes(lugar1_1)) ||
            (resultado.includes(kw1_1) && resultado.includes(lugar1)) || (resultado.includes(kw1_1) && resultado.includes(lugar1_1)) ||
            (resultado.includes(kw1_2) && resultado.includes(lugar1)) || (resultado.includes(kw1_2) && resultado.includes(lugar1_1)):

            textCc = "Encender la luz de la recámara";
            usuario  = usuarioAutenticado;
            enviarDatosAMockAPI(textCc, usuario);
            resultDiv.textContent = "Comando Detectado: Luis, "+textCc;

            break;

        //luz apagada (recamara)
        case (resultado.includes(kw2) && resultado.includes(lugar1)) || (resultado.includes(kw2) && resultado.includes(lugar1_1)) ||
            (resultado.includes(kw2_1) && resultado.includes(lugar1)) || (resultado.includes(kw2_1) && resultado.includes(lugar1_1)):

            textCc = "Apagar la luz de la recámara";
            usuario  = usuarioAutenticado;
            enviarDatosAMockAPI(textCc, usuario);
            resultDiv.textContent = "Comando Detectado: Luis, "+textCc;

            break;

        //luz encendida (sala)
        case (resultado.includes(kw1) && resultado.includes(lugar2)) ||
            (resultado.includes(kw1_1) && resultado.includes(lugar2)) ||
            (resultado.includes(kw1_2) && resultado.includes(lugar2)):

            textCc = "Encender la luz de la sala";
            usuario  = usuarioAutenticado ;
            enviarDatosAMockAPI(textCc, usuario);
            resultDiv.textContent = "Comando Detectado: Luis, "+textCc;

            break;

        //luz apagada (sala)
        case (resultado.includes(kw2) && resultado.includes(lugar2)) ||
            (resultado.includes(kw2_1) && resultado.includes(lugar2)):

            textCc = "Apagar la luz de la sala";
            usuario  = usuarioAutenticado ;
            enviarDatosAMockAPI(textCc, usuario);
            resultDiv.textContent = "Comando Detectado: Luis, "+textCc;

            break;

        //luz encendida (jardin)
        case (resultado.includes(kw1) && resultado.includes(lugar3)) ||
            (resultado.includes(kw1_1) && resultado.includes(lugar3)) ||
            (resultado.includes(kw1_2) && resultado.includes(lugar3)):

            textCc = "Encender las luces del jardín";
            usuario  = usuarioAutenticado ;
            enviarDatosAMockAPI(textCc, usuario);
            resultDiv.textContent = "Comando Detectado: Luis, "+textCc;

            break;

        //luz apagada (jardin)
        case (resultado.includes(kw2) && resultado.includes(lugar3)) ||
            (resultado.includes(kw2_1) && resultado.includes(lugar3)):

            textCc = "Apagar las luces del jardín";
            usuario  = usuarioAutenticado ;
            enviarDatosAMockAPI(textCc, usuario);
            resultDiv.textContent = "Comando Detectado: Luis, "+textCc;

            break;

        //ventilador encendido
        case (resultado.includes(kw1) && resultado.includes(obj1)) ||
            (resultado.includes(kw1_1) && resultado.includes(obj1)) ||
            (resultado.includes(kw1_2) && resultado.includes(obj1)):

            textCc = "Encender el ventilador";
            usuario  = usuarioAutenticado ;
            enviarDatosAMockAPI(textCc, usuario);
            resultDiv.textContent = "Comando Detectado: Luis, "+textCc;

            break;

        //ventilador apagado
        case (resultado.includes(kw2) && resultado.includes(obj1)) ||
            (resultado.includes(kw2_1) && resultado.includes(obj1)):

            textCc = "Apagar el ventilador";
            usuario  = usuarioAutenticado ;
            enviarDatosAMockAPI(textCc, usuario);
            resultDiv.textContent = "Comando Detectado: Luis, "+textCc;

            break;

        //cortinas abiertas
        case (resultado.includes(kw3) && resultado.includes(obj2)) ||
            (resultado.includes(kw3_1) && resultado.includes(obj2)):

            textCc = "Abrir las cortinas";
            usuario  = usuarioAutenticado ;
            enviarDatosAMockAPI(textCc, usuario);
            resultDiv.textContent = "Comando Detectado: Luis, "+textCc;

            break;

        //cortinas cerradas
        case (resultado.includes(kw4) && resultado.includes(obj2)) ||
            (resultado.includes(kw4_1) && resultado.includes(obj2)):

            textCc = "Cerrar las cortinas";
            usuario  = usuarioAutenticado ;
            enviarDatosAMockAPI(textCc, usuario);
            resultDiv.textContent = "Comando Detectado: Luis, "+textCc;

            break;

        //alarma activada
        case (resultado.includes(kw5) && resultado.includes(obj3)):

            textCc = "Activar la alarma";
            usuario  = usuarioAutenticado ;
            enviarDatosAMockAPI(textCc, usuario);
            resultDiv.textContent = "Comando Detectado: Luis, "+textCc;

            break;

        //alarma desactivada
        case (resultado.includes(kw6) && resultado.includes(obj3)):

            textCc = "Desactivar la alarma";
            usuario  = usuarioAutenticado ;
            enviarDatosAMockAPI(textCc, usuario);
            resultDiv.textContent = "Comando Detectado: Luis, "+textCc;

            break;

        //camaras encendidas
        case (resultado.includes(kw1) && resultado.includes(obj4)) ||
            (resultado.includes(kw1_1) && resultado.includes(obj4)) ||
            (resultado.includes(kw1_2) && resultado.includes(obj4)):

            textCc = "Encender las cámaras";
            usuario  = usuarioAutenticado ;
            enviarDatosAMockAPI(textCc, usuario);
            resultDiv.textContent = "Comando Detectado: Luis, "+textCc;

            break;

        //camaras apagadas
        case (resultado.includes(kw2) && resultado.includes(obj4)) ||
            (resultado.includes(kw2_1) && resultado.includes(obj4)):

            textCc = "Apagar las cámaras";
            usuario  = usuarioAutenticado ;
            enviarDatosAMockAPI(textCc, usuario);
            resultDiv.textContent = "Comando Detectado: Luis, "+textCc;

            break;

            default:
                console.log("No se reconoce el comando");
                resultDiv.textContent = "No se reconoce el comando";
                break;
        }
    };

    // Evento de error
    recognition.onerror = function (event) {
        console.error('Error de reconocimiento de voz:', event.error);
    };

    // Palabra clave para iniciar el reconocimiento de voz
    const activationKeyword = 'Luis';

    // Evento para detectar la palabra clave y activar el reconocimiento de voz
    recognition.onend = function () {
        console.log("Reconocimiento de voz terminado. Reiniciando...");
        recognition.start(); // Reinicia el reconocimiento de voz después de cada detección
    };
}
alert("Verifica el usuario y contraseña, por medio de la voz");
// Verificar la autenticación del usuario por voz
autenticarUsuarioPorVoz();
