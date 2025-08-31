import useHabitStore from "../store/store";

export default function HabitList(){
    const habits = useHabitStore(state => state.habits);

    return (
        <div className="border mt-3 p-4 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-center">Your Habits</h2>
            <ol className="mt-4 space-y-2 list-decimal pl-5">
                {habits.map(habit => (
                    <li key={habit.id}>
                        <span className="font-semibold">{habit.names}</span> - {habit.frequency}
                    </li>
                ))}
            </ol>
        </div>
    );
}