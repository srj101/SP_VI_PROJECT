import { AppleOutlined, FacebookOutlined, GoogleOutlined } from '@ant-design/icons';
import { Box } from '@material-ui/core';
import React from 'react';
import BottomNav from '../../Components/BottomNav/BottmNav';

const Footer = () => {
  return (
    <div className="mt-auto ">

      {/* <footer className="flex sm:pb-[120px] xm:pb-[120px] lg:p-10 justify-evenly items-center footer bg-neutral text-neutral-content">
        <div>
          <span className="footer-title">Services</span>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
          <div className='flex justify-between items-center'>
            <FacebookOutlined style={{ fontSize: '25px', color: '#08c' }} />
            <GoogleOutlined style={{ fontSize: '25px', color: 'green' }} />
            <AppleOutlined style={{ fontSize: '25px', color: 'black' }} />
          </div>
        </div>

      </footer>
      {/* <Box sx={{ display: { md: 'none', lg: 'none', xl: 'none', xxl: 'none' } }}>
        <BottomNav />
      </Box> */} 

    </div>

  );
};

export default Footer;
