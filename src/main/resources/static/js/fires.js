export async function listOfAllFires() {
    try {
        const response = await fetch('http://localhost:8080/api/v1/fires', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP-fejl! Status: ${response.status}`);
        }

        const fires = await response.json();
            return fires;

    } catch (error) {
        console.error('Fejl ved hentning af brande:', error);
        return [];
    }

}
