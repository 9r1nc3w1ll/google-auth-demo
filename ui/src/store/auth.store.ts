import { User } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  user: User | null;
  token: string;
  login: (user: User, token: string) => void;
  logout:  () => void;
  isLoggedIn:  () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => (
      {
      token: "",
      user: null,
      isLoggedIn:  () => !!get()?.token && !!get()?.user,
      login: (user: User, token: string) => set({user, token}),
      logout: () => set({user: null, token: ""}),
    }
    ),
    { name: 'auth-storage'},
  )
)