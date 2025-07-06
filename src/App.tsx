import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import PublicLayout from './components/layouts/PublicLayout'
import { Routes, Route } from 'react-router-dom'
import Workout from './components/pages/Workout'
import History from './components/pages/History'
import Planner from './components/pages/Planner'
import { useEffect, useState } from 'react'
import type { exercise, workout, workout_set } from './types'
import { v4 as uuid4 } from "uuid";
import { fetchAPI } from './utils/fetchAPI'

const API_URL = "http://localhost:3000";
const EXERCISE_API_URL = API_URL + "/exercises";
const WORKOUTS_API_URL = API_URL + "/workouts";
const WORKOUT_SETS_API_URL = API_URL + "/workout_sets";

function App() {

  const [exercises, setExercises] = useState<exercise[]>([]);
  const [workouts, setWorkouts] = useState<workout[]>([]);
  const [workoutSets, setWorkoutSets] = useState<workout_set[]>([]);

  // => fetch all exercises, workouts and sets in the database
  useEffect(() => {

    let options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    async function fetchExercises() {
      try {
        const exerciseData = await fetchAPI(EXERCISE_API_URL, options);
        setExercises(exerciseData);

      } catch (error: any) {
        console.error('Error fetching data:', error.message);
      }

    }

    async function fetchWorkouts() {
      try {
        const workoutData = await fetchAPI(WORKOUTS_API_URL, options);
        setWorkouts(workoutData);

      } catch (error: any) {
        console.error('Error fetching data:', error.message);
      }

    }

    async function fetchWorkoutSets() {
      try {
        const workoutSetData = await fetchAPI(WORKOUT_SETS_API_URL, options);
        setWorkoutSets(workoutSetData);

      } catch (error: any) {
        console.error('Error fetching data:', error.message);
      }

    }

    fetchExercises();
    fetchWorkouts();
    fetchWorkoutSets()
  }, [])


  // Function to add a new exercise to the list
  const addExercise = async (name: string, instructions: string, link: string) => {

    const newExercise = {
      id: uuid4(), // create unique identifier
      name: name,
      instructions: instructions,
      link: link
    }

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newExercise)
    };

    try {

      const newExercise = await fetchAPI(EXERCISE_API_URL, options);
      const newExercises = [...exercises, newExercise]

      // => Updating state, not re-fetching
      setExercises(newExercises)

    } catch (error: any) {

      console.error('Error:', error.message);
    }
  }

  // Edit exercise
  const editExercise = async (id: string, name: string, instructions: string, link: string) => {

    try {

      const temporaryExercises = [...exercises];
      const index = temporaryExercises.findIndex(exercise => exercise.id === id);
      temporaryExercises[index].name = name;
      temporaryExercises[index].instructions = instructions;
      temporaryExercises[index].link = link;

      const updatedExercise = {
        id: id,
        name: name,
        instructions: instructions,
        link: link
      }

      let options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedExercise)
      };

      await fetch(`${EXERCISE_API_URL}/${id}`, options)

      // => Updating state, not re-fetching
      setExercises(temporaryExercises);

    } catch (error: any) {

      console.error('Error:', error.message);
    }
  }

  // Add workout
  const addWorkout = async (id: string, name: string, date: string) => {

    const newWorkout = {
      id: id, // create unique identifier
      name: name,
      date: date
    };

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newWorkout)
    };

    try {

      const newWorkout = await fetchAPI(WORKOUTS_API_URL, options);
      const newWorkouts = [...workouts, newWorkout]

      // => Updating state, not re-fetching
      setWorkouts(newWorkouts)

    } catch (error: any) {

      console.error('Error:', error.message);
    }
  }

  // Add set
  const addSet = async (id: string,
    workout_id: string,
    exercise_id: string,
    exercise_order: string,
    reps: string,
    weight: string,
    notes: string) => {

    const newSet = {
      id: id, // create unique identifier
      workout_id: workout_id,
      exercise_id: exercise_id,
      exercise_order: exercise_order,
      reps: reps,
      weight: weight,
      notes: notes
    }

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newSet)
    };

    try {

      const newSet = await fetchAPI(WORKOUT_SETS_API_URL, options);
      const newSets = [...workoutSets, newSet]

      // => Updating state, not re-fetching
      setWorkoutSets(newSets)

    } catch (error: any) {

      console.error('Error:', error.message);
    }
  }

  const deleteSet = async (id: string) => {
    
    let options = {
      method: 'DELETE'
    };

    try {

       const resDelete = await fetch(`${WORKOUT_SETS_API_URL}/${id}`, options);

       if (!resDelete.ok) {
          throw new Error('DELETE failed')
       } 
    
       // => Re-fetching API to see latest changes (optional)
       const res = await fetch(WORKOUT_SETS_API_URL);
       const data = await res.json();

       setWorkoutSets(data);

    } catch(error: any) {

      console.error('Error:', error.message);
    }
  };

  const deleteWorkout = async (id: string) => {
    
    let options = {
      method: 'DELETE'
    };

    try {

       const resDelete = await fetch(`${WORKOUTS_API_URL}/${id}`, options);

       if (!resDelete.ok) {
          throw new Error('DELETE failed')
       } 
    
       // => Re-fetching API to see latest changes (optional)
       const res = await fetch(WORKOUTS_API_URL);
       const data = await res.json();

       setWorkouts(data);

    } catch(error: any) {

      console.error('Error:', error.message);
    }
  };

  return (
    <>
      <PublicLayout>
        <Routes>
          {/* index prop is the same pas path="/" */}
          <Route index element={<Workout
            exercises={exercises} 
            workouts={workouts}
            workout_sets={workoutSets}
            addWorkout={addWorkout}
            addSet={addSet}
            deleteSet={deleteSet}
            deleteWorkout={deleteWorkout}/>} />
          <Route path="history" element={<History
            exercises={exercises}
            workouts={workouts}
            workout_sets={workoutSets} />} />
          <Route path="planner" element={<Planner
            exercises={exercises}
            addExercise={addExercise}
            editExercise={editExercise} />} />
        </Routes>
      </PublicLayout>
    </>
  )
}

export default App
