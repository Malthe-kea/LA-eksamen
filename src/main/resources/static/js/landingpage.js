const app = document.getElementById("app");

renderPage();

export async function renderPage() {

    console.log("Jeg er i renderPage")
    app.innerHTML = "";
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

    // Logo
    const logo = document.createElement("img");
    logo.className = "logo";
    logo.src = "/pictures/logo.png";
    logo.alt = "Site Logo";

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

    // Return header to be appended to the page
    return header;
}
