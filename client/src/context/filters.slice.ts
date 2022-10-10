import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeCrypto: {},
  activeFiat: {},
  activeBank: {},
  activeRegion: {},
};

const FiltersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {},
});
