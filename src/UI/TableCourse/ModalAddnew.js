import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PostCreateCourse, fetchAllDepartment } from '../../services/UserServices';
import { useEffect, useState } from 'react';
import {toast } from 'react-toastify';
import Select from 'react-select';

const ModalAddnew = (props) => {
    const {show, handleClose} = props
    const [Form,setForm] = useState({})
    const [courseName,setCourseName] = useState("")
    const [departmentId,setDepartmentId] = useState("")
    const [credit,setCredit] = useState(null)
    const [description,setDescription] = useState("")
    const [totalSession,setTotalSession] = useState(null)
    const [listDepartment,setListDepartment] = useState([]);
    const onChangeHandler = (event) => {
        setForm({
            ...Form,
            [event.target.name]:event.target.value
        })
    }
    useEffect(() => {
        getAllDepartment()
    },[])
    const getAllDepartment = async (page) => {
        const res = await fetchAllDepartment(page,localStorage.getItem("access_token"))
        // console.log("check res >>>",res)
        if(res && res.length > 0){
            let newDepartment = res.map(item => {
                // console.log("item >>>",item)
                return{
                    value: item.id,
                    label: item.name
                }
            })
            setListDepartment(newDepartment)
        }
        // console.log("listDepartment",listDepartment)
    }
    const handleSaveCourse = async () => {
        console.log(Form)
        let res = await PostCreateCourse({
            "courseName" :courseName,
            "departmentId" :departmentId,
            "credit" :credit,
            "description" :description,
            "totalSession" :totalSession,
        },localStorage.getItem("access_token"));
        console.log("check res ==> ", res)
        if(res){
            handleClose();
            toast.success("A user created succeed!")
        }
        else{
            toast.error("An ERROR...  ")
            handleClose();
            //error
        }
    }
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add new Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div>
                <form>
                    <div class="form-group">
                        <label>courseName</label>
                        <input
                            name='courseName'
                            type="text"
                            className="form-control"
                            onChange={(event) => setCourseName(event.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label>department</label>
                        <Select
                        options={listDepartment}
                        onChange={(event) => setDepartmentId(event.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label>credit</label>
                        <input 
                            name='credit'
                            type="text" 
                            className="form-control"
                            onChange={(event) => setCredit(event.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label>description</label>
                        <input 
                            name='description'
                            type="text" 
                            className="form-control"
                            onChange={(event) => setDescription(event.target.value)}
                        />
                    </div>                        
                    <div class="form-group">
                        <label>totalSession</label>
                        <input 
                            name='totalSession'
                            type="text" 
                            className="form-control"
                            onChange={(event) => setTotalSession(event.target.value)}
                        />
                    </div>
                </form>
                </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleSaveCourse()}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default ModalAddnew;
