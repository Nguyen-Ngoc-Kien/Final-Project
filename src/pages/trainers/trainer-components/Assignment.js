import React, { useEffect, useState } from 'react';
import imgForest from './../../../data/image/Forestry-College-in-Tehri-Garhwal.png'
import { fetchAssignmentById } from '../../../services/UserServices';
import { Link } from 'react-router-dom';
function HandleClick(){
    const [toggle, setToggle] = useState(false)
    const [click, setClick] = useState(true)
    const [assignment,setAssignment] = useState([])
    const HandleClick = () => {
        setClick(() => {
            return !click
        })
    }
    const HandleToggle = () => {
        console.log("Click")
        setToggle(() => {
            return !toggle
        })
    }

    useEffect(() => {
        getAssignmentById()
    },[])
    const getAssignmentById = async () => {
        const res = await fetchAssignmentById(localStorage.getItem("idAssignment"),localStorage.getItem("access_token"))
        console.log("check res123 >>>",res)
        setAssignment(res)
    }
    return(
        <div className='body'>
            <div className='background'>
            <div className='content'>
            <div className='title-content-assignment'>
                <div className='icon-background-title'>
                    <i class="fas fa-book"></i>
                </div>
                <div className='text-assignment'>
                    <span className='title-span-assignment'>Bài tập lớn</span>
                    <span className='title-span-assignment-2'>Tầm Quan Trọng Của Vệ Sinh Răng Miệng</span>
                </div>
            </div>
            <div className='Link-detail-class-upper w-1347'>
                Lớp học của tôi / Kỹ Thuật Xét Nghiệm Vi Sinh Lâm Sàng / Tạo bài tập lớn
            </div>
            <div className='layer-top-upper-detail-class'>
                <Link to='/assignment' className='two-layer-detail-class-upper bg-active'>
                    <i class="fas fa-file-alt course-detail"></i>
                    <span className='title-detail-class-upper'>NỘI DUNG</span>
                </Link>
                <Link to='/mark' className='two-layer-detail-class-upper'>
                    <i class="fas fa-cog cdetail course-detail"></i>
                    <span className='title-detail-class-upper'>CHẤM ĐIỂM</span>
                </Link>
            </div>
            <div className='content-course-detail'>
                <div className="view-course-detail-1 w-1347" onClick={() => HandleToggle()}>
                    <i class={`fas fa-chevron-up add-assign-detail-icon-2 ${toggle ? "truotlen" : "truotxuong"}`}></i>
                    <i class={`fas fa-chevron-down course-detail-icon-3 ${toggle ? "hien" : "hide"}`}></i>
                    <span className='title-course-detail'>Nội dung</span>
                    </div>
                    <div className={`${toggle ? "truotlen-4" : "truotxuong"}`}>
                        <div className='content-assignment'>
                            <span className='description-assignment'>Mô tả:</span>
                            <span className='description-assignment-2'>Tầm quan trọng của vệ sinh răng miệng</span>
                            <span className='description-assignment-3'>Hướng dẫn:</span>
                            <span className='description-assignment-2'>Tầm quan trọng của vệ sinh răng miệng</span>
                            <hr className='hr-assignment-content'></hr>
                            <span className='description-assignment-5'>Thời gian mở:</span>
                            <span className='description-assignment-6'>07:00:47 25/12/2023</span>
                            <span className='description-assignment-7'>Thời gian kết thúc:</span>
                            <span className='description-assignment-8'>07:00:47 30/12/2023</span>
                            <hr className='hr-assignment-content'></hr>
                            <span className='description-assignment-9'>Dạng bài tập:</span>
                            <div className='description-assignment-status'>Bài tập lớn</div>
                            <div className='notification-assignment-description'>Chưa bắt đầu</div>
                        </div>
                </div>
            </div>
            </div>
        </div>
     </div>
    )
}
const Assignment = () => {
    return (
        <div>
            {HandleClick()}
        </div>

    );
};

export default Assignment;