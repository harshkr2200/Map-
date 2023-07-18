// #########################variables start################################
const ul = document.querySelector(".hotel_list");
// #########################variables end################################

const myMap = L.map("map").setView([22.9074872, 79.07306671], 5);
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> Harsh❤️';
const tileLayer = L.tileLayer(tileUrl, { attribution });
tileLayer.addTo(myMap);
// #########################functions start################################
const generatHotelList = () => {
  storeList.forEach((Shop) => {
    const li = document.createElement("li");
    const div = document.createElement("div");
    const p = document.createElement("p");
    const a = document.createElement("a");
    a.addEventListener("click", (event) => flyToHotel(Shop));
    div.classList.add("hotel_detail");
    a.innerHTML = Shop.properties.name;
    a.href = "#";
    p.innerHTML = Shop.properties.address;

    div.appendChild(a);
    div.appendChild(p);
    li.appendChild(div);
    ul.appendChild(li);
  });
};
generatHotelList();

const shopsLayer = L.geoJSON(storeList, {
  onEachFeature: (feature, layer) => {
    layer.bindPopup(feature.properties.name);
  },

  pointToLayer: (feature, latlng) => {
    return L.marker(latlng);
  },
});
shopsLayer.addTo(myMap);

const flyToHotel = (Shop) => {
  myMap.flyTo(
    [Shop.geometry.coordinates[1], Shop.geometry.coordinates[0]],
    14,
    {
      animate: true,
      duration: 1,
    }
  );
};
