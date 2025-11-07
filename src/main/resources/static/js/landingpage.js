import { listOfAllFires } from "./fires.js";

const app = document.getElementById("app");
renderPage();

export async function renderPage() {

    app.innerHTML = "";

    console.log("Jeg er i renderPage");

    // Append header
    const header = createHeader();
    app.appendChild(header);

    // Tilføj klik-event på Fires-nav
    const firesLink = header.querySelector('a[href="#fires"]');
    firesLink.addEventListener("click", async (e) => {
        e.preventDefault(); // undgå scroll til #fires
        await showAllFires();
    });
}

// Funktion til at hente og vise alle fires
async function showAllFires() {
    app.innerHTML = ""; // clear previous content
    app.appendChild(createHeader()); // beholder header

    let fires;
    try {
        fires = await listOfAllFires();
    } catch (err) {
        app.innerHTML += `<p>Fejl ved hentning af brande: ${err.message}</p>`;
        return;
    }

    if (fires.length === 0) {
        app.innerHTML += `<p>Ingen aktive brande lige nu.</p>`;
        return;
    }

    const list = document.createElement("ul");
    fires.forEach(fire => {
        const li = document.createElement("li");
        li.textContent = `ID: ${fire.id}, Location: ${fire.location}, Status: ${fire.status}`;
        list.appendChild(li);
    });

    app.appendChild(list);
}

export function createHeader() {
    const header = document.createElement("header");
    header.className = "site-header";

    // Logo
    const logo = document.createElement("img");
    logo.className = "logo";
    logo.src = "pictures/logo.png";
    logo.alt = "Logo";

    // Navigation
    const nav = document.createElement("nav");
    const ul = document.createElement("ul");

    const navItems = ["Home", "About", "Fires", "Contact"];

    navItems.forEach(item => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = `#${item.toLowerCase()}`;
        a.textContent = item;
        li.appendChild(a);
        ul.appendChild(li);
    });

    nav.appendChild(ul);

    // Assemble header
    header.appendChild(logo);
    header.appendChild(nav);

    return header;
}
