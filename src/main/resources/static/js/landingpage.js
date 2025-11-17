import { listOfAllFires, createFireForm } from "./fires.js";
import { listOfAllSirens} from "./sirens.js";



const app = document.getElementById("app");
renderPage();

export async function renderPage() {

    console.log("jeg er i render pager")
    app.innerHTML = "";
    const header = createHeader();
    app.appendChild(header);

    const firesLink = header.querySelector('a[href="#fires"]');
    firesLink.addEventListener("click", async (e) => {
        e.preventDefault();
        await showAllFires();
    });

    const sirensLink = header.querySelector('a[href="#sirens"]');
    sirensLink.addEventListener("click", async (e) => {
        e.preventDefault();
        await showAllSirens()
    })
}

async function showAllFires() {
    // Fjern evt. tidligere content, men behold header
    const oldContent = document.getElementById("fires-container") || document.getElementById("sirens-container") || document.getElementById("home-content");
    if (oldContent) oldContent.remove();

    // Opret container til brande
    const firesContainer = document.createElement("div");
    firesContainer.id = "fires-container";
    app.appendChild(firesContainer);

    // Opret form og liste
    createFireForm("fires-container", updateFiresList);
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

    const fireList = document.createElement("ul");
    fireList.id = "fires-list";
    fires.forEach(fire => {
        const li = document.createElement("li");
        li.textContent = `ID: ${fire.id}, Latitude: ${fire.latitude}, Longitude: ${fire.longitude}, Status: ${fire.status}, Time of registration ${fire.detectedAt}`;
        fireList.appendChild(li);
    });

    firesContainer.appendChild(fireList);
}

async function showAllSirens() {
    // Fjern evt. tidligere content, men behold header
    const oldContent = document.getElementById("fires-container") || document.getElementById("sirens-container") || document.getElementById("home-content");
    if (oldContent) oldContent.remove();

    // Opret container til sirener
    const sirensContainer = document.createElement("div");
    sirensContainer.id = "siren-container";
    app.appendChild(sirensContainer);

    // Hent og vis sirener
    await updateSirensList();
}

async function updateSirensList(){
    const sirensContainer = document.getElementById("siren-container");

    const oldList = document.getElementById("sirens-list");
    if (oldList) oldList.remove();

    const sirens = await listOfAllSirens();
    if (sirens.length === 0) {
        sirensContainer.innerHTML += `<p>Ingen registrerede sirener</p>`;
        return;
    }

    const sirensList = document.createElement("ul");
    sirensList.id = "sirens-list";
    sirens.forEach(siren => {
        const li = document.createElement("li");
        li.textContent = `ID: ${siren.id}, Latitude: ${siren.latitude}, Longitude: ${siren.longitude}, Status: ${siren.status}, Disabled: ${siren.disabled}`;
        sirensList.appendChild(li);
    });

    sirensContainer.appendChild(sirensList);
}

export function createHeader() {
    const header = document.createElement("header");
    header.className = "site-header";

    const logo = document.createElement("img");
    logo.className = "logo"; logo.src = "pictures/logo.png"; logo.alt = "Logo";

    const nav = document.createElement("nav");
    const ul = document.createElement("ul");
    ["Home", "About", "Fires", "Contact", "Sirens"].forEach(item => {
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
