import React, { useState, useEffect } from "react";

const CountDown = (props) => {
    const { quiz } = props;

    // Kiểm tra và xử lý giá trị của quiz.timeLimit
    const initialTimeLimit = quiz && quiz.timeLimit && Number.isInteger(quiz.timeLimit) && quiz.timeLimit > 0 ? quiz.timeLimit : 10; // Giá trị mặc định là 10 nếu không có giá trị hợp lệ từ quiz

    const [count, setCount] = useState(initialTimeLimit * 60);

    const toHHMMSS = (secs) => {
        const sec_num = parseInt(secs, 10);
        const hours = Math.floor(sec_num / 3600);
        const minutes = Math.floor((sec_num % 3600) / 60);
        const seconds = sec_num % 60;

        return [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .join(":");
    }

    useEffect(() => {
        const timer = setInterval(() => {
            if (count === 0) {
                clearInterval(timer);
                props.onTimeUp();
            } else {
                setCount(count - 1);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [count]);

    return (
        <div>
            <span className="timeCount">Thời gian còn lại:</span>
            <div className="countdown-container">
                {toHHMMSS(count)}
            </div>
        </div>
    );
}

export default CountDown;