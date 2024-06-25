import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

const ModalResult = (props) => {
    const {show, setshow, dataModalResult,grade, showAnswer, setShowAnswer} = props
    const handleClose = () => setshow(false);
    const handleShowAnswer = () => {
        setshow(false)
        setShowAnswer(true)
    }
    // console.log("check data >>>",dataModalResult)
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Your Result</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        Total Questions: <b>{dataModalResult.countTotal}</b>
                    </div>
                    <div>
                        Total Correct Answers: <b>{dataModalResult.countCorrect}</b>
                    </div>
                    <div>
                        <b>Your Grade: {grade}</b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleShowAnswer}>
                    Show Answers
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default ModalResult;
