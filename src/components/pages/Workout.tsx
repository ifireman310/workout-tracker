import { useState } from "react";
import WorkoutSelector from "../WorkoutSelector";
import WorkoutViewer from "../WorkoutViewer";
import type { exercise } from "../../types";

type WorkoutProps = {
    exercises: exercise[]
}

function Workout({exercises}: WorkoutProps) {

    const [workouts, setWorkouts] = useState();

    return (
        <>
            <h1>This is the workout page</h1>
            <WorkoutSelector />
            <WorkoutViewer />
        </>
    )
}

export default Workout;