export async function listOfAllSirens() {
    try {
        const response = await fetch('http://localhost:8080/api/v1/sirens', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error(`HTTP-fejl! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Fejl ved hentning af sirener:', error);
        return [];
    }
}

function createLabel(text) {
    const label = document.createElement('label');
    label.textContent = text;
    return label;
}

export function createSirenForm(containerId, onSuccess) {
    const container = document.getElementById(containerId);
    if (!container) return console.error(`Container med id '${containerId}' findes ikke!`);

    const form = document.createElement('form');

    // --- Inputs ---
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.required = true;

    const latInput = document.createElement('input');
    latInput.type = 'number';
    latInput.step = 'any';
    latInput.required = true;

    const lonInput = document.createElement('input');
    lonInput.type = 'number';
    lonInput.step = 'any';
    lonInput.required = true;

    const statusSelect = document.createElement('select');
    ['ALERT', 'SAFE'].forEach(status => {
        const option = document.createElement('option');
        option.value = status;
        option.textContent = status;
        statusSelect.appendChild(option);
    });


    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Tilføj sirene';

    const resultDiv = document.createElement('div');

    // --- Tilføj elementer til form ---
    form.append(
        createLabel('Navn: '), nameInput, document.createElement('br'),
        createLabel('Latitude: '), latInput, document.createElement('br'),
        createLabel('Longitude: '), lonInput, document.createElement('br'),
        createLabel('Status: '), statusSelect, document.createElement('br'),
        submitBtn
    );

    container.appendChild(form);
    container.appendChild(resultDiv);

    // --- Submit event ---
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const siren = {
            name: nameInput.value,
            latitude: parseFloat(latInput.value),
            longitude: parseFloat(lonInput.value),
            status: statusSelect.value,
        };

        try {
            const response = await fetch('http://localhost:8080/api/v1/sirens', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(siren)
            });

            if (response.ok) {
                resultDiv.textContent = 'Sirene registreret!';
                if (onSuccess) onSuccess();
            } else {
                resultDiv.textContent = 'Fejl ved registrering af sirene.';
            }
        } catch (err) {
            console.error(err);
            resultDiv.textContent = 'Fejl ved registrering af sirene.';
        }
    });
}

export async function deleteSiren(id) {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/sirens/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Kunne ikke slette sirenen");
        }

        const result = await response.text();
        console.log(result);
        alert(result); // valgfrit
    } catch (error) {
        console.error(error);
        alert("Fejl ved sletning af sirene");
    }
}

