export const fetchData = async (type, data) => {
    const response = await fetch(`http://localhost:5000/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return await response.json();
}
