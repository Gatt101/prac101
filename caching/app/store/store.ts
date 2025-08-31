import {create} from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface Habit {
    id: string;
    names: string;
    frequency: 'daily' | 'weekly' | 'monthly';
    completedDates : string[];
    createdAt: string;
}

interface HabitState{
    addHabit: any;
    removeHabit: any;
    habits: Habit[];
}

const useHabitStore = create<HabitState>()(
    persist(
        (set, get) => ({
            habits: [],
            addHabit: (names: string, frequency: 'daily' | 'weekly' | 'monthly') => {
                const newHabit = {
                    id: Date.now().toString(),
                    names,
                    frequency,
                    completedDates: [],
                    createdAt: new Date().toISOString()
                };
                set(state => ({ habits: [...state.habits, newHabit] }));
            },
            removeHabit: (id: string) => {
                set(state => ({ habits: state.habits.filter(habit => habit.id !== id) }));
            }
        }),
        {
            name: "habit-store",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ habits: state.habits })
        }
    )
)

export default useHabitStore;