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
                ${estudio.fijo ? "" : `<button class="borrar" onclick="borrarEstudio(${index})">Borrar</button>`}
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

async function cargarGithub() {
    const usuario = "DestroyerReviews";
    const datos = document.getElementById("datos-github");
    const reposGithub = document.getElementById("repos-github");

    try {
        const respuesta = await fetch("https://api.github.com/users/" + usuario);
        const perfil = await respuesta.json();

        datos.innerHTML = `
            <img class="foto" src="${perfil.avatar_url}" alt="Foto de GitHub">
            <h3>${perfil.login}</h3>
            <p><strong>Repositorios públicos:</strong> ${perfil.public_repos}</p>
            <p><strong>Seguidores:</strong> ${perfil.followers}</p>
            <p><a href="${perfil.html_url}" target="_blank">Ver perfil de GitHub</a></p>
        `;

        const respuestaRepos = await fetch("https://api.github.com/users/" + usuario + "/repos");
        const repos = await respuestaRepos.json();

        reposGithub.innerHTML = "";

        repos.forEach(function (repo) {
            reposGithub.innerHTML += `
                <article class="proyecto">
                    <h3>${repo.name}</h3>
                    <p>${repo.description || "Sin descripción"}</p>
                    <p><strong>Lenguaje:</strong> ${repo.language || "No indicado"}</p>
                    <p><a href="${repo.html_url}" target="_blank">Abrir repositorio</a></p>
                </article>
            `;
        });
    } catch (error) {
        datos.innerHTML = "<p>No se han podido cargar los datos de GitHub.</p>";
    }
}

mostrarEstudios();
cargarGithub();

