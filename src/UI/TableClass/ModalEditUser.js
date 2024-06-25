import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {patchUpdateUser } from '../../services/UserServices';
import { useState, useEffect } from 'react';
import {toast } from 'react-toastify';


const ModalEditUser = (props) => {
    const {show, handleClose, dataUserEdit,handleEditUserFromModal} = props
    const [Form,setForm] = useState({});
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [email,setEmail] = useState("")
    const [role,setRole] = useState("")
    const [job,setJob] = useState("")
    const [gender,setGender] = useState("")
    const [image,setImage] = useState("")
    const [dob,setDob] = useState("")
    const [phone,setPhone] = useState("")


const handleEditUser = async () => {
        console.log("Datauseredit >>>>", dataUserEdit)
        let res = await patchUpdateUser(dataUserEdit.id,localStorage.getItem("access_token"))
        console.log("Check res>>> ",res)
        if(res){
            handleEditUserFromModal({
                firstName: firstName,
                lastName: lastName,
                email: email,
                role: role,
                job: job,
                gender: gender,
                image: image,
                dob: dob,
                id: dataUserEdit.id
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
        console.log("Data User Edit>>>>",dataUserEdit)
        setFirstName(dataUserEdit.firstName)
        setLastName(dataUserEdit.lastName)
        setEmail(dataUserEdit.email)
        setRole(dataUserEdit.role)
        setJob(dataUserEdit.job)
        setGender(dataUserEdit.gender)
        setImage(dataUserEdit.image)
        setPhone(dataUserEdit.phone)
        setDob(dataUserEdit.dob)
    }
},[dataUserEdit])

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Edit a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div>
                <form>
                    <div class="form-group">
                        <label>FirstName</label>
                        <input
                            type="text"
                            className="form-control"
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label>LastName</label>
                        <input 
                            type="text" 
                            className="form-control"
                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input 
                            type="text" 
                            className="form-control"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label>Phone</label>
                        <input 
                            value={phone}
                            type="text" 
                            className="form-control"
                            onChange={(event) => setPhone(event.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label>Role</label>
                        <select 
                            value={role}
                            type="text" 
                            className="form-control"
                            onChange={(event) => setRole(event.target.value)}
                        >
                            <option value="ADMIN">Admin</option>
                            <option value="UPPER">Upper</option>
                            <option value="USER">User</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Job</label>
                        <input 
                            value={job}
                            type="text" 
                            className="form-control"
                            onChange={(event) => setJob(event.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label>Gender</label>
                        <select 
                            value={gender}
                            type="text" 
                            className="form-control"
                            onChange={(event) => setGender(event.target.value)}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Image</label>
                        <input 
                            value={image}
                            type="text" 
                            className="form-control"
                            onChange={(event) => setImage(event.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label>Date Of Birth</label>
                        <input 
                            value={dob}
                            type="Date" 
                            className="form-control"
                            onChange={(event) => setDob(event.target.value)}
                        />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
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

export default ModalEditUser;
