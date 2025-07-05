import './App.css'
import PublicLayout from './components/layouts/PublicLayout'
import { Routes, Route } from 'react-router-dom'
import Workout from './components/pages/Workout'
import History from './components/pages/History'
import Planner from './components/pages/Planner'
import About from './components/pages/About'
import { useEffect, useState } from 'react'
import type { exercise, workout, workout_set } from './types'
import { v4 as uuid4 } from "uuid";
import { fetchAPI } from './utils/fetchAPI'

const API_URL = "http://localhost:3000";
const EXERCISE_API_URL = API_URL + "/exercises";
const WORKOUTS_API_URL = API_URL + "/exercises";
const WORKOUT_SETS_API_URL = API_URL + "/exercises";

function App() {

  const [exercises, setExercises] = useState<exercise[]>([]);
  const [workouts, setWorkouts] = useState<workout[]>([]);
  const [workoutSets, setWorkoutSets] = useState<workout_set[]>([]);

  // => fetch all exercises in the database

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

    fetchExercises();

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
  
    } catch(error: any) {

      console.error('Error:', error.message);
    }
  }

  return (
    <>
      <PublicLayout>
        <Routes>
          {/* index prop is the same pas path="/" */}
          <Route index element={<Workout 
            exercises={exercises}/>} />
          <Route path="history" element={<History 
            exercises={exercises}
            workouts={workouts}
            workout_sets={workoutSets}/>} />
          <Route path="planner" element={<Planner 
            exercises={exercises}
            addExercise={addExercise}
            editExercise={editExercise}/>} />
          <Route path="about" element={<About />} />
        </Routes>
      </PublicLayout>
    </>
  )
}

export default App
