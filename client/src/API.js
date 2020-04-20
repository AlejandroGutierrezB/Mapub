const API_URL = 'http://localhost:3001';


export async function getAllBars() {
  const response = await fetch(`${API_URL}/bars`);
  return response.json();
};

export async function createBar(element) {
  const response = await fetch(`${API_URL}/bars`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(element),
  });
  return response.json();
};