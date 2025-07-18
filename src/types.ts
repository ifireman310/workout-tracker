export type exercise = {
    id: string
    name: string
    instructions: string
    link: string
}

export type workout = {
    id: string
    name: string
    date: string
}

export type workout_set = {
    id: string
    workout_id: string
    exercise_id: string
    exercise_order: string
    reps: string
    weight: string
    notes: string
}

export type newExerciseForm = {
    name: string
    instructions: string
    link: string
}

export type newWorkoutForm = {
    name: string
    date: string
}

export type newSetForm = {
    weight: string
    reps: string
    notes: string
}