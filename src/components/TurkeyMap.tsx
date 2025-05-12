import { useRef, useEffect, useState, useCallback } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { turkeyProvinces } from "@/constants/turkey-provinces";
import { MAP_CONFIG } from "@/constants/map-config";
import { getSelectedCity, selectCity } from "@/store/map";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/hooks/useAppDispatch";

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

  const setupMouseInteractions = useCallback((mapInstance: maplibregl.Map) => {
    popup.current = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: 10,
      className: "map-city-popup",
    });

    mapInstance.on("mouseenter", "cities-layer", (e) => {
      if (e.features && e.features.length > 0) {
        const feature = e.features[0];
        const pointGeometry = feature.geometry as {
          type: string;
          coordinates: number[];
        };
        const coordinates = pointGeometry.coordinates.slice() as [
          number,
          number
        ];
        const cityName = feature.properties.name;

        popup.current
          ?.setLngLat(coordinates)
          .setHTML(`<div class="city-popup">${cityName}</div>`)
          .addTo(mapInstance);
      }
    });

    mapInstance.on("mouseleave", "cities-layer", () => {
      popup.current?.remove();
    });
  }, []);

  const setupMapLayers = useCallback(
    (mapInstance: maplibregl.Map) => {
      const geojsonData = createGeoJSONData();

      mapInstance.addSource("cities", {
        type: "geojson",
        data: geojsonData,
      } as maplibregl.GeoJSONSourceSpecification);

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

      mapInstance.on("click", "cities-layer", handleCityClick);

      setupMouseInteractions(mapInstance);
    },
    [createGeoJSONData, handleCityClick, setupMouseInteractions]
  );

  const highlightSelectedCity = useCallback(
    (mapInstance: maplibregl.Map, cityPlate: number | null) => {
      if (!mapInstance.isStyleLoaded()) return;

      if (cityPlate) {
        mapInstance.setPaintProperty("cities-layer", "circle-color", [
          "case",
          ["==", ["get", "plate"], cityPlate],
          "#ff0000",
          "#3887be",
        ]);
      } else {
        mapInstance.setPaintProperty("cities-layer", "circle-color", "#3887be");
      }
    },
    []
  );

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

  useEffect(() => {
    if (map.current) return;

    if (!mapContainer.current) return;

    const mapInstance = new maplibregl.Map({
      container: mapContainer.current,
      style: MAP_CONFIG.style as maplibregl.StyleSpecification,
      center: MAP_CONFIG.center,
      zoom: MAP_CONFIG.zoom,
    });

    map.current = mapInstance;

    mapInstance.on("load", () => {
      setMapLoaded(true);
      setupMapLayers(mapInstance);
    });

    return () => {
      mapInstance.remove();
      map.current = null;
    };
  }, [setupMapLayers]);

  useEffect(() => {
    if (!mapLoaded || !map.current) return;
    highlightSelectedCity(map.current, selectedCityPlate);
  }, [selectedCityPlate, mapLoaded, highlightSelectedCity]);

  useEffect(() => {
    if (containerWidth > 0 && containerHeight > 0 && map.current && mapLoaded) {
      map.current.resize();

      const isMobile = containerWidth <= MAP_CONFIG.mobileBreakpoint;
      const newZoom = isMobile ? MAP_CONFIG.mobileZoom : MAP_CONFIG.zoom;

      if (map.current.getZoom() !== newZoom) {
        map.current.setZoom(newZoom);
      }
    }
  }, [containerWidth, containerHeight, mapLoaded]);

  const getSelectedCityName = () => {
    if (!selectedCityPlate) return null;
    const feature = turkeyProvinces.features.find(
      (f) => f.properties.plate === selectedCityPlate
    );
    return feature ? feature.properties.name : null;
  };

  return (
    <div className="relative w-full h-full">
      <div
        ref={mapContainer}
        className="map-container w-full h-full rounded-md overflow-hidden"
      />
      {selectedCityPlate && (
        <div className="absolute top-2 right-2 bg-white py-1 px-2 rounded-md shadow text-sm">
          {getSelectedCityName()}
        </div>
      )}
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
    </div>
  );
};

TurkeyMap.displayName = "TurkeyMap";

export default TurkeyMap;
