import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from './store';

interface Task {
  id: number;
  text: string;
  date: string;
  type: 'daily' | 'regular';
}

interface TaskState {
  tasks: Task[];
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    fetchTasksSuccess(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
      state.error = null;
    },
    fetchTasksFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
      state.error = null;
    },
    deleteTask(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      state.error = null;
    },
  },
});

export const { fetchTasksSuccess, fetchTasksFailure, addTask, deleteTask } = tasksSlice.actions;

export const fetchTasks = (): AppThunk => async dispatch => {
  try {
    const response = await fetch('http://localhost:5000/tasks');
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    const data = await response.json();
    dispatch(fetchTasksSuccess(data));
  } catch (error) {
    dispatch(fetchTasksFailure('error.message')); // Pass the error message as an argument
  }
};

export default tasksSlice.reducer;
