import Table from "react-bootstrap/esm/Table";
import type { exercise, workout, workout_set } from "../types";

type FormattedWorkoutProps = {
    workout: workout
    exercises: exercise[]
    workout_sets: workout_set[]
}

function FormattedWorkout({ workout, exercises, workout_sets }: FormattedWorkoutProps) {

    // Filter sets to ones that match the workout id
    const filteredSets = workout_sets.filter((set) => set.workout_id === workout.id)

    // Sort sets in order of completion
    filteredSets.sort((a, b) => (Number(a.exercise_order) > Number(b.exercise_order)) ? 1 : -1);

    const listSets = filteredSets.map((s) => {
        const exercise = exercises.find((e) => e.id === s.exercise_id);
        return (
            <tr>
                <td>{exercise?.name}</td>
                <td>{s.reps}</td>
                <td>{s.weight}</td>
                <td>{s.notes}</td>
            </tr>
        )
    })

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th colSpan={2}>{workout.name}</th>
                        <th colSpan={2}>{workout.date}</th>
                    </tr>
                    <tr>
                        <th>Exercise Name</th>
                        <th>Reps</th>
                        <th>Weight</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>{listSets}</tbody>
            </Table>
        </>
    )
}

export default FormattedWorkout;