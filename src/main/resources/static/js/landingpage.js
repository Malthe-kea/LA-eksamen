import { listOfAllFires, createFireForm, updateFireStatus } from "./fires.js";
import { listOfAllSirens, createSirenForm} from "./sirens.js";



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
    // Fjern tidligere content
    const oldContent = document.getElementById("fires-container")
        || document.getElementById("siren-container")
        || document.getElementById("home-content");
    if (oldContent) oldContent.remove();

    // Container til formularen
    const createFireContainer = document.createElement("div");
    createFireContainer.id = "create-fire-container";
    app.appendChild(createFireContainer);

    // 🔥 Tilføj formularen inde i containeren
    createFireForm("create-fire-container", updateFiresList);

    // Brande container
    const firesContainer = document.createElement("div");
    firesContainer.id = "fires-container";
    app.appendChild(firesContainer);



    // Opdater listen
    await updateFiresList();
}


async function updateFiresList() {
    const firesContainer = document.getElementById("fires-container");

    const oldList = document.getElementById("fires-list");
    if (oldList) oldList.remove();

    const fires = await listOfAllFires();
    if (fires.length === 0) {
        firesContainer.innerHTML = `<p>Ingen aktive brande lige nu.</p>`;
        return;
    }

    const fireList = document.createElement("ul");
    fireList.id = "fires-list";

    fires.forEach(fire => {
        const li = document.createElement("li");

        const fields = [
            {label: 'ID', value: fire.id},
            {label: 'Latitude', value: fire.latitude},
            {label: 'Longitude', value: fire.longitude},
            {label: 'Status', value: fire.status},
            {label: 'Tidspunkt', value: fire.detectedAt}
        ];

        fields.forEach(f => {
            const fieldDiv = document.createElement('div');
            fieldDiv.classList.add('fire-field');

            const labelSpan = document.createElement('span');
            labelSpan.classList.add('fire-label');
            labelSpan.textContent = f.label + ":";

            const valueSpan = document.createElement('span');
            valueSpan.classList.add('fire-value');
            valueSpan.textContent = f.value;

            fieldDiv.appendChild(labelSpan);
            fieldDiv.appendChild(valueSpan);
            li.appendChild(fieldDiv);
        });

        // Dropdown til status opdatering
        const statusSelect = document.createElement("select");
        ["ACTIVE", "CLOSED"].forEach(status => {
            const option = document.createElement("option");
            option.value = status;
            option.textContent = status;
            if (fire.status === status) option.selected = true;
            statusSelect.appendChild(option);
        });

        // Opdater-knap
        const updateBtn = document.createElement("button");
        updateBtn.textContent = "Opdater";

        updateBtn.addEventListener("click", async () => {
            const success = await updateFireStatus(fire, statusSelect.value);
            if (success) {
                alert(`Brand ID ${fire.id} opdateret!`);
                await updateFiresList();
            } else {
                alert(`Kunne ikke opdatere brand ID ${fire.id}`);
            }
        });

        li.appendChild(statusSelect);
        li.appendChild(updateBtn);
        fireList.appendChild(li);
    });

    firesContainer.appendChild(fireList);
}


async function showAllSirens() {
    // Fjern evt. tidligere content, men behold header
    const oldCreateForm = document.getElementById("create-siren-container");
    const oldList = document.getElementById("siren-container");
    if (oldCreateForm) oldCreateForm.remove();
    if (oldList) oldList.remove();

    // Container til oprettelsesformular
    const createSirenContainer = document.createElement("div");
    createSirenContainer.id = "create-siren-container";
    app.appendChild(createSirenContainer);

    // Tilføj formularen
    createSirenForm('create-siren-container', updateSirensList);

    // Container til listen af sirener
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
