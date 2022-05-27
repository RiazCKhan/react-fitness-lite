import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExerciseList from "./components/ExerciseList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WorkoutList from "./components/WorkoutList";
import EditWorkout from "./components/EditWorkout";
import SignUp from "./components/SignUp";
// import Profile from "./components/Profile";
// import WorkoutsListsItems from "./components/WorkoutsListsItems";

function App() {

  return (
    <BrowserRouter>
      <>
        <Navbar />
      </>
      <Routes>
        <Route path="/" element={<SignUp/>} />
        <Route path="/exercises/:category" element={<ExerciseList />} />
        <Route path="/editworkout" element={<EditWorkout />} />
        <Route path="/workouts" element={<WorkoutList />} />
        {/* <Route path="/workoutListsItems" element={<WorkoutsListsItems/>}/> */}
        {/* <Route path="/profile" element={<Profile />} /> */}
      </Routes>
      <>
        <Footer />
      </>
    </BrowserRouter>
  );
}
export default App;
