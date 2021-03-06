import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import ExerciseListItem from "./ExerciseListItem";
import Dialogue from "./Dialogue";

import "./Exercises.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

export default function ExerciseList() {
  let { category } = useParams();

  const [exerciseData, setExerciseData] = useState([]);
  const [exerciseCart, setExerciseCart] = useState([]);
  const [workoutName, setWorkoutName] = useState("");
  const [showSaveDialogue, setShowSaveDialogue] = useState(false);
  const [showDeleteDialogue, setShowDeleteDialogue] = useState(false);

  // ----- API REQUEST SETTINGS -----
  let apiExerciseByBodyPart = {
    method: 'GET',
    url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${category}`,
    headers: {
      'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
      'x-rapidapi-key': '9555d07c58msh23cc2d21a1fd290p1a3f88jsn6e3ffdf744a3'
    }
  };

  // ----- CALL API, DEPENDENT ON CATEGORY (URL) CHANGE -----
  useEffect(() => {
    axios.request(apiExerciseByBodyPart)
      .then((res) => {
        // console.log("RESPONSE", res.data);
        setExerciseData(res.data);
      })
      .catch((err) => {
        console.log("Error: ", err)
      });
    // The line below removes the console warning for the dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [category]);

  // ----- PERSISTENT STATE pt2 ----- Loads previous state from Local Storage (from broswer)
  // Note: pt2 must stay above pt1 or State will be overwritten.
  useEffect(() => {
    const data2 = localStorage.getItem('workout-name')
    const data = localStorage.getItem('exercise-cart');
    if (data) {
      // console.log('I am saved exercise-cart data', data)
      setWorkoutName(JSON.parse(data2))
      setExerciseCart(JSON.parse(data))
    }
  }, [])

  // ----- PERSISTENT STATE pt1 ----- Save exercise cart items to Local Storage
  useEffect(() => {
    localStorage.setItem('workout-name', JSON.stringify(workoutName))
    localStorage.setItem('exercise-cart', JSON.stringify(exerciseCart))
  })

  const onAdd = (exercise) => {
    // console.log('INPUT: exercise param', exercise)
    const singleExercise = exerciseData.find(erex => erex.id === exercise);
    // console.log('Match singleExercise', singleExercise)
    const exists = exerciseCart.find(erex => erex.id === exercise);
    if (exists) {
      return null;
    } else {
      setExerciseCart([...exerciseCart, { ...singleExercise, sets: "", reps: "" }]);
    }
  };

  const reset = () => {
    setExerciseCart([]);
    setWorkoutName("Add Workout Name");
    setShowSaveDialogue(false);
    setShowDeleteDialogue(false);
  };

  const cancel = () => {
    setShowSaveDialogue(false);
    setShowDeleteDialogue(false);
  }

  const onSubmit = () => {
    const date = new Date().toLocaleDateString('en-CA');
    const workoutData = {
      workoutName,
      date,
      exercises: exerciseCart
    }

    axios.put('/api/createWorkout', { workoutData })
      .then((res) => {
        console.log("Sending New Workout data to Backend: ", workoutData);
      }).catch((error) => {
        console.log(error)
      });

    reset();
  };

  const onDelete = (exercise) => {
    setExerciseCart(
      exerciseCart.filter(item => item !== exercise)
    )
  }

  const exerciseItem = exerciseData.map((exercise) => {

    return (
      <ExerciseListItem
        {...exercise}
        key={exercise.id}
        gif={exercise.gifUrl}
        name={exercise.name}
        bodyPart={exercise.bodyPart}
        target={exercise.target}
        equipment={exercise.equipment}
        onAdd={onAdd}
      />
    );
  });

  // handler to update the sets and reps to the cart
  const updateHandler = (index, data) => {
    setExerciseCart((carts) => carts.map((cart, i) => {
      if (index === i) {
        return { ...cart, ...data };
      }
      return cart;
    }));
  }

  return (
    <>

      <div className="topWrapper"></div>
      <div className="container-lg mt-4 pt-4">
        <div className="row noMrg justify-content-md-center rounded-2">
          <div className="col col-1 mr-4">
            {/* Inserted: position-fixed */}
            <ul className="nav flex-column position-fixed">
              <h3>Categories</h3>
              <li className="nav-item">
                <Link to="/exercises/back">
                  <span className="nav-link">Back</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/exercises/cardio">
                  <span className="nav-link">Cardio</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/exercises/chest">
                  <span className="nav-link">Chest</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/exercises/lower%20arms">
                  <span className="nav-link">Lower Arms</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/exercises/lower%20legs">
                  <span className="nav-link">Lower Legs</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/exercises/shoulders">
                  <span className="nav-link">Shoulders</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/exercises/upper%20arms">
                  <span className="nav-link">Upper Arms</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/exercises/upper%20legs">
                  <span className="nav-link">Upper Legs</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/exercises/waist">
                  <span className="nav-link">Core</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Inserted: 'section' tag to contain exerciseItem and exerciseCart */}
          <section className="d-flex">

            <div className="col-md-auto rounded-2">
              {exerciseItem}
            </div>

            <div className="col col-lg-4 rounded-2 custom-scroll">
              <div className="card d-grid rounded-2 stick-cart scroll">
                <div className="card-header bg-light rounded-2">
                  <h5 className="card-title text-center capitalize">Create Your Workout</h5>
                </div>
                <div>
                  <input
                    type="text"
                    name="workout_name"
                    id="workout_id"
                    value={workoutName}
                    placeholder="Add Workout Name"
                    onChange={(event) => setWorkoutName(event.target.value)}
                    className="form-control w100 inputborder" />
                </div>
                {exerciseCart.map((exercise, index) => {
                  return (

                    <div className="card-body w-0" key={exercise.id}>
                      <h5 className="capitalize">{exercise.name}</h5>
                      <div className="card-text flex align-items-center">

                        <div>
                          <label htmlFor="Sets" className="form-label">Sets</label>
                          <input
                            type="text"
                            pattern='^[1-9]\d*(?:\.\d+)?$'
                            name="sets"
                            id='sets'
                            value={exercise.sets}
                            onChange={(event) => updateHandler(index, { sets: event.target.value })}
                            className="form-control" />
                        </div>

                        <div>
                          <label htmlFor="Sets" className="form-label">Reps</label>
                          <input
                            type="text"
                            pattern='^[1-9]\d*(?:\.\d+)?$'
                            name="reps"
                            id="reps"
                            value={exercise.reps}
                            onChange={(event) => updateHandler(index, { reps: event.target.value })}
                            className="form-control" />
                        </div>

                        <button className="btn btn-primary" onClick={() => onDelete(exercise)}><FontAwesomeIcon icon={faMinus} /></button>
                      </div>
                    </div>

                  );
                })}

                <div className="card-footer d-flex justify-content-between bg-light rounded-2">
                  <div>
                    <Dialogue show={showSaveDialogue}
                      title="Workout Saved!"
                      description="Visit the Workout Page to Edit Sets and Reps!"
                      confirm={onSubmit}
                      confirmMessage="close" />
                    <button type="submit" className="btn btn-primary" onClick={() => { setShowSaveDialogue(true) }} ><FontAwesomeIcon icon={faHeart} /></button>
                  </div>

                  <Dialogue show={showDeleteDialogue}
                    title="Delete Workout?"
                    description="Are you sure you want to delete this Workout?"
                    confirm={reset}
                    confirmMessage="Yes"
                    cancel={cancel}
                    cancelMessage="No"
                  />

                  <button type="submit" className="btn btn-primary" onClick={() => { setShowDeleteDialogue(true) }}><FontAwesomeIcon icon={faTrash} /></button>
                </div>

              </div>
            </div>

          </section >

        </div>
      </div>

    </>
  );
};