const API_URL = 'http://localhost:3001';


export async function getAllBars() {
  const response = await fetch(`${API_URL}/bars`);
  return response.json();
};