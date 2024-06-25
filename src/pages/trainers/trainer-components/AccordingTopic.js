import { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { fetchAllTopicCoursebyId, fetchQuizTopicById, fetchAssignmentTopicById } from '../../../services/UserServices';
import _ from 'lodash';
import {ToastContainer, toast } from 'react-toastify';
import ModalConfirm from '../../../UI/TableTopic/ModalConfirm';
import ModalEditTopic from '../../../UI/TableTopic/ModalEditTopic';
import ModalConfirmQuiz from '../../../UI/TableQuiz/ModalConfirm'
import ModalConfirmAssignemt from '../../../UI/TableAssignment/ModalConfirm'
import ModalEditQuiz from '../../../UI/TableQuiz/ModalEditQuiz';

const ContentGrade = (props) => {
    const {toggle,listTopic} = props
    // console.log("toggle >>>",toggle)
    // console.log("item Topic 1>>>",item)
    const [listUser,setListUser] = useState([]);
    const [listQuiz,setListQuiz] = useState([]);
    const [listAssignment,setListAssignment] = useState([]);
    const [isShowModalAddNew,setIsShowModalAddNew] = useState(false);
    const [isShowModalAddNewAct,setIsShowModalAddNewAct] = useState(false);
    const [isShowModalDelete,setIsShowModalDelete] = useState(false);
    const [isShowModalDeleted,setIsShowModalDeleted] = useState(false);
    const [dataUserDelete,setDataUserDelete] = useState({});
    const [dataQuizDelete,setDataQuizDelete] = useState({});
    const [dataAssignmentDelete,setDataAssignmentDelete] = useState({});
    const [isShowModalEdit,setIsShowModalEdit] = useState(false);
    const [isShowModalEdited,setIsShowModalEdited] = useState(false);
    const [dataUserEdit,setDataUserEdit] = useState({});
    const [dataQuizEdit,setDataQuizEdit] = useState({});
    const [idTopic,setIdTopic] = useState({});
    const [quizTopic,setQuizTopic] = useState([])
    const [assignmentTopic,setAssignmentTopic] = useState([])
    // const [click, setClick] = useState(true)
    // const HandleClick = () => {
    //   console.log("Click")
    //   setClick(() => {
    //       return !click
    //   })
    // }
    const handleclosed = () => {
        setIsShowModalAddNew(false);
        setIsShowModalDelete(false)
        setIsShowModalDeleted(false)
        setIsShowModalAddNewAct(false)
        setIsShowModalEdit(false)
        setIsShowModalEdited(false)
    }

    const handleDeleteUser = (event,user) => {
        event.preventDefault();
        setIsShowModalDelete(true)
        setDataUserDelete(user)
    }

    const handleDeleteUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUser);
        cloneListUsers = cloneListUsers.filter(item => item.id !== user.id)
        console.log("cloneListUsers >>>",cloneListUsers)
        setListUser(cloneListUsers);
        handleclosed();
        toast.success("Update completely!")    
      }

      const handleDeleteQuiz = (event,item) => {
        event.preventDefault();
        setIsShowModalDeleted(true)
        setDataQuizDelete(item)
        console.log("data Quiz delete >>>",dataQuizDelete)
    }

    const handleDeleteQuizFromModal = (user) => {
        let cloneListQuizs = _.cloneDeep(listQuiz);
        cloneListQuizs = cloneListQuizs.filter(item => item.id !== user.id)
        console.log("cloneListQuiz >>>",cloneListQuizs)
        setListQuiz(cloneListQuizs);
        handleclosed();
        toast.success("Update completely!")    
      }

      const handleDeleteAssignment = (event,item) => {
        event.preventDefault();
        setIsShowModalDeleted(true)
        setDataAssignmentDelete(item)
        console.log("data Assignment delete >>>",dataAssignmentDelete)
    }

    const handleDeleteAssignmentFromModal = (user) => {
        let cloneListAssignments = _.cloneDeep(listAssignment);
        cloneListAssignments = cloneListAssignments.filter(item => item.id !== user.id)
        console.log("clonelistAssignment >>>",cloneListAssignments)
        setListAssignment(cloneListAssignments);
        handleclosed();
        toast.success("Update completely!")    
      }

      const handleEditUserFromModal = (user) => {
        console.log("user123 >>>",user)
        console.log("listTopic >>>",listUser)
        let cloneListUsers = _.cloneDeep(listTopic);
        let index = listTopic.findIndex(item => item.id === user.id)
        cloneListUsers[index].topicName = user.topicName;
        setListUser(cloneListUsers);
        handleclosed();
        toast.success("Update completely!")
      }
      const handleEditUser = (user) => {
        // console.log("list user >>>>",listUser)
        // console.log("User >>>", user)
        setDataUserEdit(user)
        setIsShowModalEdit(true)
      }

      const handleEditQuizFromModal = (user) => {
        // console.log("user123 >>>",user)
        // console.log("listTopic >>>",listUser)
        let cloneQuizUsers = _.cloneDeep(listQuiz);
        let index = listQuiz.findIndex(item => item.id === user.id)
        setListQuiz(cloneQuizUsers);
        handleclosed();
        toast.success("Update completely!")
      }

      const handleEditQuiz = (event,user) => {
        event.preventDefault();
        // console.log("list user >>>>",listUser)
        // console.log("User >>>", user)
        setDataQuizEdit(user)
        setIsShowModalEdited(true)
      }

      const handleOnClickShowDetail = async (id,item) => {
        // localStorage.removeItem(`quizId-${id}`)
        // console.log("item >>>",item)
        const res = await fetchQuizTopicById(id,localStorage.getItem("access_token"))
        const res1 = await fetchAssignmentTopicById(id,localStorage.getItem("access_token"))
        console.log("res1 >>>",res1)
        setQuizTopic(res);
        setAssignmentTopic(res1);
        // console.log("Quiz topic >>>",quizTopic)
      }
      const handleClickQuiz = (idQuiz,topicId) => {
        localStorage.setItem("idQuiz",idQuiz)
        localStorage.setItem("TopicId",topicId)
      }
      const handleClickAssignment = (idAssignment) => {
        localStorage.setItem("idAssignment",idAssignment)
      }
  return (
    <div>
    <Accordion>
    {listTopic && listTopic.length > 0 &&
        listTopic.map((item,index) => {
            if(listTopic[index].isDeleted === false){
                return(
                <div key={`topic-${index}`}>
                    <Accordion.Item eventKey={`${index}`} onClick={() => handleOnClickShowDetail(item.id,item)}>
                        <Accordion.Header>                
                                    <div className="two-layer-top view-course-detail" >
                                    <span className='title-course-detail'>{item.topicName}</span>
                                    <i className={`fas fa-pencil-alt icon-pencil-vcd ${toggle ? 'hide' : 'hien'}`} onClick={() => handleEditUser(item)}></i>
                                    <i className={`fas fa-trash-alt icon-trash-vcd ${toggle ? 'hide' : 'hien'}`}  onClick={(event) => handleDeleteUser(event,item)}></i>
                                    </div>
                        </Accordion.Header>
                        <Accordion.Body>
                        <div className='content-course-detail'>
                        {quizTopic.length === 0 && (
                            <div className={'layer-bot view-course-detail-2'}>
                                    <div className="khung-layer-bot view-course-detail-3">
                                    <span className='content-layer-bot '>Chưa có hoạt động</span>
                                    </div>
                                </div>
                        )}
                                {quizTopic && quizTopic.length > 0 && quizTopic.map((quiztopic, index) => {
                                        if (!quiztopic.quizName.toLowerCase().includes("mã đề")) {
                                            return (
                                                <Link to="/quiz" onClick={() => handleClickQuiz(quiztopic.id, item.id)} key={`topic-${index}`}>
                                                    <div className='quiz-border'>
                                                        <div className='title-content-assignment mt-14'>
                                                            <div className='icon-background-title blue'>
                                                                <i className="fas fa-book-medical"></i>
                                                            </div>
                                                            <div className='text-assignment'>
                                                                <span className='title-span-assignment'>Bài ôn tập</span>
                                                                <span className='title-span-assignment-2'>{quiztopic.quizName}</span>
                                                            </div>
                                                            <i className={`fas fa-pencil-alt icon-pencil-vcd ${toggle ? 'hide' : 'hien'}`} onClick={(event) => handleEditQuiz(event, quiztopic)}></i>
                                                            <i className={`fas fa-trash-alt ml-100 ${toggle ? 'hide' : 'hien'}`} onClick={(event) => handleDeleteQuiz(event, quiztopic)}></i>
                                                        </div>
                                                        <div className='content-assignment w-1109'>
                                                            <div className='header-title-quiz'>
                                                                <span className='description-assignment'>{quiztopic.quizName}</span>
                                                                <div className='status-quiz'>Đang diễn ra</div>
                                                            </div>
                                                            <hr className='hr-assignment-content w-1059'></hr>
                                                            <span className='description-assignment-6'>Thời gian mở 07:00:47 25/12/2023</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            );
                                        } else {
                                            return null; // Không render gì nếu có chứa chuỗi "mã đề" trong quizName
                                        }
                                    })}
                                    {assignmentTopic && assignmentTopic.length > 0 && assignmentTopic.map((assignmenttopic, index) => {
                                        return(
                                            <Link to="/assignment" onClick={() => handleClickAssignment(assignmenttopic.id)} key={`topic-${index}`}>
                                                    <div className='quiz-border'>
                                                        <div className='title-content-assignment mt-14'>
                                                            <div className='icon-background-title'>
                                                                <i class="fas fa-paste"></i>
                                                            </div>
                                                            <div className='text-assignment'>
                                                                <span className='title-span-assignment'>Bài Tập Lớn</span>
                                                                <span className='title-span-assignment-2'>{assignmenttopic.name}</span>
                                                            </div>
                                                            <i className={`fas fa-pencil-alt icon-pencil-vcd ${toggle ? 'hide' : 'hien'}`} onClick={(event) => handleEditQuiz(event, assignmenttopic)}></i>
                                                            <i className={`fas fa-trash-alt ml-100 ${toggle ? 'hide' : 'hien'}`} onClick={(event) => handleDeleteAssignment(event, assignmenttopic)}></i>
                                                        </div>
                                                        <div className='content-assignment w-1109'>
                                                            <div className='header-title-quiz'>
                                                                <span className='description-assignment'>{assignmenttopic.name}</span>
                                                                <div className='status-quiz'>Đang diễn ra</div>
                                                            </div>
                                                            <hr className='hr-assignment-content w-1059'></hr>
                                                            <span className='description-assignment-6'>Thời gian mở {assignmenttopic.startAt}</span>
                                                            <div className='description-assignment-6'>Thời gian đóng {assignmenttopic.endAt}</div>
                                                        </div>
                                                    </div>
                                                </Link>
                                        )

                                    })
                                    }
                                <div className={`layer-bot view-course-detail-2 hover-background ${toggle ? 'hide' : 'hien'}`} onClick = {() => setIsShowModalAddNewAct(true)} >
                                    <div className={`view-course-detail-3 flex`} onClick={() => localStorage.setItem("idTopic",item.id)}>
                                        <div className='khung-icon'>
                                            <i className="fas fa-plus icon-plus"></i>
                                        </div>
                                        <span className='content-layer-bot span-add-acti'>Thêm hoạt động</span>
                                    </div>
                                </div>

                            </div>

                            <Modal show={isShowModalAddNewAct} onHide={handleclosed}>
                            <div className='border-cover-content'>
                                <div className='Header-add-active-content'>
                                    <span className='Header-text'>Thêm hoạt động</span>
                                </div>
                                <hr className='hr-add-active'></hr>
                                <div className='Body-add-active-content'>
                                <Link to='add-link-assignment'>
                                    <div className='Khung-add-active'>
                                        <div className='Khung-icon-add-active'>
                                            <i class="fas fa-link icon-add-active"></i>
                                        </div>
                                        <span className='name-add-active'>Nguồn ngoài</span>
                                    </div>
                                </Link>
                                <Link to={`/manager-quizzes`}>
                                    <div className='Khung-add-active'>
                                        <div className='Khung-icon-add-active-2'>
                                            <i class="fas fa-book-medical icon-add-active"></i>
                                        </div>
                                        <span className='name-add-active-1'>Bài ôn tập</span>
                                    </div>
                                </Link>
                                    <Link to='add-assignment'>
                                        <div className='Khung-add-active'>
                                            <div className='Khung-icon-add-active-3'>
                                                <i class="fas fa-file-alt icon-add-active"></i>
                                            </div>
                                            <span className='name-add-active-1'>Bài tập lớn</span>
                                        </div>
                                    </Link>
                                </div>
                                <hr className='hr-add-active'></hr>
                                <div className='Footer-add-active-content'>
                                    <span className='text-foot-add-active' onClick={() => handleclosed()}>ĐÓNG</span>
                                </div>
                            </div>
                            </Modal>            
                        </Accordion.Body>
                    </Accordion.Item>                 
                </div>
                )
            }
        })
    }                   
    </Accordion>   
        <ModalConfirm
            show={isShowModalDelete}
            handleClose = {handleclosed}
            dataUserDelete = {dataUserDelete}
            handleDeleteUserFromModal = {handleDeleteUserFromModal}
        ></ModalConfirm>
        <ModalConfirmQuiz
            show={isShowModalDeleted}
            handleClose = {handleclosed}
            dataQuizDelete = {dataQuizDelete}
            handleDeleteQuizFromModal = {handleDeleteQuizFromModal}        
        >
        </ModalConfirmQuiz>
        <ModalEditTopic
        handleEditUserFromModal={handleEditUserFromModal}
        handleClose = {handleclosed}
        show = {isShowModalEdit}
        dataUserEdit = {dataUserEdit}
        ></ModalEditTopic>
        <ModalEditQuiz
        handleEditQuizFromModal={handleEditQuizFromModal}
        handleClose = {handleclosed}
        show = {isShowModalEdited}
        dataQuizEdit = {dataQuizEdit}
        ></ModalEditQuiz>

        <ModalConfirmAssignemt
            show={isShowModalDeleted}
            handleClose = {handleclosed}
            dataAssignmentDelete = {dataAssignmentDelete}
            handleDeleteAssignmentFromModal = {handleDeleteAssignmentFromModal}     
        ></ModalConfirmAssignemt>

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
  );
}

export default ContentGrade;