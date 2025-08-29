import {create} from 'zustand';

export interface Habit {
    id: string;
    names: string;
    frequency: 'daily' | 'weekly' | 'monthly';
    completedDates : string[];
    createdAt: string;
}

interface HabitState{
    habits: Habit[];
}

const useHabitStore = create<HabitState>()(() => {
    return {
        habits: []
    }
})

export default useHabitStore;