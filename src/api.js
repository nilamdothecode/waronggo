const BASE_URL = 'http://localhost:3000';

// Ambil menu dari backend
export async function fetchMenu() {
  const res = await fetch(`${BASE_URL}/menu`);
  const data = await res.json();
  return data;
}

// Ambil orders dari backend
export async function fetchOrders() {
  const res = await fetch(`${BASE_URL}/orders`);
  const data = await res.json();
  return data.map(item => ({
    ...item,
    price: parseFloat(item.price)  // ← tukar string jadi number
  }));;
}