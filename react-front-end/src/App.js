import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExerciseList from "./components/ExerciseList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WorkoutList from "./components/WorkoutList";
import EditWorkout from "./components/EditWorkout";
import SignUp from "./components/SignUp";


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
      </Routes>
      <>
        <Footer />
      </>
    </BrowserRouter>
  );
}
export default App;
