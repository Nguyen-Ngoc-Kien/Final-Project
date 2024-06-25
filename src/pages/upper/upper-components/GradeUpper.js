import React from 'react';
import {Link} from 'react-router-dom';
import TableClass from './../../../UI/TableClass/TableClass'

const GradeUpper = () => {
    return (
        <div>
    <div className='body'>
      <div className='background'>
        <div className='content'>
        <div className='grade-body'>
            <span className='title-grade'>Danh Sách Lớp Học</span>
            <span className='sum-grade-upper'>Tổng lớp theo trạng thái: 0</span>
            <div className='layer-top'>
                <span className='name-col'>TẤT CẢ</span>
                <span className='name-col'>ĐANG CHỜ DUYỆT(KHÔNG CHO PHÉP ĐĂNG KÝ)</span>
                <span className='name-col'>ĐANG CHỜ DUYỆT(CHO PHÉP ĐĂNG KÝ)</span>
                <span className='name-col'>ĐANG MỞ ĐĂNG KÝ</span>
                <span className='name-col'>SẮP MỞ</span>
                <span className='name-col'>ĐANG DIỄN RA</span>
                <span className='name-col'>ĐÃ ĐÓNG</span>
                <span className='name-col'>BỊ TỪ CHỐI</span>
            </div>
            <div className='table-grade'>
                <div className='upper-table'>
                    <div className='grade-search-upper'>
                        <i class="fas fa-search grade-upper"></i>
                        <input type='text' placeholder='Tìm kiếm...' className='search-grade'></input>
                    </div>
                </div>
                <div className='col-grade'>
                    <TableClass></TableClass>
                </div>
            </div>
        </div>
        </div>
      </div>
    </div>

        </div>
    );
};

export default GradeUpper;