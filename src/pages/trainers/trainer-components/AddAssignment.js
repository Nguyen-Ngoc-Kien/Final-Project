import { useEffect, useState } from 'react';
import { fetchAllLevel, postCreateAssignment } from '../../../services/UserServices';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const AddAssignment = (props) => {
    const [topicId,setTopicId] = useState(localStorage.getItem("idTopic"))
    const [name,setName] = useState('');
    const [timeStart,setTimeStart] = useState(null);
    const [timeEnd,setTimeEnd] = useState(null);
    const [dueAt,setDueAt] = useState(null);
    const [weight,setWeight] = useState(null);
    const [description,setDescription] = useState('');
    const [instruction,setInstruction] = useState('');
    const [assignmentFile,setAssignmentFile] = useState(null);
    // const [type,setType] = useState('EASY');
    let Form = {
        "topicId": topicId,
        "name": name,
        "dueAt": dueAt,
        "weight": weight,
        "startAt": timeStart,
        "endAt": timeEnd,
        "description" : description,
        "instruction" : instruction,
        "assignmentFile" : assignmentFile
    }
    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Lấy file đầu tiên trong danh sách đã chọn
        console.log("file >>>",file)
        setAssignmentFile(file);
      };
    const handleSubmitQuiz =  async() => {
        if(!topicId || !name || !timeStart || !timeEnd || !dueAt || !weight || !description || !instruction || !assignmentFile){
            toast.error("Required Fill On Full Information")
            return;
        }
        if(weight < 0 || weight > 1){
            toast.error("Required Weight from 0.0 to 1.0")
            return;
        }

        console.log("Form >>>",Form)
        let res = await postCreateAssignment(Form,localStorage.getItem("access_token"))
        console.log("check res ass >>>", res)
        if(res > 0){
            toast.success("Create Success")
            setName('')
            setTopicId(0)
            setTimeStart(null)
            setTimeEnd(null)
            setDueAt(null)
            setWeight(0)
            setDescription('')
            setInstruction('')
            setAssignmentFile(null)
        }
        console.log("check res >>>",res)
    }
    return(
        <div className='container'>
            <div className="quiz-container-manager">
                <div className="title-quiz-manager">
                        Manage Assignment
                </div>
                <hr/>
                <div className="add-new">

                <fieldset className="border rounded-3 p-3" >
                    <legend className="float-none w-auto px-3">Add New Assignment</legend>
                <div className="form-floating mb-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Topic ID"
                    value={localStorage.getItem("idTopic")}           
                    />
                    <label>Topic ID</label>
                </div>
                <div className="form-floating mb-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Your Assignment Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}                  
                    />
                    <label>Assignment Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Weight"
                    value={weight}
                    onChange={(event) => setWeight(event.target.value)}    
                    />
                    <label >Weight(From 0.0 to 1.0)</label>
                </div>
                <div className="form-floating mb-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}    
                    />
                    <label >Description</label>
                </div>
                <div className="form-floating mb-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="instruction"
                    value={instruction}
                    onChange={(event) => setInstruction(event.target.value)}    
                    />
                    <label >Instruction</label>
                </div>
                <div className="form-floating mb-3 three-layer">
                    <div className='time'>
                    <label >StartAt</label>
                        <input 
                        type="datetime-local" 
                        className="form-control" 
                        placeholder="StartAt"
                        value={timeStart}
                        onChange={(event) => setTimeStart(event.target.value)}    
                        />
                    </div>
                    <div className='time'>
                    <label >EndAt</label>
                        <input 
                        type="datetime-local" 
                        className="form-control" 
                        placeholder="EndAt"
                        value={timeEnd}
                        onChange={(event) => setTimeEnd(event.target.value)}    
                        />
                    </div>
                    <div className='time'>
                    <label >dueAt</label>
                        <input 
                        type="datetime-local" 
                        className="form-control" 
                        placeholder="dueAt"
                        value={dueAt}
                        onChange={(event) => setDueAt(event.target.value)}    
                        />
                    </div>
                </div>
                <div className='mt-4'>
                <input 
                    type="file" 
                    className="form-control" 
                    onChange={handleFileChange}
                />
                </div>
                <div className="form-floating mb-3">
                </div>
                <div className="form-floating mb-3">
                </div>
                <div className="form-floating mb-3">
                </div>
                <div className='my-3'>
                </div>
                <div className='mt-3'>
                    <button 
                    className='btn btn-warning' 
                    onClick={() => handleSubmitQuiz()}
                    >Save</button>
                </div>
                </fieldset>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        </div>

    )
}

export default AddAssignment;