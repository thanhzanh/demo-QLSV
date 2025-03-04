import { useEffect, useState } from "react";
import { deleteStudent, getAllStudents } from "../services/studentService";
import Table from "react-bootstrap/Table";
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddStudent from "./AddStudent";

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setSelectedStudent(null); // Reset dữ liệu khi đóng modal
    };

    const handleShow = () => setShow(true);

    useEffect(() => {
        loadStudents();
    }, []);

    // Load danh sách sinh viên
    const loadStudents = async () => {
        const data = await getAllStudents();
        setStudents(data);
    };

    // Xóa sinh viên
    const handleDelete = async (ma_sv) => {
        if (window.confirm("Bạn có muốn xóa sinh viên này?")) {
            await deleteStudent(ma_sv);
            loadStudents();
        }
    };

    // Cập nhật sinh viên
    const handleUpdate = (student) => {
        setSelectedStudent(student); // Lưu sinh viên cần sửa
        handleShow(); // Mở modal
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center text-primary mb-2 title">Danh Sách Sinh Viên</h2>

            <button className="btn btn-success btnThemSinhVien" onClick={() => {
                setSelectedStudent(null); // Reset dữ liệu trước khi thêm mới
                setShow(true);
            }}>
                Thêm Sinh Viên
            </button>

            <Table striped bordered hover responsive className="shadow-sm mt-3">
                <thead>
                    <tr>
                        <th>MSSV</th>
                        <th>Họ tên</th>
                        <th>Ngày sinh</th>
                        <th>Giới tính</th>
                        <th>Email</th>
                        <th>Mã lớp</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.ma_sv}>
                            <td>{student.ma_sv}</td>
                            <td>{student.ho_ten}</td>
                            <td>{moment(student.ngay_sinh).format('DD-MM-YYYY')}</td>
                            <td>{student.gioi_tinh}</td>
                            <td>{student.email}</td>
                            <td>{student.ma_lop}</td>
                            <td className="text-center">
                                <button className="btn btn-warning btn-sm mx-1" onClick={() => handleUpdate(student)}>
                                    <FontAwesomeIcon icon={faEdit} /> Sửa
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(student.ma_sv)}>
                                    <FontAwesomeIcon icon={faTrash} /> Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <AddStudent show={show} handleClose={handleClose} reloadData={loadStudents} selectedStudent={selectedStudent} />
        </div>
    );
};

export default StudentList;
