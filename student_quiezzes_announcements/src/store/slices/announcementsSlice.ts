import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from "axios";
export interface Announcement {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updated_at: string;
  published: boolean;
}

interface AnnouncementsState {
  items: Announcement[];
  loading: boolean;
  error: string | null;
}

const initialState: AnnouncementsState = {
  items: [],
  loading: false,
  error: null,
};

const API_URL = `${import.meta.env.VITE_EXAMPLE_API_KEY}/api/announcments`;

export const fetchAnnouncements = createAsyncThunk('announcements/fetchAnnouncements', async () => {
  try {
    const { data } = await axios.get(API_URL);


    return data.data
  } catch (error) {
    console.log(error);
  }
});

// export const createAnnouncement = createAsyncThunk(
//   'announcements/createAnnouncement',
//   async (announcement: Omit<Announcement, 'id' | 'created_at' | 'updated_at'>) => {
//     const response = await fetch(API_URL, {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(announcement),
//     });
//     if (!response.ok) throw new Error('Failed to create announcement');
//     return response.json();
//   }
// );

// export const updateAnnouncement = createAsyncThunk(
//   'announcements/updateAnnouncement',
//   async ({ id, ...announcement }: Partial<Announcement> & { id: string }) => {
//     const response = await fetch(`${API_URL}/${id}`, {
//       method: 'PUT',
//       headers: {
//         // Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(announcement),
//     });
//     if (!response.ok) throw new Error('Failed to update announcement');
//     return response.json();
//   }
// );

// export const deleteAnnouncement = createAsyncThunk('announcements/deleteAnnouncement', async (id: string) => {
//   const response = await fetch(`${API_URL}/${id}`, {
//     method: 'DELETE',
//     headers: {
//       // Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
//     },
//   });
//   if (!response.ok) throw new Error('Failed to delete announcement');
//   return id;
// });

const announcementsSlice = createSlice({
  name: 'announcements',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnnouncements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnnouncements.fulfilled, (state, action: PayloadAction<Announcement[]>) => {

        state.loading = false;;
        state.items = action.payload;
      })
      .addCase(fetchAnnouncements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch announcements';
      })
    // .addCase(createAnnouncement.fulfilled, (state, action: PayloadAction<Announcement>) => {
    //   state.items.unshift(action.payload);
    // })
    // .addCase(updateAnnouncement.fulfilled, (state, action: PayloadAction<Announcement>) => {
    //   const index = state.items.findIndex((a) => a._id === action.payload._id);
    //   if (index !== -1) {
    //     state.items[index] = action.payload;
    //   }
    // })
    // .addCase(deleteAnnouncement.fulfilled, (state, action: PayloadAction<string>) => {
    //   state.items = state.items.filter((a) => a._id !== action.payload);
    // });
  },
});

export default announcementsSlice.reducer;
