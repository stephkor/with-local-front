import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface LocationState {
  currentLocation: string;
  selectedLocation?: string;
}

const initialState = {
  currentLocation: "",
  selectedLocation: "",
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setCurrentLocation: (draft, action: PayloadAction<LocationState>) => {
      return {
        currentLocation: action.payload,
        selectedLocation: draft.selectedLocation,
      };
    },
    setSelectedLocation(draft, action: PayloadAction<LocationState>) {
      return {
        currentLocation: draft.currentLocation,
        selectedLocation: action.payload,
      };
    },
  },
});

export const { setCurrentLocation, setSelectedLocation } =
  locationSlice.actions;

export default locationSlice.reducer;
