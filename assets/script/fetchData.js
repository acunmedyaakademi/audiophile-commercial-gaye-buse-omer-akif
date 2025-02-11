export async function fetchData() {
  try {
    const response = await fetch("data.json"); // JSON dosyasının yolu
    if (!response.ok) throw new Error("Veri alınamadı!");

    const data = await response.json();
    return data; // Tüm ürünleri döndürüyoruz
  } catch (error) {
    console.error("Fetch hatası:", error);
    return [];
  }
}
