import { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { turkeyProvinces } from "@/data/turkey-provinces";

interface TurkeyMapProps {
  onCitySelect: (cityPlate: number) => void;
}

// MapLibre GL için GeoJSON tipini tanımla
interface GeoJSONFeature {
  type: "Feature";
  properties: {
    id: number;
    name: string;
    plate: number;
  };
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
}

interface GeoJSONFeatureCollection {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}

const TurkeyMap: React.FC<TurkeyMapProps> = ({ onCitySelect }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [selectedCity, setSelectedCity] = useState<number | null>(null);
  // Haritanın yüklendiğini izlemek için eklendi
  const [mapLoaded, setMapLoaded] = useState(false);

  // Haritayı yükle
  useEffect(() => {
    if (map.current) return; // harita zaten başlatılmışsa, tekrar başlatma

    if (mapContainer.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
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
        },
        center: [35.5, 39], // Türkiye'nin merkezi
        zoom: 5.5,
      });

      map.current.on("load", () => {
        if (!map.current) return;

        setMapLoaded(true);

        // GeoJSON verisini ekle
        const geojsonData: GeoJSONFeatureCollection = {
          type: "FeatureCollection",
          features: turkeyProvinces.features.map((feature) => ({
            type: "Feature",
            properties: {
              id: feature.properties.id,
              name: feature.properties.name,
              plate: feature.properties.plate,
            },
            geometry: {
              type: "Point",
              coordinates: feature.geometry.coordinates as [number, number],
            },
          })),
        };

        // @ts-expect-error - maplibregl tiplemesi ile ilgili sorunları görmezden gel
        map.current.addSource("cities", {
          type: "geojson",
          data: geojsonData,
        });

        // Şehir noktalarını ekle
        map.current.addLayer({
          id: "cities-layer",
          type: "circle",
          source: "cities",
          paint: {
            "circle-radius": 8,
            "circle-color": "#3887be",
            "circle-stroke-width": 2,
            "circle-stroke-color": "#ffffff",
          },
        });

        // Şehir isimlerini ekle
        map.current.addLayer({
          id: "city-labels",
          type: "symbol",
          source: "cities",
          layout: {
            "text-field": ["get", "name"],
            "text-font": ["Open Sans Regular"],
            "text-offset": [0, 1.5],
            "text-anchor": "top",
            "text-size": 12,
          },
          paint: {
            "text-color": "#000000",
            "text-halo-color": "#ffffff",
            "text-halo-width": 1,
          },
        });

        // Şehirlere tıklama olayı ekle
        map.current.on("click", "cities-layer", (e) => {
          if (e.features && e.features.length > 0) {
            // Tıklama olayında varsayılan davranışı önle
            e.preventDefault();

            const feature = e.features[0];
            const props = feature.properties;

            if (props && props.plate) {
              const plateNo = props.plate;
              // Eğer zaten seçili değilse seçili yap
              if (plateNo !== selectedCity) {
                setSelectedCity(plateNo);
                onCitySelect(plateNo);
              }
            }
          }
        });

        // Fare imlecini değiştir
        map.current.on("mouseenter", "cities-layer", () => {
          if (map.current) {
            map.current.getCanvas().style.cursor = "pointer";
          }
        });

        map.current.on("mouseleave", "cities-layer", () => {
          if (map.current) {
            map.current.getCanvas().style.cursor = "";
          }
        });
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []); // onCitySelect'i dependency'den kaldırdık

  // Seçili şehri vurgula - harita yüklendikten sonra çalışsın
  useEffect(() => {
    if (!mapLoaded || !map.current || !map.current.isStyleLoaded()) return;

    // Seçili şehri vurgula
    map.current.setPaintProperty("cities-layer", "circle-color", [
      "case",
      ["==", ["get", "plate"], selectedCity],
      "#ff0000", // seçili şehir rengi
      "#3887be", // normal renk
    ]);
  }, [selectedCity, mapLoaded]);

  return (
    <div>
      <div
        ref={mapContainer}
        style={{ width: "100%", height: "500px", borderRadius: "8px" }}
      />
      {selectedCity && (
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <p>
            Seçili İl:{" "}
            {
              turkeyProvinces.features.find(
                (f) => f.properties.plate === selectedCity
              )?.properties.name
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default TurkeyMap;
