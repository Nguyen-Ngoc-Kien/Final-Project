import React from 'react';
import { Link } from 'react-router-dom';
import TableMarkAssignment from './TableMarkAssignment'

const Mark = () => {
    return (
        <div>
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
                    Lớp học của tôi / Kỹ Thuật Xét Nghiệm Vi Sinh Lâm Sàng / Tạo bài tập lớn / Chấm điểm
                </div>
                <div className='layer-top-upper-detail-class'>
                    <Link to='/assignment' className='two-layer-detail-class-upper'>
                        <i class="fas fa-file-alt course-detail"></i>
                        <span className='title-detail-class-upper'>NỘI DUNG</span>
                    </Link>
                    <Link to='/mark' className='two-layer-detail-class-upper  bg-active'>
                        <i class="fas fa-cog cdetail course-detail"></i>
                        <span className='title-detail-class-upper'>CHẤM ĐIỂM</span>
                    </Link>
                </div>
                <TableMarkAssignment></TableMarkAssignment>
            </div>
            </div>
            </div>
        </div>
    );
};

export default Mark;