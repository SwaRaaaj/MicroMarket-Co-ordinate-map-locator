const express = require('express');
const app = express();

const microMarkets = [
  { name: 'Koramangala', minLat: 12.9166, maxLat: 12.9629, minLng: 77.6057, maxLng: 77.6418 },
  { name: 'Indiranagar', minLat: 12.9612, maxLat: 12.9829, minLng: 77.6125, maxLng: 77.6495 },
  { name: 'Whitefield', minLat: 12.9615, maxLat: 12.9914, minLng: 77.7046, maxLng: 77.7626 },
  { name: 'Electronic City', minLat: 12.8322, maxLat: 12.8894, minLng: 77.6444, maxLng: 77.7088 },
  { name: 'HSR Layout', minLat: 12.8937, maxLat: 12.9247, minLng: 77.6236, maxLng: 77.6582 },
  { name: 'Jayanagar', minLat: 12.9111, maxLat: 12.9382, minLng: 77.5781, maxLng: 77.6188 },
  { name: 'Marathahalli', minLat: 12.9105, maxLat: 12.9714, minLng: 77.6936, maxLng: 77.7206 },
  { name: 'BTM Layout', minLat: 12.9077, maxLat: 12.9423, minLng: 77.5935, maxLng: 77.6265 },
  { name: 'Bannerghatta Road', minLat: 12.8576, maxLat: 12.9148, minLng: 77.5881, maxLng: 77.6356 },
  { name: 'Hebbal', minLat: 13.0218, maxLat: 13.0733, minLng: 77.5776, maxLng: 77.6198 }
];

app.get('/api/micromarket', (req, res) => {
  const latitude = parseFloat(req.query.latitude);
  const longitude = parseFloat(req.query.longitude);
  const microMarket = findMicroMarket(latitude, longitude);
  if (microMarket) {
    res.json({ microMarket: microMarket.name });
  } else {
    res.status(404).json({ error: 'Coordinates not found in any micro market' });
  }
});

function findMicroMarket(latitude, longitude) {
  for (const market of microMarkets) {
    if (latitude >= market.minLat && latitude <= market.maxLat &&
        longitude >= market.minLng && longitude <= market.maxLng) {
      return market;
    }
  }
  return null; // No micro market found
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
