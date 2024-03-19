import { Route, Routes, Navigate } from "react-router-dom";
//import Main from "./components/Main";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import Header from "./components/Header";
import DoctorDashboard from "./components/DoctorDashboard";
import Precautions from "./components/Precautions";
import PatientDashboard from "./components/PatientDashboard";
import InstructionsForm from "./components/InstructionsForm";
import VisitSummary from "./components/VisitSummary";

function App() {
	const user = localStorage.getItem("userId");

	return (
		<Routes>
			{/* {user && <Route path="/" exact element={<Header />} />} */}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			{/* {user && <Route path="/doctor" exact element={<DoctorDashboard />} />}
			{user && <Route path="/precautions" exact element={<Precautions />} />}
			{user && <Route path="/patient" exact element={<PatientDashboard />} />}
			{user && <Route path="/instructions" exact element={<InstructionsForm />} />}
			{user && <Route path="/visit-summary" element={<VisitSummary />} />} */}
			<Route path="/doctor" exact element={<DoctorDashboard />} />
			<Route path="/precautions" exact element={<Precautions />} />
			<Route path="/patient" exact element={<PatientDashboard />} />
			<Route path="/instructions" exact element={<InstructionsForm />} />
			<Route path="/visit-summary" element={<VisitSummary />} />

		</Routes>
	);
}

export default App;