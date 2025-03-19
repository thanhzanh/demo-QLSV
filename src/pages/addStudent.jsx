import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import moment from 'moment';
import axios from "axios";

const AddStudent = ({ show, handleClose, reloadData, selectedStudent }) => {
    const [student, setStudent] = useState({
        id: "",
        ma_sv: "",
        ho_ten: "",
        ngay_sinh: "",
        gioi_tinh: "Nam",
        email: "",
        ma_lop: ""
    });

    useEffect(() => {
        console.log("Dữ liệu sinh viên khi sửa:", selectedStudent);
        if (selectedStudent) {
            setStudent(selectedStudent);
        } else {
            setStudent({
                id: "",
                ma_sv: "",
                ho_ten: "",
                ngay_sinh: "",
                gioi_tinh: "Nam",
                email: "",
                ma_lop: ""
            });
        }
    }, [selectedStudent]);

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!student.ma_sv || !student.ho_ten || !student.email || !student.ma_lop) {
            setError("Vui lòng nhập đầy đủ thông tin!");
            return;
        }
        console.log(student.id);
        try {
            
            if (selectedStudent) {
                await axios.put(`https://67da20eb35c87309f52b0f6e.mockapi.io/students/${student.id}`, student);
            } else {
                await axios.post("https://67da20eb35c87309f52b0f6e.mockapi.io/students", student);
            }

            handleClose(); // Đóng form sau khi thêm/sửa
            reloadData(); // Load lại danh sách sinh viên
        } catch (error) {
            setError("Mã sinh viên đã tồn tại");
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{selectedStudent ? "Sửa Sinh Viên" : "Thêm Sinh Viên"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <div className="alert alert-danger">{error}</div>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>MSSV</Form.Label>
                        <Form.Control type="text" name="ma_sv" value={student.ma_sv} onChange={handleChange} required disabled={!!selectedStudent} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Họ tên</Form.Label>
                        <Form.Control type="text" name="ho_ten" value={student.ho_ten} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Ngày sinh</Form.Label>
                        <Form.Control type="date" name="ngay_sinh" value={student.ngay_sinh ? moment(student.ngay_sinh).format("YYYY-MM-DD") : ""} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Giới tính</Form.Label>
                        <Form.Select name="gioi_tinh" value={student.gioi_tinh} onChange={handleChange}>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" value={student.email} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Mã lớp</Form.Label>
                        <Form.Control type="text" name="ma_lop" value={student.ma_lop} onChange={handleChange} required />
                    </Form.Group>

                    <Button variant="success" type="submit">
                        {selectedStudent ? "Cập nhật" : "Thêm Sinh Viên"}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddStudent;
