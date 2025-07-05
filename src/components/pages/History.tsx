import type { exercise, workout, workout_set } from "../../types";

type HistoryProps = {
    exercises: exercise[]
    workouts: workout[]
    workout_sets: workout_set[]
}


function History({exercises, workouts, workout_sets}: HistoryProps) {

    // const [exercises, setExercises] = useState<exercise[]>([]);

    return (
        <>
            <h1>This is the history page</h1>
            
        </>
    )
}

export default History;