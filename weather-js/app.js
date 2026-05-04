const kota = document.getElementById('location');
const button = document.getElementById('btn');

const nama = document.getElementById('nama');
const suhu = document.getElementById('suhu');
const cuaca = document.getElementById('cuaca');
const icon = document.getElementById('icon');
const errorText = document.getElementById('error');
const loading = document.getElementById('loading');

button.addEventListener('click', async () => {
  const dataKota = kota.value.trim();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${dataKota},ID&appid=173cb6886296822c55ffefbbcb6d895a&units=metric`;

  kota.value = '';
  kota.innerText = '';

  // loading

  loading.style.display = 'block';
  nama.innerText = "Loading...";
  suhu.innerText = "";
  cuaca.innerText = "";
  icon.src = "";

  try {
    const res = await fetch(url);
    const data = await res.json();
    loading.style.display = 'none';

    if (data.cod !== 200) {
      alert('Kota tidak ditemukan. Silakan coba lagi.');
      return;
    }

    const namaKota = data.name;
    const temp = data.main.temp;
    const desc = data.weather[0].description;
    const iconCode = data.weather[0].icon;

    const descText =
      desc.charAt(0).toUpperCase() + desc.slice(1);

    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    nama.innerText = namaKota;
    suhu.innerText = temp + "°C";
    cuaca.innerText = descText;
    icon.src = iconUrl;

  } catch (error) {
    console.error('Error fetching weather data:', error);
    alert('Terjadi kesalahan. Silakan coba lagi.');
    loading.style.display = 'none';
  }
});

kota.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    button.click();
  }
});