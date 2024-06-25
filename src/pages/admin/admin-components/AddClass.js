import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { fetchAllDepartment, fetchAllCourse, fetchAllUser, fetchAllCurriculum, PostCreateClass } from '../../../services/UserServices';
import Select from 'react-select';
import { toast } from 'react-toastify';

const AddClass = () => {
    const listDay = [
        { value: 'Thứ 2', label: 'Thứ 2' },
        { value: 'Thứ 3', label: 'Thứ 3' },
        { value: 'Thứ 4', label: 'Thứ 4' },
        { value: 'Thứ 5', label: 'Thứ 5' },
        { value: 'Thứ 6', label: 'Thứ 6' },
        { value: 'Thứ 7', label: 'Thứ 7' },
        { value: 'Chủ nhật', label: 'Chủ nhật' },
      ];
    const [listDepartment,setListDepartment] = useState([]);
    const [listCourse,setListCourse] = useState([]);
    const [listTrainer,setListTrainer] = useState([]);
    const [listTrainee,setListTrainee] = useState([]);
    const [listCurriculum,setListcurriculum] = useState([]);
    const [departmentId,setDepartmentId] = useState(null);
    const [courseId,setCourseId] = useState(null);
    const [trainer,setTrainer] = useState(null);
    const [trainee,setTrainee] = useState([]);
    const [curriculum,setCurriculum] = useState(null);
    const [className,setClassName] = useState('');
    const [startDate,setStartDate] = useState(null);
    const [endDate,setEndDate] = useState(null);
    const [startTime,setStartTime] = useState(null);
    const [endTime,setEndTime] = useState(null);
    const [minQuantity,setMinQuantity] = useState(null);
    const [maxQuantity,setMaxQuantity] = useState(null);
    const [allowRegister,setAllowRegister] = useState(true);
    const [schedules,setSchedules] = useState([]);
    const [schedule,setSchedule] = useState([]);
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
    const getAllCourse = async (page) => {
        const res = await fetchAllCourse(page,localStorage.getItem("access_token"))
        // console.log("check res1 >>>",res)
        if(res && res.length > 0){
            let newCourse = res.map(item => {
                // console.log("item >>>",item)
                return{
                    value: item.id,
                    label: item.courseName
                }
            })
            setListCourse(newCourse)
        }
        // console.log("listDepartment",listDepartment)
    }
    const getTrainer = async (page) => {
        const res = await fetchAllUser(page,localStorage.getItem("access_token"))
        // console.log("check res1 >>>",res)
        if(res && res.length > 0){
            let newUser = res
            .filter(item => item.role === 'TRAINER' && item.isDeleted === false)
            .map(item => ({
                value: item.id,
                label: item.firstName
            }))
            setListTrainer(newUser)
        }
        // console.log("setListTrainer",setListTrainer)
    }
    const getTrainee = async (page) => {
        const res = await fetchAllUser(page,localStorage.getItem("access_token"))
        // console.log("check res1 >>>",res)
        if(res && res.length > 0){
            let newUser = res
            .filter(item => item.role === 'TRAINEE' && item.isDeleted === false)
            .map(item => ({
                value: item.id,
                label: item.firstName
            }))
            setListTrainee(newUser)
        }
        // console.log("setListTrainer",setListTrainer)
    }
    const getAllCurriculum = async (page) => {
        const res = await fetchAllCurriculum(page,localStorage.getItem("access_token"))
        // console.log("check res1 >>>",res)
        if(res && res.length > 0){
            let newCurriculum = res.map(item => {
                // console.log("item >>>",item)
                return{
                    value: item.id,
                    label: item.curriculumName
                }
            })
            setListcurriculum(newCurriculum)
        }
        // console.log("listDepartment",listDepartment)
    }
    useEffect(() => {
        getAllDepartment()
        getAllCourse()
        getTrainer()
        getAllCurriculum()
        getTrainee()
    },[])
    const changeTitle = (event) => {
        console.log(event.target.value)
    }
    const handleSubmit = async () => {
        console.log("m>>>",minQuantity)
        const Form = {
            "courseId": courseId,
            "curriculumId": curriculum,
            "className": className,
            "trainerId": trainer,
            "startDate": startDate,
            "endDate": endDate,
            "minQuantity": minQuantity,
            "maxQuantity": maxQuantity,
            "allowedRegister": allowRegister,
            "schedules": [
                {
                    "schedule" : "Monday",
                    "startTime" : "T14:48:00",
                    "endTime" : "T14:43:00"
                }
            ],
            "trainees": [
                {
                    "traineeId" : 5
                }
            ]
        }
        const res = await PostCreateClass(Form,localStorage.getItem("access_token"))
        console.log("res >>>",res)
        if(res){
            toast.success("Create Success")
        }
        else{
            toast.error("ERROR")
        }
    }
    return (
        <div className='body'>
        <div className='background'>
          <div className='content'>
          <div className='form-content'>
            <div className='addClass'>
                <div className='layer-input form-group'>
                    <div class="form-group">
                        <label>Khoa</label>
                        <Select
                        options={listCourse}
                        onChange={(event) => setCourseId(event.value)}
                        />
                    </div> 
                </div>   
                <div className="layer-input form-group">
                <div class="form-group">
                        <label>Khóa học</label>
                        <Select
                        options={listDepartment}
                        onChange={(event) => setDepartmentId(event.value)}
                        />
                    </div>  
                </div>             
                <div className="layer-input form-group">
                    <div class="form-group">
                        <label>Tên lớp</label>
                        <input
                            name='className'
                            type="text"
                            className="form-control"
                            onChange={(event) => setClassName(event.target.value)}
                        />
                    </div>
                </div>
                <div className="layer-input form-group">
                <div class="form-group">
                        <label>Người hướng dẫn</label>
                        <Select
                        options={listTrainer}
                        onChange={(event) => setTrainer(event.value)}
                        />
                    </div>  
                </div>
                <div className="layer-input form-group-1">
                <div class="form-group">
                        <label>Khung chương trình</label>
                        <Select
                        options={listCurriculum}
                        onChange={(event) => setCurriculum(event.value)}
                        />
                    </div> 
                </div>
                <div className='layer-input-f'>
                    <br/>
                    <div class="form-group ml-8">
                        <label>Ngày bắt đầu</label>
                        <input 
                            name='timeStart'
                            type="date" 
                            className="form-control w-80"
                            onChange={(event) => setStartDate(event.target.value)}
                        />
                    </div>
                    <div class="form-group ml-8">
                        <label>Ngày kết thúc</label>
                        <input 
                            name='timeEnd'
                            type="date" 
                            className="form-control w-80"
                            onChange={(event) => setEndDate(event.target.value)}
                        />
                    </div>
                </div>
                <div className="layer-input w-100">
                <div className="form-floating mb-3 three-layer">
                    <div className='time'>
                    <label >Số lượng học viên tối thiểu</label>
                    <input 
                    type="number" 
                    min = {0}
                    className="form-control" 
                    onChange={(event) => setMinQuantity(event.target.value)}
                    />
                    </div>
                    <div className='time'>
                    <label >Số lượng học viên tối đa</label>
                    <input 
                    type="number" 
                    min = {0}
                    className="form-control" 
                    onChange={(event) => setMaxQuantity(event.target.value)}
                    />
                    </div>
                    <div className='display-flex'>
                        <button className='btn btn-primary'>Thêm học viên bằng excel</button>
                        <p className='text-side'>số lượng học viên 0/15</p>
                    </div>
                </div>
                </div>
                <div className="layer-input form-group-2">
                <label>Cho phép đăng ký</label>
                <input  
                        className="form-check" 
                        type="checkbox"
                        checked={allowRegister}
                        onChange={() => setAllowRegister(!allowRegister)}
                /> 
                </div>

                <br></br>
                <div className="layer-input form-group">
                    <label>Học viên</label>
                        <Select
                        options={listTrainee}
                        onChange={(event) => setTrainee(event.value)}
                        />
                    </div>
                <div className='layer-input layer-input-flex'>
                    <br/>
                    <div className='time1'>
                        <div class="form-group">
                            <label>Giờ bắt đầu</label>
                            <input 
                                name='timeEnd'
                                type="time" 
                                className="form-control"
                                onChange={(event) => setStartTime(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className='time1'>
                        <div class="form-group">
                            <label>Giờ kết thúc</label>
                            <input 
                                name='timeEnd'
                                type="time" 
                                className="form-control"
                            onChange={(event) => setEndTime(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className='time1'>
                        <div class="form-group">
                            <label>Thứ</label>
                            <Select
                            options={listDay}
                            onChange={(event) => setSchedule(event.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className='icon-add'>
                    <i class="fas fa-plus-circle add"></i>
                </div>
                <div>
                    <button className='btn btn-primary ml-4' onClick={() => handleSubmit()}>Tạo</button> 
                </div>
            </div>
        </div>
          </div>
        </div>
      </div>
    );
};

export default AddClass;