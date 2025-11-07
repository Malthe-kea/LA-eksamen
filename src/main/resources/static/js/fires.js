export async function listOfAllFires() {
    try {
        const response = await fetch('http://localhost:8080/api/v1/fires', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error(`HTTP-fejl! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Fejl ved hentning af brande:', error);
        return [];
    }
}

export async function addFire(fire) {
    try {
        const response = await fetch('http://localhost:8080/api/v1/fires', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fire),
        });

        if (!response.ok) {
            throw new Error(`HTTP-fejl! Status: ${response.status}`);
        }

        return true;
    } catch (error) {
        console.error('Fejl ved tilføjelse af brand:', error);
        return false;
    }
}

// Funktion til at oprette formularen dynamisk
export function createFireForm(containerId, onSuccess) {
    const container = document.getElementById(containerId);
    if (!container) return console.error(`Container med id '${containerId}' findes ikke!`);

    const form = document.createElement('form');

    const latInput = document.createElement('input');
    latInput.type = 'number'; latInput.step = 'any'; latInput.required = true;

    const lonInput = document.createElement('input');
    lonInput.type = 'number'; lonInput.step = 'any'; lonInput.required = true;

    const statusSelect = document.createElement('select');
    ['ACTIVE', 'CLOSED'].forEach(status => {
        const option = document.createElement('option');
        option.value = status; option.textContent = status;
        statusSelect.appendChild(option);
    });

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit'; submitBtn.textContent = 'Tilføj brand';

    const resultDiv = document.createElement('div');

    form.append(
        createLabel('Latitude: '), latInput, document.createElement('br'),
        createLabel('Longitude: '), lonInput, document.createElement('br'),
        createLabel('Status: '), statusSelect, document.createElement('br'),
        submitBtn
    );

    container.appendChild(form);
    container.appendChild(resultDiv);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fire = {
            latitude: parseFloat(latInput.value),
            longitude: parseFloat(lonInput.value),
            detectedAt: new Date().toISOString(),
            status: statusSelect.value,
            closedAt: null
        };
        const success = await addFire(fire);
        resultDiv.textContent = success ? 'Brand registreret!' : 'Fejl ved registrering af brand.';
        if (success && onSuccess) onSuccess();  // opdater listen
    });

    function createLabel(text) {
        const label = document.createElement('label');
        label.textContent = text;
        return label;
    }
}
