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