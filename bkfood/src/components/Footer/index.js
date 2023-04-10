import React from 'react' 
import Logo from "../../assets/images/logo.png"

function Footer() {
  return (
    <div className='d-flex flex-column align-items-center justify-content-center mt-auto py-2' style={{ backgroundColor: "#D9D9D9" }} >
        <img src={Logo} alt="Logo"/>
        <p className='my-2 fw-bold fs-5'>COPYRIGHT @2023</p>
    </div>
  )
}

export default Footer