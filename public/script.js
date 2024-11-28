// script.js

document.getElementById('loginForm').onsubmit = function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    fetch('/auth/login', {
        method: 'POST',
        body: formData
    }).then(response => {
        if (response.ok) {
            const username = formData.get('username');
            sessionStorage.setItem('username', username);
            window.location.href = '/dashboard';
        } else {
            alert('Error al iniciar sesión. Por favor, verifique sus credenciales.');
        }
    });
};

document.getElementById('registerForm').onsubmit = function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    fetch('/auth/register', {
        method: 'POST',
        body: formData
    }).then(() => {
        alert('Registro con éxito');
        window.location.href = '/';
    });
};

// Ventana Modal para Registro
const modal = document.getElementById("registerModal");
const openModalButton = document.getElementById("openRegisterModal");
const closeModalButton = document.getElementById("closeModal");

openModalButton.onclick = function() {
    modal.style.display = "block";
}

closeModalButton.onclick = function() {
    modal.style.display = "none";
}

// Ventana Modal para Videos
const videoModal = document.getElementById("videoModal");
const closeVideoModal = document.getElementById("closeVideoModal");
const videoPlayer = document.getElementById("videoPlayer");
const videoSource = document.getElementById("videoSource");

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
    if (event.target === videoModal) {
        videoModal.style.display = "none";
        videoPlayer.pause();
        videoSource.src = "";  // Limpiar la fuente del video
    }
}

function showModule(module) {
    const moduleContent = document.getElementById('moduleContent');
    let contentHTML = '';

    const videoLinks = {
        "sap": ["ruta/a/Video_SAP_Cliente.mp4", "ruta/a/Video_SAP_Resolucion.mp4"],
        "cco": ["ruta/a/Configuracion Datafono.mp4"],
        "hr": ["ruta/a/video_hr_1.mp4"],
        "finanzas": ["ruta/a/video_finanzas_1.mp4"]
    };

    if (module === 'sap') {
        contentHTML = `
            <h2><img src="./img/sap.png" alt="SAP"> Módulo SAP</h2>
            <p>Aquí se encuentran los videos y documentos relacionados con SAP.</p>
            <h3>Videos</h3>
            <ul>
                ${videoLinks.sap.map(video => `<li><button onclick="openVideo('${video}')">Ver Video</button></li>`).join("")}
            </ul>
            <h3>Documentos</h3>
            <ul>
                <li><button onclick="openDocument('ruta/a/documento2.pdf')">Manual SAP</button></li>
            </ul>
        `;
    } else if (module === 'cco') {
        contentHTML = `
            <h2><img src="./img/cco.png" alt="CCO"> Módulo CCO</h2>
            <p>Aquí se encuentran materiales relacionados con CCO.</p>
            <h3>Videos</h3>
            <ul>
                ${videoLinks.cco.map(video => `<li><button onclick="openVideo('${video}')">Ver Video</button></li>`).join("")}
            </ul>
            <h3>Documentos</h3>
            <ul>
                <li><button onclick="openDocument('ruta/a/manual_cco.pdf')">Manual CCO</button></li>
            </ul>
        `;
    } else if (module === 'hr') {
        contentHTML = `
            <h2><img src="./img/hr.png" alt="HR"> Módulo Recursos Humanos</h2>
            <p>Aquí se encuentran materiales relacionados con Recursos Humanos.</p>
            <h3>Videos</h3>
            <ul>
                ${videoLinks.hr.map(video => `<li><button onclick="openVideo('${video}')">Ver Video</button></li>`).join("")}
            </ul>
            <h3>Documentos</h3>
            <ul>
                <li><button onclick="openDocument('ruta/a/manual_hr.pdf')">Manual HR</button></li>
            </ul>
        `;
    } else if (module === 'finanzas') {
        contentHTML = `
            <h2><img src="./img/finanzas.png" alt="Finanzas"> Módulo Finanzas</h2>
            <p>Aquí se encuentran materiales relacionados con Finanzas.</p>
            <h3>Videos</h3>
            <ul>
                ${videoLinks.finanzas.map(video => `<li><button onclick="openVideo('${video}')">Ver Video</button></li>`).join("")}
            </ul>
            <h3>Documentos</h3>
            <ul>
                <li><button onclick="openDocument('ruta/a/manual_finanzas.pdf')">Manual Finanzas</button></li>
            </ul>
        `;
    }
    
    moduleContent.innerHTML = contentHTML;
}

// Función para abrir videos en el modal
function openVideo(videoUrl) {
    videoSource.src = videoUrl;
    videoPlayer.load(); // Cargar el video
    videoModal.style.display = "block"; // Mostrar el modal de video
}

// Función para abrir documentos (para futuro desarrollo)
function openDocument(docUrl) {
    window.open(docUrl, "_blank"); // Abrir documento en nueva pestaña
}
