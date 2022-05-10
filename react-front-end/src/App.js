// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Categories from "./components/Categories";
import ExerciseList from "./components/ExerciseList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WorkoutList from "./components/WorkoutList";
import EditWorkout from "./components/EditWorkout";
// import Profile from "./components/Profile";
// import SignUp from "./components/SignUp";
// import WorkoutsListsItems from "./components/WorkoutsListsItems";

function App() {

  return (
    <BrowserRouter>
      <>
        <Navbar />
      </>
      <Routes>
        <Route path="/" element={<Categories />} />
        <Route path="/exercises/:category" element={<ExerciseList />} />
        <Route path="/editworkout" element={<EditWorkout />} />
        <Route path="/workouts" element={<WorkoutList />} />
        {/* <Route path="/workoutListsItems" element={<WorkoutsListsItems/>}/> */}
        {/* <Route path="/profile" element={<Profile />} /> */}
        {/* <Route path="/Signup" element={<SignUp/>} /> */}
      </Routes>
      <>
        <Footer />
      </>
    </BrowserRouter>
  );
}
export default App;
