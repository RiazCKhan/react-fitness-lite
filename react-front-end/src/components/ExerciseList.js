import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import ExerciseListItem from "./ExerciseListItem";

import "./Exercises.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";



const backExercises = [
  {
    bodyPart: "back",
    equipment: "cable",
    gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/0007.gif",
    id: "0007",
    name: "alternate lateral pulldown",
    target: "lats"
  },
  {
    bodyPart: "back",
    equipment: "body weight",
    gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/3293.gif",
    id: "3293",
    name: "archer pull up",
    target: "lats"
  },
  {
    bodyPart: "back",
    equipment: "leverage machine",
    gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/0015.gif",
    id: "0015",
    name: "assisted parallel close grip pull-up",
    target: "lats"
  },
  {
    bodyPart: "back",
    equipment: "leverage machine",
    gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/0017.gif",
    id: "0017",
    name: "assisted pull-up",
    target: "lats"
  }
];

// Mimic API request for List All Body Parts
// const allBodyParts = ["back", "cardio", "chest", "lower arms", "lower legs", "neck", "shoulders", "upper arms", "upper legs", "waist"]

export default function ExerciseList() {
  let { category } = useParams();


  const [exerciseData, setExerciseData] = useState([]);
  const [exerciseCart, setExerciseCart] = useState([]);

  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [workoutName, setWorkoutName] = useState("");

  // let apiExerciseByBodyPart = {
  //   method: 'GET',
  //   url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${category}`,
  //   headers: {
  //     'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
  //     'x-rapidapi-key': 'c2c9da1eb8msh17b3797bf1980ddp197370jsn45878d3b3863'
  //   }
  // };

  // Loads previous state from Local Storage (from broswer)
  useEffect(() => {
    const data = localStorage.getItem('exercise-cart');
    if (data) {
      // console.log('I am saved exercise-cart data', data)
      setExerciseCart(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    // const getExercises = async () => {
    //   const response = await axios.request(apiExerciseByBodyPart);
    //   setExerciseData(response.data).catch((error) => {
    //     console.log(error.message);
    //   });
    // };
    // getExercises();

    // Saved exercise cart items to Local Storage (from browser)
    localStorage.setItem('exercise-cart', JSON.stringify(exerciseCart));
  }, [category]);

  const onAdd = (exercise) => {
    // console.log('INPUT: exercise param', exercise)
    const singleExercise = backExercises.find(erex => erex.id === exercise);
    // console.log('Match singleExercise', singleExercise)
    const exists = exerciseCart.find(erex => erex.id === exercise);
    if (exists) {
      return null;
    } else {
      setExerciseCart([...exerciseCart, { ...singleExercise }]);
      // setExerciseCart(prev => ({
      //    ...prev, ...singleExercise
      // }))
    }
  };


  const handleChangeInputSets = (event) => {
    const numberofSets = event.target.value;
    setSets(numberofSets);
    console.log(numberofSets);
  };

  const handleChangeInputReps = (event) => {
    const numberofReps = event.target.value;
    setReps(numberofReps);
    console.log(numberofReps);
  };


  const onSubmit = (event) => {
    event.preventDefault();
    const setsReps = {
      sets, reps
    };
    const workoutData = {
      workoutName,
    };

    const newWorkoutData = exerciseCart.map((workout) => {
      console.log("do you exist?", workoutData.workoutName);
      return ([
        workout.id,
        workout.name,
        workout.gifUrl,
        workout.bodyPart,
        workout.target,
        workoutData.workoutName,
        setsReps
      ]);
    });

    console.log(newWorkoutData);


    axios.put('http://localhost:8001/api/workouts', [workoutData, newWorkoutData])
      .then((res) => {
        console.log(res.data);
      }).catch((error) => {
        console.log(error);
      });
    // setnewWorkout({...exerciseCart})
  };
  console.log(onSubmit);

  // {data: JSON.stringify(workoutData),  headers: {'Content-Type': 'application/json'}}

  const onDelete = (exercise) => {
    setExerciseCart(
      exerciseCart.filter(item => item !== exercise)
    );
  };

  const exerciseItem = backExercises.map((exercise) => {

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

  return (
    <>
      <div className="topWrapper"></div>
      <div className="container-lg mt-4 pt-4">
        <div className="row noMrg justify-content-md-center">
          <div className="col-auto me-auto">
            <h3>Categories</h3>
            <ul className="nav flex-column">
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

          <div className="col-md-auto">
            {exerciseItem}
          </div>

          <div className="col col-lg-4">
            <div className="card d-grid">
              <div className="card-header background">
                <h4 className="card-title text-center capitalize ">Create Your Workout</h4>
              </div>
              <div>
                <input
                  type="text"
                  name="workout_name"
                  id="workout_id"
                  placeholder="Add Workout Name"
                  value={workoutName}
                  onChange={(event) => setWorkoutName(event.target.value)}
                  className="form-control w100 inputborder" />
              </div>
              <form >
                {exerciseCart.map((exercise) => {
                  return (
                    <div className="card-body w-0" key={exercise.id}>
                      <h5 className="capitalize">{exercise.name}</h5>
                      <div className="card-text flex align-items-center">
                        {/* <CreateWorkout label={"Sets"} /> */}
                        <div >
                          <label htmlFor="Sets" className="form-label">Sets</label>
                          <input
                            type="text"
                            sets={sets}
                            onChange={handleChangeInputSets}
                            className="form-control" />
                        </div>
                        <div>
                          <label htmlFor="Sets" className="form-label">Reps</label>
                          {/* <CreateWorkout label={"Reps"} /> */}
                          <input
                            type="text"
                            reps={reps}
                            onChange={handleChangeInputReps}
                            className="form-control" />
                        </div>
                        <button className="btn btn-primary" onClick={() => onDelete(exercise)}><FontAwesomeIcon icon={faTrash} /></button>
                      </div>
                      <div className="d-flex card-text justify-content-end">
                        {/*======= FOR REVIEW BY GABY============ */}
                        {/* <div>
                          <button type="submit" className="btn-sm" onClick={onSave}><FontAwesomeIcon icon={faPlus} /></button>
                        </div> */}
                        {/* <div>
                        <button type="submit" className="btn-sm"><FontAwesomeIcon icon={faTrash} /></button>
                      </div> */}
                        {/* ==================================== */}
                      </div>
                    </div>

                  );
                })}

                <div className="card-footer d-flex justify-content-between">
                  <div>
                    <button type="submit" className="btn btn-primary" onClick={onSubmit} ><FontAwesomeIcon icon={faHeart} /></button>
                  </div>
                  <button type="submit" className="btn btn-primary"><FontAwesomeIcon icon={faTrash} /></button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>


    </>
  );
};

