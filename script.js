const estudiosIniciales = [
    { titulo: "Grado Superior DAM – Desarrollo de Aplicaciones Multiplataforma", centro: "IES Modesto Navarro, La Solana", periodo: "Septiembre 2025 – actualidad", fijo: true },
    { titulo: "Grado Medio SMR – Sistemas Microinformáticos y Redes", centro: "IES Modesto Navarro, La Solana", periodo: "Septiembre 2023 – Junio 2025", fijo: true }
];

let estudios = JSON.parse(localStorage.getItem("estudios")) || estudiosIniciales;

function guardarEstudios() {
    localStorage.setItem("estudios", JSON.stringify(estudios));
}

function borrarEstudio(index) {
    estudios.splice(index, 1);
    guardarEstudios();
    mostrarEstudios();
}

function mostrarEstudios() {
    const lista = document.getElementById("lista-estudios");
    lista.innerHTML = "";
    estudios.forEach(function (estudio, index) {
        lista.innerHTML += `
            <article class="tarjeta">
                <h3>${estudio.titulo}</h3>
                <p><strong>Centro:</strong> ${estudio.centro}</p>
                <p><strong>Período:</strong> ${estudio.periodo}</p>
                ${estudio.fijo ? "" : `<button onclick="borrarEstudio(${index})">Borrar</button>`}
            </article>
        `;
    });
}

function añadirEstudio(event) {
    event.preventDefault();
    const nuevoEstudio = {
        titulo: document.getElementById("titulo").value,
        centro: document.getElementById("centro").value,
        periodo: document.getElementById("periodo").value
    };
    estudios.push(nuevoEstudio);
    guardarEstudios();
    mostrarEstudios();
    event.target.reset();
}

function cambiarTema() {
    document.body.classList.toggle("oscuro");

    if (document.body.classList.contains("oscuro")) {
        localStorage.setItem("tema", "oscuro");
        document.getElementById("btnTema").textContent = "☀️";
    } else {
        localStorage.setItem("tema", "claro");
        document.getElementById("btnTema").textContent = "🌙";
    }
}

if (localStorage.getItem("tema") === "oscuro") {
    document.body.classList.add("oscuro");
    document.getElementById("btnTema").textContent = "☀️";
}

mostrarEstudios();
