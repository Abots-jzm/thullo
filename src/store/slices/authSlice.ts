import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import storage from "../../util/storage";

type InitialState = {
  userId: string | null;
};

const initialState: InitialState = {
  userId: storage.get("uid"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
    logout(state) {
      state.userId = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
