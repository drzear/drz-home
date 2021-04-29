import React, { useEffect, useState } from "react";
import "./Header.css";

function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [stickyPosition, setStickyPosition] = useState(0);
    const [bgColorTint, setBgColorTint] = useState(100);
    const [bgColor, setBgColor] = useState(0);

    useEffect(() => {
        const listenToScroll = () => {
            let navbar = document.getElementById("navbar");
            const height = window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;
            setBgColorTint(Math.max(80, 100 - (Math.floor(window.pageYOffset / height * 100) / 2)));
            setBgColor((Math.floor(window.pageYOffset / height * 100) * 2));
            document.documentElement.style.setProperty('--dynColor', 'hsl(' + bgColor + ', 100%, ' + bgColorTint + '%)');
            if (window.pageYOffset > stickyPosition) {
                navbar?.classList.add("fixed");
                navbar?.classList.add("top-0");
                navbar?.classList.add("sticky-info");
                setTimeout(() => setScrolled(true) , 0)
            } else {
                navbar?.classList.remove("fixed");
                navbar?.classList.remove("top-0");
                navbar?.classList.remove("sticky-info");
                setTimeout(() => setScrolled(false) , 0)
            }
        }
        window.addEventListener('scroll', listenToScroll);
        return () => {
            window.removeEventListener('scroll', listenToScroll);
        }
    }, [stickyPosition, bgColor, bgColorTint]);
    useEffect(() => {
        const handleResize = () => {
            // window.scrollTo(0, 0);
            setTimeout(() => setStickyPosition((document.getElementById("navbar")?.offsetTop || 0).valueOf()),0);
        };
        setTimeout(() => setStickyPosition((document.getElementById("navbar")?.offsetTop || 0).valueOf()), 0);
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const scrollToLocation = (div: string) => {
        document.getElementById(div)?.scrollIntoView();
    };
    return (
        <>
            <div 
                id="home"
                className="w-full" 
                style={{
                    height: '35vh',
                }}
                >
            </div>
            <nav 
                id="navbar" 
                className={"flex items-top justify-center z-10 w-full h-28 pt-6"
                + (scrolled ? ' shadow-lg' : '')
                }
                >
                <div className={"z-50 absolute flex justify-center rounded-full bg-gray-400 transform duration-1000 transition-all ease-out w-44 h-44 cursor-pointer" 
                    + (scrolled ? ' -translate-x-34 -translate-y-15 hover:bg-red-400 shadow-m scale-50' : ' hover:bg-red-400')
                    + ' bg-workPhoto bg-contain'}
                    onClick={() => scrollToLocation('home')}
                    ></div>
                <div className={"z-40 absolute flex justify-center items-center bg-gray-400 w-20 h-20 transform transition-all ease-out duration-1000 cursor-pointer" 
                    + (scrolled ? ' -translate-x-11 -translate-y-3 hover:bg-red-400 hover:scale-110 shadow-m' : ' scale-0 hover:bg-red-400 hover:scale-110 ')
                    + ' bg-hobbit bg-cover'}
                    onClick={() => scrollToLocation('cv')}
                    ></div>
                <div className={"z-20 absolute flex justify-center items-center bg-gray-600 w-20 h-20 transform transition-all ease-out duration-1000 cursor-pointer" 
                    + (scrolled ? ' translate-x-11 -translate-y-3 hover:bg-red-600 hover:scale-110 shadow-m' : ' translate-x-12 scale-0 hover:bg-red-600 hover:-translate-x-12 ')
                    + ' bg-kaikoura bg-cover'}
                    onClick={() => scrollToLocation('about')}
                    ></div>
                <div className={"z-0 absolute flex justify-center items-center bg-gray-800 w-20 h-20 transform transition-all ease-out duration-1000 cursor-pointer" 
                    + (scrolled ? ' translate-x-33 -translate-y-3 hover:bg-red-800 hover:scale-110 shadow-m' : ' scale-0 hover:bg-red-800 hover:translate-x-12 ')
                    + ' bg-hills bg-cover'}
                    onClick={() => scrollToLocation('contact')}
                    ></div>
            </nav>
            <div 
                className={"w-full flex justify-center items-start content-info"}
                >
                <Info />
            </div>
        </>
    );
}

function Info() {
    return (
        <div className="text-center max-w-md">
                Hi, I'm David (or <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://en.wikipedia.org/wiki/Ryne_Sandberg"
                    title="Ryne Sandberg, Cubs baseball great"
                >
                    Ryne
                </a>) Zear. I'm a{" "}
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.google.com/maps/place/Stockholm/@59.3261917,17.7018811,10z/data=!3m1!4b1!4m5!3m4!1s0x465f763119640bcb:0xa80d27d3679d7766!8m2!3d59.3293235!4d18.0685808"
                    title="Stockholm on Google Maps"
                >
                    Stockholm
                </a>-based full-stack BI developer from{" "}
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.google.com/maps/place/Iowa+City,+IA,+USA/@41.64716,-91.6094031,12z/data=!3m1!4b1!4m5!3m4!1s0x87e441c16a208817:0x6d711867870582b0!8m2!3d41.6611277!4d-91.5301683"
                    title="Iowa City on Google Maps"
                >
                    Iowa City, IA, USA
                </a>.
        </div>
    )
}

export default Header;
