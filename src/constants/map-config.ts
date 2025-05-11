export const MAP_CONFIG = {
  center: [35.5, 38.7] as [number, number], // Türkiye'nin merkezi
  zoom: 5.2,
  mobileZoom: 4.5,
  mobileBreakpoint: 640, // Mobil görünüm için genişlik eşiği
  style: {
    version: 8,
    sources: {
      osm: {
        type: "raster",
        tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
        tileSize: 256,
        attribution: "&copy; OpenStreetMap Contributors",
      },
    },
    layers: [
      {
        id: "osm",
        type: "raster",
        source: "osm",
        minzoom: 0,
        maxzoom: 19,
      },
    ],
    glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
  },
};
