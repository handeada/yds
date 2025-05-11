import { useRef, useEffect, useState, useCallback } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { turkeyProvinces } from "@/constants/turkey-provinces";
import { MAP_CONFIG } from "@/constants/map-config";
import { getSelectedCity, selectCity } from "@/store/map";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/hooks/useAppDispatch";

// MapLibre GL için GeoJSON tipini tanımla
type GeoJSONFeature = {
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
};

type GeoJSONFeatureCollection = {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
};

const TurkeyMap = () => {
  const dispatch = useAppDispatch();
  const { selectedCityPlate } = useSelector(getSelectedCity);

  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const popup = useRef<maplibregl.Popup | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  // GeoJSON verilerini oluştur
  const createGeoJSONData = useCallback((): GeoJSONFeatureCollection => {
    return {
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
  }, []);

  // Şehir tıklama olayını işle
  const handleCityClick = useCallback(
    (
      e: maplibregl.MapMouseEvent & {
        features?: maplibregl.MapGeoJSONFeature[];
      }
    ) => {
      if (e.features && e.features.length > 0) {
        e.preventDefault();
        const feature = e.features[0];
        const props = feature.properties;

        if (props && props.plate) {
          dispatch(selectCity({ plate: props.plate, name: props.name }));
        }
      }
    },
    [dispatch]
  );

  // Fare imlecini değiştirme ve popup gösterme/gizleme olayları
  const setupMouseInteractions = useCallback((mapInstance: maplibregl.Map) => {
    // Popup oluştur
    popup.current = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: 10,
      className: "map-city-popup",
    });

    // Şehir üzerine gelindiğinde
    mapInstance.on("mouseenter", "cities-layer", (e) => {
      // Mouse'un üzerinde olduğu özelliği al
      if (e.features && e.features.length > 0) {
        const feature = e.features[0];
        // MapLibre GeoJSON özelliklerine uygun bir tip dönüşümü yapılıyor
        const pointGeometry = feature.geometry as {
          type: string;
          coordinates: number[];
        };
        const coordinates = pointGeometry.coordinates.slice() as [
          number,
          number
        ];
        const cityName = feature.properties.name;

        // Popup'ı göster
        popup.current
          ?.setLngLat(coordinates)
          .setHTML(`<div class="city-popup">${cityName}</div>`)
          .addTo(mapInstance);
      }
    });

    // Şehir üzerinden ayrıldığında
    mapInstance.on("mouseleave", "cities-layer", () => {
      // Popup'ı kaldır
      popup.current?.remove();
    });
  }, []);

  // Harita katmanlarını oluştur
  const setupMapLayers = useCallback(
    (mapInstance: maplibregl.Map) => {
      const geojsonData = createGeoJSONData();

      // Veri kaynağını ekle
      mapInstance.addSource("cities", {
        type: "geojson",
        data: geojsonData,
      } as maplibregl.GeoJSONSourceSpecification);

      // Şehir noktaları katmanı
      mapInstance.addLayer({
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

      // Şehir isimleri katmanı
      mapInstance.addLayer({
        id: "city-labels",
        type: "symbol",
        source: "cities",
        layout: {
          "text-field": ["get", "name"],
          "text-font": ["Noto Sans Regular"],
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

      // Tıklama olayını ekle
      mapInstance.on("click", "cities-layer", handleCityClick);

      // Fare etkileşimlerini ekle
      setupMouseInteractions(mapInstance);
    },
    [createGeoJSONData, handleCityClick, setupMouseInteractions]
  );

  // Seçili şehri vurgula
  const highlightSelectedCity = useCallback(
    (mapInstance: maplibregl.Map, cityPlate: number | null) => {
      if (!mapInstance.isStyleLoaded()) return;

      if (cityPlate) {
        mapInstance.setPaintProperty("cities-layer", "circle-color", [
          "case",
          ["==", ["get", "plate"], cityPlate],
          "#ff0000", // seçili şehir rengi
          "#3887be", // normal renk
        ]);
      } else {
        // Pop-up kapandığında tüm şehirleri normal renge geri döndür
        mapInstance.setPaintProperty("cities-layer", "circle-color", "#3887be");
      }
    },
    []
  );

  // Container boyutlarını izle
  useEffect(() => {
    if (!mapContainer.current) return;

    const observer = new ResizeObserver((entries) => {
      if (entries.length > 0) {
        const { width, height } = entries[0].contentRect;
        setContainerWidth(width);
        setContainerHeight(height);
      }
    });

    observer.observe(mapContainer.current);
    return () => observer.disconnect();
  }, []);

  // Haritayı başlat
  useEffect(() => {
    // Harita zaten başlatılmışsa, tekrar başlatma
    if (map.current) return;

    // Harita konteynerı yoksa, oluşturma
    if (!mapContainer.current) return;

    // Haritayı oluştur
    const mapInstance = new maplibregl.Map({
      container: mapContainer.current,
      style: MAP_CONFIG.style as maplibregl.StyleSpecification,
      center: MAP_CONFIG.center,
      zoom: MAP_CONFIG.zoom,
    });

    // Harita referansını kaydet
    map.current = mapInstance;

    // Harita yüklendiğinde katmanları ekle
    mapInstance.on("load", () => {
      setMapLoaded(true);
      setupMapLayers(mapInstance);
    });

    // Temizleme fonksiyonu
    return () => {
      mapInstance.remove();
      map.current = null;
    };
  }, [setupMapLayers]);

  // Seçili şehri vurgula - harita yüklendikten sonra çalışsın
  useEffect(() => {
    if (!mapLoaded || !map.current) return;
    highlightSelectedCity(map.current, selectedCityPlate);
  }, [selectedCityPlate, mapLoaded, highlightSelectedCity]);

  // Container boyutu değişikliklerini işle
  useEffect(() => {
    if (containerWidth > 0 && containerHeight > 0 && map.current && mapLoaded) {
      map.current.resize();

      // Ekran boyutuna göre zoom seviyesini ayarla
      const newZoom =
        containerWidth < MAP_CONFIG.mobileBreakpoint
          ? MAP_CONFIG.mobileZoom
          : MAP_CONFIG.zoom;

      map.current.setZoom(newZoom);
    }
  }, [containerWidth, containerHeight, mapLoaded]);

  const getSelectedCityName = () => {
    if (!selectedCityPlate) return null;
    return turkeyProvinces.features.find(
      (f) => f.properties.plate === selectedCityPlate
    )?.properties.name;
  };

  return (
    <div className="h-full">
      <div
        ref={mapContainer}
        className="w-full h-full rounded-md overflow-hidden"
      />
      <style jsx global>{`
        .map-city-popup {
          z-index: 1000;
        }
        .city-popup {
          padding: 4px 8px;
          background: white;
          color: black;
          border-radius: 4px;
          font-weight: bold;
          pointer-events: none;
          white-space: nowrap;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .maplibregl-popup-content {
          padding: 0 !important;
          background: transparent !important;
          box-shadow: none !important;
          border: none !important;
        }
        .maplibregl-popup-tip {
          display: none !important;
        }
      `}</style>
      {selectedCityPlate && (
        <div className="mt-3 text-center">
          <p className="text-sm md:text-base">
            Seçili İl:{" "}
            <span className="font-semibold text-primary-600">
              {getSelectedCityName()}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

TurkeyMap.displayName = "TurkeyMap";

export default TurkeyMap;
