import React from 'react';
import TableLevel from '../../../UI/TableLevel/TableLevel'
const User = () => {
    return (
        <div>
            <div className='body'>
                <div className='background'>
                    <div className='content'>
                        <span className='title-grade t-center mt-5'>Danh Sách Mức độ câu hỏi</span>
                        <div className='col-grade'>
                            <TableLevel></TableLevel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;