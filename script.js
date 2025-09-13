// Initialize map
const map = L.map("map").setView([28.6139, 77.2090], 12); // Default: New Delhi

// Add OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// Example bus data (simulated live updates)
let buses = [
  { id: "Bus 101", lat: 28.6139, lng: 77.2090, route: "Connaught Place - Dwarka" },
  { id: "Bus 202", lat: 28.7041, lng: 77.1025, route: "ISBT - Noida City Centre" },
  { id: "Bus 303", lat: 28.5355, lng: 77.3910, route: "Gurgaon - Greater Noida" },
];

// Create markers for buses
let markers = {};
buses.forEach((bus) => {
  let marker = L.marker([bus.lat, bus.lng]).addTo(map)
    .bindPopup(`<b>${bus.id}</b><br>Route: ${bus.route}`);
  markers[bus.id] = marker;
});

// Show bus list on right panel
function updateBusList() {
  const list = document.getElementById("bus-list");
  list.innerHTML = "";
  buses.forEach((bus) => {
    let li = document.createElement("li");
    li.innerHTML = `<strong>${bus.id}</strong><br>Route: ${bus.route}`;
    list.appendChild(li);
  });
}
updateBusList();

// Simulate buses moving every 5 sec
setInterval(() => {
  buses = buses.map((bus) => {
    let newLat = bus.lat + (Math.random() - 0.5) * 0.01;
    let newLng = bus.lng + (Math.random() - 0.5) * 0.01;
    markers[bus.id].setLatLng([newLat, newLng]);
    return { ...bus, lat: newLat, lng: newLng };
  });
}, 5000);
