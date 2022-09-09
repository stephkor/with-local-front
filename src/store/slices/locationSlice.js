import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentLocation: "",
  selectedLocation: "",
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setCurrentLocation: (draft, action) => {
      return {
        currentLocation: action.payload,
        selectedLocation: draft.selectedLocation,
      };
    },
    setSelectedLocation(draft, action) {
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
