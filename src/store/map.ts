import { TAB_TITLES } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MapState {
  selectedCityPlate: number | null;
  selectedCityName: string | null;
  activeTab: number;
}

const initialState: MapState = {
  selectedCityPlate: null,
  selectedCityName: null,
  activeTab: TAB_TITLES.statistics.value,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  selectors: {
    getSelectedCity: (state) => state,
  },
  reducers: {
    selectCity: (
      state,
      action: PayloadAction<{ plate: number; name: string }>
    ) => {
      state.selectedCityPlate = action.payload.plate;
      state.selectedCityName = action.payload.name;
    },
    selectTab: (state, action: PayloadAction<number>) => {
      state.activeTab = action.payload;
    },
    clearSelection: () => {
      return { ...initialState };
    },
    closeSidebar: () => {
      return { ...initialState };
    },
  },
});

export const { selectCity, clearSelection, closeSidebar, selectTab } =
  mapSlice.actions;

export const { getSelectedCity } = mapSlice.selectors;

export default mapSlice;
