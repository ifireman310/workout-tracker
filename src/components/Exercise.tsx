import React, { useState, type ChangeEvent } from "react";
import type { exercise, newExerciseForm } from "../types";

type ExerciseProps = {
    exercise: exercise
    editExercise: (id: string, name: string, instructions: string, link: string) => void
}

function Exercise({ exercise, editExercise }: ExerciseProps) {

    const [edit, setEdit] = useState(false);
    const [error, setError] = useState(false);
    const [formData, setFormData] = useState<newExerciseForm>({
        name: exercise.name,
        instructions: exercise.instructions,
        link: exercise.link
    });


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const toggleEdit = () => {
        setEdit(!edit);
        // Set the form data to the exercise values in case the user cancels an edit
        setFormData({
            name: exercise.name,
            instructions: exercise.instructions,
            link: exercise.link
        })
        setError(false)
    };

    const handleUpdate = (id: string, name: string, instructions: string, link: string) => {
        editExercise(id, name, instructions, link);
        toggleEdit();
    }

    return (
        <tr>
            {!edit ? (
                <>
                    <td>{exercise.name}</td>
                    <td>{exercise.instructions}</td>
                    <td>{exercise.link}</td>
                    <td><button onClick={() => toggleEdit()}>Edit</button></td>
                </>
            ) : (
                <>
                    <td>
                        <input
                            type="text"
                            name="name"
                            className="input"
                            placeholder="Exercise Name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            name="instructions"
                            className="input"
                            placeholder="Exercise Instructions"
                            value={formData.instructions}
                            onChange={handleChange}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            name="link"
                            className="input"
                            placeholder="Video Link"
                            value={formData.link}
                            onChange={handleChange}
                        />
                    </td>
                    <td>
                        <button onClick={() => handleUpdate(exercise.id, formData.name, formData.instructions, formData.link)}>Update</button>
                        <button onClick={() => toggleEdit()}> Cancel </button>
                    </td>
                </>
            )}
        </tr>
    );
}

export default Exercise;