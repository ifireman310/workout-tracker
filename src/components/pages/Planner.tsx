import { useState, type ChangeEvent, type FormEvent } from "react";
import type { exercise, newExerciseForm } from "../../types";
import Table from 'react-bootstrap/Table';
import Exercise from "../Exercise";

type PlannerProps = {
    exercises: exercise[]
    addExercise: (name: string, instructions: string, link: string) => void
    editExercise: (id: string, name: string, instructions: string, link: string) => void
}

function Planner({ exercises, addExercise, editExercise }: PlannerProps) {

    const [showExercises, setShowExercises] = useState(false);
    const [formData, setFormData] = useState<newExerciseForm>({
        name: "",
        instructions: "",
        link: ""
    });


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handles the submit event from form to create a new exercise
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            console.warn("Exercise name is required!");
            return;
        }
        console.log("New Exercise:", formData);
        addExercise(formData.name, formData?.instructions, formData?.link)
        setFormData({ name: "", instructions: "", link: "" });
    };

    // Returns table rows of all exercises 
    const listExercises = exercises.map((e) => {
        return <Exercise
            key={e.id}
            exercise={e}
            editExercise={editExercise}
        />
    })

    return (
        <>
            <h1>View, Add, or Modify Exercises</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    className="input"
                    placeholder="Exercise Name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="instructions"
                    className="input"
                    placeholder="Exercise Instructions"
                    value={formData.instructions}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="link"
                    className="input"
                    placeholder="Video Link"
                    value={formData.link}
                    onChange={handleChange}
                />
                <button type="submit">Add Exercise</button>
            </form>

            <br />
            <button onClick={() => setShowExercises(!showExercises)}>Show/Hide All Exercises</button>

            <br />
            <br />
            {
                showExercises ? (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Exercise Name</th>
                                <th>Instructions</th>
                                <th>Video Link</th>
                                <th>Edit Exercise</th>
                            </tr>
                        </thead>
                        <tbody>{listExercises}</tbody>
                    </Table>
                ) : (<></>)
            }
        </>
    )
}

export default Planner;