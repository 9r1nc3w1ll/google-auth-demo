import { Otp, User } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface OtpState {
  otp: Otp | null;
  seconds: number;
  timerStarted: boolean;
  setOtp: (otp: Otp  | null) => void;
  setSeconds: (s :number) => void;
  startTimer: () => void;
  stopTimer: () => void;
}

export const useOtpStore = create<OtpState>()(
  persist(
    (set, get) => (
      {
        otp: null,
        seconds: 30,
        timerStarted: false,
        setOtp: (otp) => set({otp}),
        startTimer: () => set({timerStarted: true, seconds: 30}),
        stopTimer: () => set({timerStarted: false, seconds: 30}),
        setSeconds: (seconds) => set({seconds}),
    }
    ),
    { name: 'otp-storage'},
  )
)