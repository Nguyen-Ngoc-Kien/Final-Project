import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PostCreateJob } from '../../services/UserServices';
import { useState } from 'react';
import {toast } from 'react-toastify';


const ModalAddnew = (props) => {
    const {show, handleClose} = props
    const [Form,setForm] = useState({})
    
    const onChangeHandler = (event) => {
        setForm({
            ...Form,
            [event.target.name]:event.target.value
        })
    }

    const handleSaveUser = async () => {
        console.log("Form >>>",Form)
        let res = await PostCreateJob(Form,localStorage.getItem("access_token"));
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
                <Modal.Title>Add new Job</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div>
                <form>
                    <div class="form-group">
                        <label>jobName</label>
                        <input
                            name='jobName'
                            type="text"
                            className="form-control"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <input
                            name='description'
                            type="text"
                            className="form-control"
                            onChange={onChangeHandler}
                        />
                    </div>
                </form>
                </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleSaveUser()}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default ModalAddnew;
