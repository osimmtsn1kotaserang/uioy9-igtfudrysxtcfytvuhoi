let totalIsi = localStorage.getItem("totalIsi") || 0; // simulasi lokal

function updateStatus() {
  const form = document.getElementById("kuesioner");
  const status = document.getElementById("status");
  const progress = document.getElementById("progress");

  const sisa = 25 - totalIsi;
  const persen = (totalIsi / 25) * 100;
  progress.style.width = persen + "%";

  if (totalIsi >= 25) {
    form.querySelectorAll("input, textarea, button").forEach(el => el.disabled = true);
    status.textContent = "❌ Kuota penuh! Maksimal 25 kelompok.";
    status.style.color = "red";
  } else {
    status.textContent = `Kuota tersisa: ${sisa} dari 25 kelompok`;
    status.style.color = "#333";
  }
}

document.getElementById("kuesioner").addEventListener("submit", async (e) => {
  e.preventDefault();

  if (totalIsi >= 25) {
    alert("Kuota sudah penuh!");
    return;
  }

  const data = new FormData(e.target);
  try {
    const res = await fetch(e.target.action, {
      method: e.target.method,
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      totalIsi++;
      localStorage.setItem("totalIsi", totalIsi);
      alert("✅ Data berhasil dikirim!");
      e.target.reset();
      updateStatus();
    } else {
      alert("Gagal mengirim data, coba lagi.");
    }
  } catch (err) {
    alert("Terjadi kesalahan koneksi.");
  }
});

updateStatus();