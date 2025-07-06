import { Table } from "react-bootstrap"
import type { exercise, workout, workout_set } from "../types"

type FormattedWorkoutProps = {
    workouts: workout[]
    exercise: exercise
    workout_sets: workout_set[]
}

function FormattedExerciseList ({workouts, exercise, workout_sets}: FormattedWorkoutProps) {

    const filteredSets = workout_sets.filter((set) => set.exercise_id === exercise.id);

    // Nasty long function so that sets are also sorted by date
    filteredSets.sort((a,b) => new Date((workouts.find((w) => w.id === b.workout_id))!.date).getTime() - new Date((workouts.find((w) => w.id === a.workout_id))!.date).getTime());

    const listSets = filteredSets.map((s) => {
        const date = workouts.find((w) => w.id === s.workout_id)?.date;
        return (
            <tr>
                <td>{date}</td>
                <td>{s.weight}</td>
                <td>{s.reps}</td>
                <td>{s.notes}</td>
            </tr>
        )
    })

    return (
        <>
        <h2>{exercise.name}</h2>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Weight</th>
                    <th>Reps</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>{listSets}</tbody>
        </Table>
        </>
    )
}

export default FormattedExerciseList;