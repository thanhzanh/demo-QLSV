import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentList from "../pages/studentList";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<StudentList />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
