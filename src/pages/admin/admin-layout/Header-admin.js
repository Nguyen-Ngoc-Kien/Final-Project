import React, { useState } from 'react';
import {Link} from 'react-router-dom';

function HandleMenu(){
  const [on,setOn] = useState(false)
  const HandleClick = () => {
    setOn(() => {
      return !on;
    })
  }
  const HandleClickSignout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");
  }
  return (
    <div>
            <div className='header'>
            <div className='menu' onClick={() => HandleClick()}>
                <i class="fas fa-bars"></i>
            </div>
            <div className='notification'>
                <i class="fas fa-bell"></i>
            </div>
            <div className='user'>
                <div className='avatar'>
                <i class="fas fa-user"></i>
                </div>
                <span className='text'>
                ADMIN |
                </span>
            </div>
            {/* <div className='after-click'>
      </div> */}
            </div>
            <div className='side-bar'>
        <nav className={`side-bar ${on ? '' : 'hidden-sidebar'}`}>
          <ul>
            <div className='logo'>
              <img 
              src='https://upload.wikimedia.org/wikipedia/vi/e/ef/Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg' 
              alt='' className='logo-img'/>
            </div>
            <div className='object-sidebar'>
              <span className='home-icon'>
                <i class="fas fa-home"></i>
              </span>
              <li>
                <Link to="/Home" className='text-menu' onClick={() => HandleClick()}>Trang Chủ</Link>
              </li>
            </div>
            <div className='object-sidebar'>
              <span className='home-icon'>
                <i class="fas fa-graduation-cap"></i>
              </span>
              <li>
              <Link to="/Grade" className='text-menu' onClick={() => HandleClick()}>Lớp</Link>
            </li>
            </div>
            <div className='object-sidebar'>
              <span className='home-icon'>
                <i class="fas fa-pager"></i>
              </span>
              <li>
              <Link to="/Course" className='text-menu' onClick={() => HandleClick()}>Khóa học</Link>
              </li>
            </div>
            <div className='object-sidebar'>
              <span className='home-icon'>
                <i class="fas fa-users"></i>
              </span>
              <li>
              <Link to="/User" className='text-menu' onClick={() => HandleClick()}>Người dùng</Link>
            </li>
            </div>
            <div className='object-sidebar'>
              <span className='home-icon'>
                <i class="fas fa-house-user"></i>
              </span>
              <li>
              <Link to="/Level" className='text-menu' onClick={() => HandleClick()}>Mức độ câu hỏi</Link>
            </li>
            </div> 
            <div className='object-sidebar'>
              <span className='home-icon'>
                <i class="fas fa-house-user"></i>
              </span>
              <li>
              <Link to="/StatusClass" className='text-menu' onClick={() => HandleClick()}>Trạng Thái Lớp Học</Link>
            </li>
            </div> 
            <div className='object-sidebar'>
              <span className='home-icon'>
                <i class="fas fa-certificate"></i>
              </span>
              <li>
              <Link to="/Certification" className='text-menu' onClick={() => HandleClick()}>Chứng chỉ</Link>
            </li>
            </div>
            <div className='object-sidebar'>
              <span className='home-icon'>
                <i class="fas fa-map-marker-alt"></i>
              </span>
              <li>
              <Link to="/Location" className='text-menu' onClick={() => HandleClick()}>Địa điểm tổ chức</Link>
            </li>
            </div>
            <div className='object-sidebar'>
              <span className='home-icon'>
                <i class="fas fa-wrench"></i>
              </span>
              <li>
              <Link to="/Configuration" className='text-menu' onClick={() => HandleClick()}>Cấu hình</Link>
            </li>
            </div>
            <div className='object-sidebar'>
              <span className='home-icon'>
                <i class="fas fa-cog"></i>
              </span>
              <li>
              <Link to="/Emulator" className='text-menu' onClick={() => HandleClick()}>Giả lập</Link>
            </li>
            </div>
            <div className='object-sidebar'>
              <span className='home-icon'>
                <i class="fas fa-sign-out-alt"></i>
              </span>
              <li>
              <Link to="/Login" className='text-menu' onClick={() => HandleClickSignout()}>Đăng xuất</Link>
            </li>
            </div>
          </ul>
        </nav>
      </div>
      <div className={`ground-gray ${on ? '' : 'hidden-ground'}`} onClick={() => HandleClick()}></div>
      {/* <Routes>
          <Route 
          path='/Certification' element={<Certification/>}
          />
          <Route 
          path='/Grade' element={<Grade/>}
          />
          <Route 
          path='/Course' element={<Course/>}
          />
          <Route 
          path='/Department' element={<Department/>}
          />
          <Route 
          path='/Location' element={<Location/>}
          />
          <Route 
          path='/Emulator' element={<Emulator/>}
          />
          <Route 
          path='/Login' element={<Login/>}
          />
          <Route 
          path='/Configuration' element={<Configuration/>}
          />
          <Route 
          path='/User' element={<User/>}
          />
          <Route 
          path='/Home' element={<Home/>}
          />
          <Route 
          path='/' element={<Home/>}
          />
          <Route 
          path='/Add-class' element={<AddClass/>}
          />
        </Routes> */}
    </div>
  )
}

const Header = () => {
    return (
        <div>
          {HandleMenu()}
        </div>
    );
};

export default Header;