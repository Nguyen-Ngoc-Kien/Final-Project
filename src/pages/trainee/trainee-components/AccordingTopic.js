import { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { fetchAllTopicCoursebyId, fetchQuizTopicById } from '../../../services/UserServices';
import _ from 'lodash';
import {ToastContainer, toast } from 'react-toastify';
import ModalConfirm from '../../../UI/TableTopic/ModalConfirm';
import ModalEditTopic from '../../../UI/TableTopic/ModalEditTopic';
import ModalConfirmQuiz from '../../../UI/TableQuiz/ModalConfirm'
import ModalEditQuiz from '../../../UI/TableQuiz/ModalEditQuiz';

const ContentGrade = (props) => {
    const {toggle,listTopic} = props
    // console.log("toggle >>>",toggle)
    // console.log("item Topic 1>>>",item)
    const [listUser,setListUser] = useState([]);
    const [listQuiz,setListQuiz] = useState([]);
    const [dataQuizDelete,setDataQuizDelete] = useState({});
    const [quizTopic,setQuizTopic] = useState([])


      const handleOnClickShowDetail = async (id,item) => {
        // localStorage.removeItem(`quizId-${id}`)
        // console.log("item >>>",item)
        const res = await fetchQuizTopicById(id,localStorage.getItem("access_token"))
        // console.log("res >>>",res)
        setQuizTopic(res);
        // console.log("Quiz topic >>>",quizTopic)
      }
      const handleClickQuiz = (idQuiz,topicId) => {
        localStorage.setItem("idQuiz",idQuiz)
        localStorage.setItem("TopicId",topicId)
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
                                    </div>
                        </Accordion.Header>
                        <Accordion.Body>
                        <div className='content-course-detail'>
                                    <div className={'layer-bot view-course-detail-2'}>
                                    <div className="khung-layer-bot view-course-detail-3">
                                    <span className='content-layer-bot '>Chưa có hoạt động</span>
                                    </div>
                                </div>
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
                            </div> 
                        </Accordion.Body>
                    </Accordion.Item>                 
                </div>
                )
            }
        })
    }                   
    </Accordion>   
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