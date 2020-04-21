const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';


export async function getAllBars () {
  const response = await fetch(`${API_URL}/bars`);
  return response.json();
};

export async function getFilteredBars (filter) {
  const response = await fetch(`${API_URL}/bars/filter/${filter}`);
  return response.json();
};


export async function createBar (bar) {
  const response = await fetch(`${API_URL}/bars`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(bar),
  });
  return response.json();
};

export async function updateBar (beer, barId) {
  const response = await fetch(`${API_URL}/bars/${barId}/update`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(beer),
  });
  return response.json();
};