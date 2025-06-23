import { create } from 'zustand'
import { toast } from 'react-toastify'
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../api/todoApi'

import type {
  TodoType,
  TodoPayload,
  TodoUpdateType
} from '../types'
import axios from 'axios'

type TodoStore = {
  todos: TodoType[]
  loading: boolean
  error: string | null
  fetchTodos: () => Promise<void>
  addTodo: (payload: TodoPayload) => Promise<void>
  updateTodo: (id: string, payload: TodoUpdateType) => Promise<void>
  deleteTodo: (id: string) => Promise<void>
  clearCompleted: () => void
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  loading: false,
  error: null,

fetchTodos: async () => {
  set({ loading: true, error: null })
  try {
    const res = await getTodos()
    set({ todos: res.data, loading: false })
  } catch (err: unknown) {
    let message = 'Failed to fetch todos'
    if (axios.isAxiosError(err)) {
      message = err.message || message
    } else if (err instanceof Error) {
      message = err.message
    }
    toast.error(message)
    set({ error: message, loading: false })
  }
},

addTodo: async (payload: TodoPayload) => {
  set({ loading: true, error: null })
  try {
    const res = await createTodo(payload)
    set((state) => ({
      todos: [res.data, ...state.todos],
      loading: false,
    }))
    toast.success('Todo created successfully!')
  } catch (err: unknown) {
    let message = 'Failed to create todo'
    if (axios.isAxiosError(err)) {
      message = err.message || message
    } else if (err instanceof Error) {
      message = err.message
    }
    toast.error(message)
    set({ error: message, loading: false })
  }
},

 updateTodo: async (id: string, payload: TodoUpdateType) => {
  set({ loading: true, error: null })
  try {
    const res = await updateTodo(id, payload)
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo._id === id ? res.data : todo
      ),
      loading: false,
    }))
    toast.success('Todo updated successfully!')
  } catch (err: unknown) {
    let message = 'Failed to update todo'
    if (axios.isAxiosError(err)) {
      message = err.message || message
    } else if (err instanceof Error) {
      message = err.message
    }
    toast.error(message)
    set({ error: message, loading: false })
  }
},

  deleteTodo: async (id: string) => {
  set({ loading: true, error: null })
  try {
    await deleteTodo(id)
    set((state) => ({
      todos: state.todos.filter((todo) => todo._id !== id),
      loading: false,
    }))
    toast.success('Todo deleted successfully!')
  } catch (err: unknown) {
    let message = 'Failed to delete todo'
    if (axios.isAxiosError(err)) {
      message = err.message || message
    } else if (err instanceof Error) {
      message = err.message
    }
    toast.error(message)
    set({ error: message, loading: false })
  }
},

  clearCompleted: () => {
    set((state) => ({
      todos: state.todos.filter((todo) => !todo.completed),
    }))
    toast.success('Cleared completed todos!')
  },
}))
