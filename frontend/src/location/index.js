import React, { useState, useEffect } from "react";
import axios from "axios";
import L from "leaflet";

const ClientLocationMap = () => {
  const [clientLocation, setClientLocation] = useState(null);

  useEffect(() => {
    function getClientIP() {
      return fetch("https://api64.ipify.org?format=json")
        .then((response) => response.json())
        .then((data) => data.ip)
        .catch((error) => console.error("Error fetching IP:", error));
    }

    // Function to fetch geolocation based on IP address using ipinfo.io
    function getGeoLocation(ip) {
      return fetch("https://ipinfo.io/" + ip + "/json")
        .then((response) => response.json())
        .then((data) => data.loc.split(",").map(parseFloat))
        .catch((error) => console.error("Error fetching location:", error));
    }

    // Initialize the map
    var map = L.map("map").setView([0, 0], 2); // Initial center and zoom level

    // Add OpenStreetMap tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Fetch client IP and geolocation, then display on the map
    getClientIP().then((ip) => {
      getGeoLocation(ip).then((coords) => {
        var marker = L.marker(coords).addTo(map);
        marker.bindPopup("Client IP: " + ip).openPopup();
        map.setView(coords, 12); // Set map center and zoom level
      });
    });
  }, [clientLocation]);

  return <div id="map" style={{ height: "500px" }}></div>;
};

export default ClientLocationMap;
