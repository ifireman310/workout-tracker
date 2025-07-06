import { useState } from "react";
import FormattedWorkout from "../FormattedWorkout"
import type { exercise, workout, workout_set } from "../../types";
import  Dropdown  from "react-bootstrap/Dropdown";
import FormattedExerciseList from "../FormattedExerciseList";

type HistoryProps = {
    exercises: exercise[]
    workouts: workout[]
    workout_sets: workout_set[]
}


function History({ exercises, workouts, workout_sets }: HistoryProps) {

    const [showWorkouts, setShowWorkouts] = useState(false);
    const [showExerciseHistory, setshowExerciseHistory] = useState(false);
    const [dropdownSelected, setDropdownSelected] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState<exercise>(exercises[0]);

    const handleExerciseSelection = (e: exercise) => {
        setDropdownSelected(true);
        setSelectedExercise(e);
    }

    // Sort workouts by date in descending order
    workouts.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Outputs table data for each workout
    const listWorkouts = workouts.map((w) => {

        return <FormattedWorkout
            key={w.id}
            workout={w}
            exercises={exercises}
            workout_sets={workout_sets}
        />
    })

    // Outputs all exercises for the dropdown menu
    const listExercises = exercises.map((e) => {
        return (
            <Dropdown.Item key={e.id} onClick={() => handleExerciseSelection(e)}>{e.name}</Dropdown.Item>
        )
    })

    return (
        <>
            <h1>View History of Workouts & Specific Exercises</h1>
            <button onClick={() => setShowWorkouts(!showWorkouts)}>Show/Hide All Workouts</button>
            <br />
            {
                showWorkouts ? (
                    <>
                        {listWorkouts}
                    </>
                ) : (<></>)
            }
            <br />
            
            <button onClick={() => setshowExerciseHistory(!showExerciseHistory)}>Show/Hide History of a Specific Exercise</button>
            <button onClick={() => setDropdownSelected(false)}>Clear Exercise</button>
            {
                showExerciseHistory ? (
                    <>
                        <br />
                        <br />
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Select Exercise
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {listExercises}
                            </Dropdown.Menu>
                        </Dropdown>
                        {
                            dropdownSelected ? (
                                <>
                                    <FormattedExerciseList
                                        key={selectedExercise.id}
                                        workouts={workouts}
                                        exercise={selectedExercise}
                                        workout_sets={workout_sets}
                                    />
                                </>
                            ) : (<></>)
                        }
                    </>
                ) : (<></>)
            }
        </>
    )
}

export default History;