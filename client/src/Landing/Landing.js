import React from 'react'
import {Link} from 'react-router-dom';
import LandingImage from '../assets/images/landing_main.svg';
import InfoSectionImageEasy from '../assets/images/info_section_1.svg';
import InfoSectionImageNote from '../assets/images/info_section_2.svg';
import InfoSectionImageOrganize from '../assets/images/info_section_3.svg';
import './Landing.css';

function Landing() {
    return (
        <div className='landing'>
            <div className="main__section">
            <div className="landing__nav">
                <div className="logo__name">
                    <h1>Notify</h1>
                </div>
            </div>
                <div className="main">
                    <div className="main__text">
                        <h2 className="text__title">Notify</h2>
                        <p className="text__subtitle">A Simple Note taking Application</p>
                        <Link to='/login' className="auth-link" ><button className="btn">Get Started</button></Link>
                    </div>
                    <div className="main__image">
                        <img src={LandingImage} alt="Main SVG" className="main-img"></img>
                    </div>
                </div>
                <div className="custom-shape-divider-bottom-1612676159">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                    </svg>
                </div>
            </div>
            <div className="info__section">
                <div className="info__card">
                    <div className="card__header">
                        <img src={InfoSectionImageEasy} alt="info" className="info__image"/>
                    </div>
                    <div className="card__body">
                        <h3>Note Taking Made Easy</h3>
                        <p>Taking Notes is now easier than you can imagine. Built with the objective of Perfection,Notify makes taking notes fun and interactive.</p>
                    </div>
                </div>
                <div className="info__card">
                    <div className="card__header">
                    <img src={InfoSectionImageNote} alt="info" className="info__image"/>
                   
                    </div>
                    <div className="card__body">
                    <h3>Make Notes On The Go</h3>
                    <p>Sleek and Super intuitive design makes it possible to take notes from any device.</p>

                    </div>
                </div>
                <div className="info__card">
                    <div className="card__header">
                        <img src={InfoSectionImageOrganize} alt="info" className="info__image"/>
                    </div>
                    <div className="card__body">
                        <h3>Stay Organized</h3>
                        <p>Keep all your notes organized at one place.</p>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Landing;
