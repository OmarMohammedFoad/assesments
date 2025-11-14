import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
export interface IQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}
export interface Quiz {
  _id: string;
  title: string;
  description?: string;
  questions: IQuestion[];
  duration: number;
  passingScore: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface QuizzesState {
  items: Quiz[];
  loading: boolean;
  error: string | null;
}

const initialState: QuizzesState = {
  items: [],
  loading: false,
  error: null,
};

const API_URL = `${import.meta.env.VITE_EXAMPLE_API_KEY}/api/quizzes`;

export const fetchQuizzes = createAsyncThunk('quizzes/fetchQuizzes', async () => {
  try {
    const { data } = await axios.get(API_URL)
    return data.data
  } catch (error) {

  }
});

// export const createQuiz = createAsyncThunk('quizzes/createQuiz', async (quiz: Omit<Quiz, 'id' | 'created_at' | 'updated_at'>) => {
//   try {
//     const { data } = await axios.post(API_URL, { quiz }, {
//       headers: {
//         "Content-Type": "application/json"
//       }
//     });
//     return data.data;
//   } catch (error) {
//     console.log(error);

//   }
// });

// export const updateQuiz = createAsyncThunk('quizzes/updateQuiz', async ({ id, ...quiz }: Partial<Quiz> & { id: string }) => {
//   const response = await fetch(`${API_URL}/${id}`, {
//     method: 'PUT',
//     headers: {
//       // Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(quiz),
//   });
//   if (!response.ok) throw new Error('Failed to update quiz');
//   return response.json();
// });

// export const deleteQuiz = createAsyncThunk('quizzes/deleteQuiz', async (id: string) => {
//   const response = await fetch(`${API_URL}/${id}`, {
//     method: 'DELETE',
//     headers: {
//       // Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
//     },
//   });
//   if (!response.ok) throw new Error('Failed to delete quiz');
//   return id;
// });

const quizzesSlice = createSlice({
  name: 'quizzes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizzes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizzes.fulfilled, (state, action: PayloadAction<Quiz[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch quizzes';
      })
    // .addCase(createQuiz.fulfilled, (state, action: PayloadAction<Quiz>) => {
    //   state.items.push(action.payload);
    // })
    // .addCase(updateQuiz.fulfilled, (state, action: PayloadAction<Quiz>) => {
    //   const index = state.items.findIndex((q) => q._id === action.payload._id);
    //   if (index !== -1) {
    //     state.items[index] = action.payload;
    //   }
    // })
    // .addCase(deleteQuiz.fulfilled, (state, action: PayloadAction<string>) => {
    //   state.items = state.items.filter((q) => q._id !== action.payload);
    // });
  },
});

export default quizzesSlice.reducer;
