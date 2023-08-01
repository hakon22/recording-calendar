import axios from 'axios';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes.js';

export const fetchLoading = createAsyncThunk(
  'calendar/fetchLoading',
  async () => {
    const res = await axios.get(routes.all);
    return res.data;
  },
);

const calendarAdapter = createEntityAdapter({});

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: calendarAdapter.getInitialState({
    loadingStatus: 'idle', error: null,
  }),
  reducers: {
    addData: calendarAdapter.addOne,
    addLike: (state, { payload }) => {
      state.entities[payload].likes += 1;
    },
    removeLike: (state, { payload }) => {
      state.entities[payload].likes -= 1;
    },
    removeData: calendarAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoading.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchLoading.fulfilled, (state, { payload }) => {
        calendarAdapter.addMany(state, payload);
        state.loadingStatus = 'finish';
        state.error = null;
      })
      .addCase(fetchLoading.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectors = calendarAdapter.getSelectors((state) => state.calendar);
export const { actions } = calendarSlice;
export default calendarSlice.reducer;