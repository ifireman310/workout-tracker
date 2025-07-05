import React, { useState } from "react";

function ExerciseSet() {

    const [name, setName] = useState("Exercise Name");
    const [weight, setWeight] = useState("Weight (lbs)");
    const [reps, setReps] = useState("Reps");
    const [RPE, setRPE] = useState("RPE (1-10)");
    const [notes, setNotes] = useState("Notes");

    const [error, setError] = useState(false);

    const handleNameEdit = (evt: any) => {
        setName(evt.target.value);
    };

    const handleWeightEdit = (evt: any) => {
        setWeight(evt.target.value);
    };

    const handleRepsEdit = (evt: any) => {
        setReps(evt.target.value);
    };

    const handleRPEEdit = (evt: any) => {
        setRPE(evt.target.value);
    };

    const handleNotesEdit = (evt: any) => {
        setNotes(evt.target.value);
    };

    return (
        <>
            <input type="text" value={name} onChange={handleNameEdit} />
            <input type="text" value={weight} onChange={handleWeightEdit} />
            <input type="text" value={reps} onChange={handleRepsEdit} />
            <input type="text" value={RPE} onChange={handleRPEEdit} />
            <input type="text" value={notes} onChange={handleNotesEdit} />
        </>
    )
}

export default ExerciseSet;