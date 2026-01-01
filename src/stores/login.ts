import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LoginStore {
    isLogin: boolean
    toggleLogin: ({ section }: { section: string }) => void
}

export const useLoginStore = create<LoginStore>()(
    persist(
        (set) => ({
            isLogin: false,
            toggleLogin: ({ section }) => set((state) => {
                if (section === "Nowath") {
                    return { isLogin: !state.isLogin }
                }
                return state
            }),
        }),
        {
            name: 'login-storage',
        }
    )
)