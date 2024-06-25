import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {patchUpdateJob } from '../../services/UserServices';
import { useState, useEffect } from 'react';
import {toast } from 'react-toastify';


const ModalEditDepartment = (props) => {
    const {show, handleClose, dataUserEdit,handleEditUserFromModal} = props
    const [jobName,setJobName] = useState("")
    const [description,setDescription] = useState("")


const handleEditUser = async () => {
        // console.log("Datauseredit >>>>", dataUserEdit)
        // console.log("local >>>",localStorage.getItem("access_token"))
        let res = await patchUpdateJob(dataUserEdit.id,localStorage.getItem("access_token"),{
            "jobName": jobName,
            "description": description
        })
        console.log("Check res>>> ",res)
        if(res){
            handleEditUserFromModal({
                id: dataUserEdit.id,
                jobName: jobName,
                description: description,
            })
            
            toast.success("Update Success")
            // success
        }
        else{
            toast.error("Error Update")
            //error
        }
    }

useEffect(() => {
    if(show){
        // console.log("Data User Edit>>>>",dataUserEdit)
        setJobName(dataUserEdit.jobName)
        setDescription(dataUserEdit.description)
    }
},[dataUserEdit])

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Edit a Job</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div>
                <form>
                    <div class="form-group">
                        <label>jobName</label>
                        <input
                            type="text"
                            className="form-control"
                            value={jobName}
                            onChange={(event) => setJobName(event.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label>description</label>
                        <input 
                            type="text" 
                            className="form-control"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />
                    </div>
                </form>
                </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleEditUser()}>
                    Confirm
                </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default ModalEditDepartment;
