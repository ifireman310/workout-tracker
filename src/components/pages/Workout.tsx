import { useState, type ChangeEvent, type FormEvent } from "react";
import type { workout, workout_set, exercise, newWorkoutForm, newSetForm } from "../../types";
import { v4 as uuid4 } from "uuid";
import Table from "react-bootstrap/esm/Table";
import Dropdown from "react-bootstrap/esm/Dropdown";
import ExerciseDetails from "../ExerciseDetails";
import { Button } from "react-bootstrap";

type WorkoutProps = {
    exercises: exercise[]
    workouts: workout[]
    workout_sets: workout_set[]
    addWorkout: (id: string, name: string, date: string) => void
    addSet: (id: string, workout_id: string, exercise_id: string, exercise_order: string, reps: string, weight: string, notes: string) => void
    deleteSet: (id: string) => void
    deleteWorkout: (id: string) => void
}

function Workout({ exercises, workouts, workout_sets, addWorkout, addSet, deleteSet, deleteWorkout }: WorkoutProps) {

    // State variables
    const [workout, setWorkout] = useState<workout>();
    const [SetInProgress, setSetInProgress] = useState(false)
    const [dropdownSelected, setDropdownSelected] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState<exercise>();
    const [workoutSets, setWorkoutSets] = useState<workout_set[]>([]);
    const [workoutFormData, setWorkoutFormData] = useState<newWorkoutForm>({
        name: "",
        date: ""
    });
    const [newSetFormData, setNewSetFormData] = useState<newSetForm>({
        weight: "",
        reps: "",
        notes: ""
    });

    // Handles workout form change as user types
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setWorkoutFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handles set form change as user types
    const handleSetChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewSetFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handles the submit event from form to create a new workout
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!workoutFormData.name.trim() || !workoutFormData.date.trim()) {
            console.warn("Workout name & date is required!");
            return;
        }
        const id = uuid4();
        console.log("New Workout:", workoutFormData);
        addWorkout(id, workoutFormData.name, workoutFormData.date)

        const tempWorkout = {
            id: id,
            name: workoutFormData.name,
            date: workoutFormData.date
        }

        setWorkout(tempWorkout)
        setWorkoutFormData({ name: "", date: "" });

    };

    // Handles the submit event for new sets
    const handleSubmitSet = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newSetFormData.weight.trim() || !newSetFormData.reps.trim()) {
            console.warn("Workout weight & reps is required!");
            return;
        }

        const id = uuid4();

        const newSet = {
            id: id,
            workout_id: workout!.id,
            exercise_id: selectedExercise!.id,
            exercise_order: (workoutSets.length + 1).toString(),
            reps: newSetFormData.reps,
            weight: newSetFormData.weight,
            notes: newSetFormData.notes
        }

        addSet(id,
            workout!.id,
            selectedExercise!.id,
            (workoutSets.length + 1).toString(),
            newSetFormData.reps,
            newSetFormData.weight,
            newSetFormData.notes
        )

        setWorkoutSets([...workoutSets, newSet]);
        setNewSetFormData({ weight: "", reps: "", notes: "" });
        setSetInProgress(false);
        setDropdownSelected(false);
    };

    // Handles dropdown selection when picking the exercise for a set
    const handleExerciseSelection = (e: exercise) => {
        setDropdownSelected(true);
        setSelectedExercise(e);
    }

    // Handles dropdown selection when picking an existing workout to modify
    const handleWorkoutSelection = (e: workout) => {
        // Clear out any state data from previous edits the user was making
        clearWorkout();
        // Set the workout
        setWorkout(e);
        // Set the workout sets (sort so that they appear in order)
        const filteredSets = workout_sets.filter((w) => w.workout_id === e.id);
        filteredSets.sort((a, b) => (Number(a.exercise_order) > Number(b.exercise_order)) ? 1 : -1);
        setWorkoutSets(filteredSets);
    }

    // Populates the dropdown list for exercise selection
    const listExercises = exercises.map((e) => {
        return (
            <Dropdown.Item key={e.id} onClick={() => handleExerciseSelection(e)}>{e.name}</Dropdown.Item>
        )
    })

    // Populates the dropdown list for exercise selection
    const listWorkouts = workouts.map((e) => {
        return (
            <Dropdown.Item key={e.id} onClick={() => handleWorkoutSelection(e)}>{e.name}</Dropdown.Item>
        )
    })

    const handleDeleteWorkout = (w: workout) => {
        // Find all sets that correspond to this workout and delete them before deleting the workout
        const filteredSets = workout_sets.filter((s) => s.workout_id === w.id);

        filteredSets.forEach(set => { deleteSet(set.id) });

        // Now delete the workout
        deleteWorkout(w.id);
        clearWorkout();
    }

    // Delete set if button is pressed
    const handleDeleteSet = (s: workout_set) => {
        deleteSet(s.id);

        // Clear out any state data from previous edits the user was making
        const tempWorkout = workout;

        clearWorkout();
        // Set the workout
        handleWorkoutSelection(tempWorkout!);
        // Set the workout sets (sort so that they appear in order)

        // // re-render the workout sets (sort so that they appear in order)
        // const filteredSets = workout_sets.filter((w) => w.workout_id === workout!.id);
        // filteredSets.sort((a, b) => (Number(a.exercise_order) > Number(b.exercise_order)) ? 1 : -1);
        // clearWorkout();

    }

    // Reset the state if user wants to start over
    const clearWorkout = () => {
        setSelectedExercise(undefined);
        setWorkout(undefined);
        setWorkoutSets([]);
        setSetInProgress(false);
        setWorkoutFormData({ name: "", date: "" })
        setNewSetFormData({ weight: "", reps: "", notes: "" });
    };




    const listSets = workoutSets.map((s) => {

        const exer = exercises.find((e) => e.id === s.exercise_id)

        return (
            <tr key={s.id}>
                <td>{exer!.name}</td>
                <td>{s.weight}</td>
                <td>{s.reps}</td>
                <td>{s.notes}</td>
                <td><Button variant="danger" onClick={() => handleDeleteSet(s)}>Delete Set</Button></td>
            </tr>
        )
    })

    return (
        <>
            <h1>This is the workout page</h1>
            <button onClick={() => clearWorkout()}>Clear Workout</button>

            <br />
            <br />

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    className="input"
                    placeholder="Workout Name"
                    value={workoutFormData.name}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="date"
                    className="input"
                    placeholder="mm/dd/yyyy"
                    value={workoutFormData.date}
                    onChange={handleChange}
                />
                <button type="submit">Add New Workout</button>
            </form>

            <br />

            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Or Select an Existing Workout to Modify
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {listWorkouts}
                </Dropdown.Menu>
            </Dropdown>

            <br />

            {workout !== undefined ? (
                <Table striped bordered hover>
                    <thead>
                        <tr key={workout.id}>
                            <th colSpan={2}>{workout?.name}</th>
                            <th colSpan={2}>{workout?.date}</th>
                            <th><Button variant="danger" onClick={() => handleDeleteWorkout(workout)}>Delete Workout</Button></th>
                        </tr>
                        <tr>
                            <th>Exercise Name</th>
                            <th>Weight</th>
                            <th>Reps</th>
                            <th>Notes</th>
                            <th>Delete Set</th>
                        </tr>
                    </thead>
                    <tbody>{listSets}</tbody>
                </Table>
            ) : (<></>)}

            <button onClick={() => setSetInProgress(true)}>Add New Set</button>
            <br />
            <br />

            {
                SetInProgress ? (
                    <>

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
                                    <br />
                                    <h2>Selected: {selectedExercise?.name}</h2>
                                    <form onSubmit={handleSubmitSet}>
                                        <input
                                            type="text"
                                            name="weight"
                                            className="input"
                                            placeholder="Weight"
                                            value={newSetFormData.weight}
                                            onChange={handleSetChange}
                                        />
                                        <input
                                            type="text"
                                            name="reps"
                                            className="input"
                                            placeholder="Reps"
                                            value={newSetFormData.reps}
                                            onChange={handleSetChange}
                                        />
                                        <input
                                            type="text"
                                            name="notes"
                                            className="input"
                                            placeholder="Notes"
                                            value={newSetFormData.notes}
                                            onChange={handleSetChange}
                                        />
                                        <button type="submit">Save Set</button>
                                    </form>
                                    <ExerciseDetails
                                        exercise={selectedExercise!} />
                                </>
                            ) : (<></>)
                        }

                    </>
                ) : (<></>)
            }


        </>
    )
}

export default Workout;