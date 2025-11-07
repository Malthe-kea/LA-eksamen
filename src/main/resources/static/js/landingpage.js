

const app = document.getElementById("app");

app.innerHTML = "";

export async function renderPage() {

    loadStylesheet("/css/landingpageStyle.css");

    let movies;

    try {
        const response = await fetch("http://localhost:8080/api/v1/fires");
        if (!response.ok) {
            throw new Error("Fires not found");
        }
        movies = await response.json();
    } catch (err) {
        app.innerHTML = `<p>${err.message}</p>`;
        return;
    }

    // Clear app content
    app.innerHTML = "";

    // Append components
    app.appendChild(createHeader());

}

export function createHeader() {
    const header = document.createElement("header");
    header.className = "site-header";

    const logo = document.createElement("img");
    logo.className = "logo";
    logo.src ="/pictures/logo.png"

    }

    const nav = document.createElement("nav");
    const ul = document.createElement("ul");