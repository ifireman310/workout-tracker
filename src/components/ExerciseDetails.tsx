import Table from "react-bootstrap/esm/Table";
import type { exercise } from "../types";

type ExerciseDetailsProps = {
    exercise: exercise
}
function ExerciseDetails({ exercise }: ExerciseDetailsProps) {

    return (
        <>
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>{exercise.name} Instructions</th>
                        <th>Technique Example Video</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{exercise.instructions}</td>
                        <td><a href={exercise.link}>{exercise.link}</a></td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}

export default ExerciseDetails;
