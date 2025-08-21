mapboxgl.accessToken = mapToken;

let map;

function initMap() {
  // Check for desktop map
  const desktopMap = document.getElementById("map");
  // Check for mobile map
  const mobileMap = document.getElementById("map-mobile");
  
  // Determine which map container to use based on what's visible
  let mapContainer;
  
  if (window.innerWidth <= 430 && mobileMap) {
    mapContainer = mobileMap;
    console.log("Using mobile map container");
  } else if (desktopMap) {
    mapContainer = desktopMap;
    console.log("Using desktop map container");
  }

  if (mapContainer && listing && listing.geometry && listing.geometry.coordinates) {
    console.log("Creating map in container:", mapContainer.id);
    map = new mapboxgl.Map({
      container: mapContainer,  // Use the DOM element directly, not the ID
      style: "mapbox://styles/mapbox/streets-v12",
      center: listing.geometry.coordinates,
      zoom: 10,
    });

    new mapboxgl.Marker({ color: "red" })
      .setLngLat(listing.geometry.coordinates)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<h4>${listing.title}</h4>
           <p>Exact location will be provided after booking</p>`
        )
      )
      .addTo(map);

    // Force resize after initialization
    setTimeout(() => {
      if (map) {
        console.log("Resizing map");
        map.resize();
      }
    }, 500);
  } else {
    console.error("Map container not found or listing data missing");
    console.log("Map container:", mapContainer);
    console.log("Listing data:", listing);
  }
}

// Run after page fully loaded
window.addEventListener("load", initMap);

// Handle viewport changes
window.addEventListener("resize", () => {
  if (map) {
    console.log("Window resized, resizing map");
    
    // Need to reinitialize the map on layout changes
    if ((window.innerWidth <= 430 && map.getContainer().id === "map") || 
        (window.innerWidth > 430 && map.getContainer().id === "map-mobile")) {
      console.log("Viewport switch detected, reinitializing map");
      map.remove();
      initMap();
    } else {
      map.resize();
    }
  }
});