import React, {useState} from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function WorkoutSelector() {
    

    const createEmptyWorkout = () => {
    };

    return (
        <>
            <button onClick={() => createEmptyWorkout()}>Create empty workout</button>
 
        </>
    )
}

export default WorkoutSelector;


