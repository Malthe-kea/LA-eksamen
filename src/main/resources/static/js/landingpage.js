import { listOfAllFires, createFireForm } from "./fires.js";

const app = document.getElementById("app");
renderPage();

export async function renderPage() {
    app.innerHTML = "";
    const header = createHeader();
    app.appendChild(header);

    const firesLink = header.querySelector('a[href="#fires"]');
    firesLink.addEventListener("click", async (e) => {
        e.preventDefault();
        await showAllFires();
    });
}

async function showAllFires() {
    app.innerHTML = "";
    app.appendChild(createHeader());

    const firesContainer = document.createElement("div");
    firesContainer.id = "fires-container";
    app.appendChild(firesContainer);

    createFireForm("fires-container", updateFiresList); // passer updateFiresList som callback
    await updateFiresList();
}

async function updateFiresList() {
    const firesContainer = document.getElementById("fires-container");

    const oldList = document.getElementById("fires-list");
    if (oldList) oldList.remove();

    const fires = await listOfAllFires();
    if (fires.length === 0) {
        firesContainer.innerHTML += `<p>Ingen aktive brande lige nu.</p>`;
        return;
    }

    const list = document.createElement("ul");
    list.id = "fires-list";
    fires.forEach(fire => {
        const li = document.createElement("li");
        li.textContent = `ID: ${fire.id}, Latitude: ${fire.latitude}, Longitude: ${fire.longitude}, Status: ${fire.status}`;
        list.appendChild(li);
    });

    firesContainer.appendChild(list);
}

export function createHeader() {
    const header = document.createElement("header");
    header.className = "site-header";

    const logo = document.createElement("img");
    logo.className = "logo"; logo.src = "pictures/logo.png"; logo.alt = "Logo";

    const nav = document.createElement("nav");
    const ul = document.createElement("ul");
    ["Home", "About", "Fires", "Contact"].forEach(item => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = `#${item.toLowerCase()}`; a.textContent = item;
        li.appendChild(a); ul.appendChild(li);
    });

    nav.appendChild(ul);
    header.appendChild(logo);
    header.appendChild(nav);
    return header;
}
