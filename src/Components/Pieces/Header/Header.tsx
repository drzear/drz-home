import React, { useEffect, useState } from "react";
import "./Header.css";

function Header() {
    const positionsOptions = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
        // ['-translate-x-24 translate-y-12', '-translate-x-24 -translate-y-9', '-translate-x-24 -translate-y-9'],
        // ['translate-x-24 -translate-y-12', '-translate-x-24 -translate-y-9', '-translate-x-24 -translate-y-9'],
        // ['-translate-x-12 -translate-y-9', '-translate-x-24 -translate-y-9', '-translate-x-24 -translate-y-9'],
    ];
    const [scrolled, setScrolled] = useState(false);
    const [stickyPosition, setStickyPosition] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [positions, setPositions] = useState(positionsOptions[0]);

    useEffect(() => {
        console.log('header scroll');
        const listenToScroll = () => {
            let navbar = document.getElementById("navbar");
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
                // setScrolled(false);
            }
        }
        window.addEventListener('scroll', listenToScroll);
        return () => {
            window.removeEventListener('scroll', listenToScroll);
        }
    }, [stickyPosition]);
    useEffect(() => {
        console.log('header resize');
        const handleResize = () => {
            setStickyPosition((document.getElementById("navbar")?.offsetTop || 0).valueOf());
        };
        setTimeout(() => setStickyPosition((document.getElementById("navbar")?.offsetTop || 0).valueOf()), 0);
        window.addEventListener("resize", handleResize);
        const timer = setTimeout(() => setLoaded(true), 600);
        // let index = 0;
        // const interval = setInterval(() => {
        //     (index === positionsOptions.length - 1) ? index = 0 : index ++;
        //     setPositions(positionsOptions[index]);
        // }, 5000);
        window.scrollTo(0, 0);
        return () => {
            window.removeEventListener("resize", handleResize);
            clearInterval(timer);
            // clearInterval(interval);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="w-screen bg-white" style={{height: '25vh'}}>
                {/* <h1 className="bottom-0 text-center text-black font-bold">start</h1> */}
            </div>
            <nav id="navbar" className={"flex items-top justify-center z-10 w-screen h-28 pt-6 bg-white"
                + (scrolled ? ' shadow-sm' : '')
                }
                >
                {/* <div className={"m-0 text-center relative text-white h-20 w-44"
                    + (scrolled ? '' : ' pt-5')
                }> */}
                    <div className={"z-50 absolute flex justify-center rounded-full bg-gray-400 transform duration-1000 transition-all ease-out w-44 h-44" 
                        + (scrolled ? ' -translate-x-34 -translate-y-15 hover:bg-red-400 shadow-m scale-50' : ' hover:bg-red-400')
                        + ' bg-workPhoto bg-contain'
                        }></div>
                    <div className={"z-40 absolute flex justify-center items-center bg-gray-400 w-20 h-20 transform transition-all ease-out duration-1000" 
                        // + (loaded ? ' duration-1000' : ' duration-3000 translate-x-6')
                        + (scrolled ? ' -translate-x-11 -translate-y-3 hover:bg-red-400 hover:scale-110 shadow-m' : ' scale-0 hover:bg-red-400 hover:scale-110 '  + positions[0])
                        + ' bg-hobbit bg-cover'
                        }>
                        
                    </div>
                    <div className={"z-20 absolute flex justify-center items-center bg-gray-600 w-20 h-20 transform transition-all ease-out duration-1000" 
                        // + (loaded ? ' duration-1000' : ' duration-3000 translate-x-24')
                        + (scrolled ? ' translate-x-11 -translate-y-3 hover:bg-red-600 hover:scale-110 shadow-m' : ' translate-x-12 scale-0 hover:bg-red-600 hover:-translate-x-12 ' + positions[1])
                        + ' bg-kaikoura bg-cover'
                        }>
                        
                    </div>
                    <div className={"z-0 absolute flex justify-center items-center bg-gray-800 w-20 h-20 transform transition-all ease-out duration-1000" 
                        // + (loaded ? ' duration-1000' : ' duration-3000 translate-x-12 translate-y-44')
                        + (scrolled ? ' translate-x-33 -translate-y-3 hover:bg-red-800 hover:scale-110 shadow-m' : ' scale-0 hover:bg-red-800 hover:translate-x-12 ' + positions[2])
                        + ' bg-hills bg-cover'
                        }>
                        
                    </div>
                {/* </div> */}
            </nav>
            {/* {scrolled && <div className="h-28 w-full bg-white"></div>} */}
            <div className={"w-screen flex justify-center items-start bg-white content-info" 
                // + (scrolled ? ' pt-52' : ' pt-24')
                }
                // style={{height: '45vh'}}
                >
                <Info />
            </div>
        </>
    );
    // return (
    //     <>
    //         <div className="w-screen bg-white" style={{height: '25vh'}}>
    //             {/* <h1 className="bottom-0 text-center text-black font-bold">start</h1> */}
    //         </div>
    //         {scrolled && <div className="h-20 w-full bg-white"></div>}
    //         <nav id="navbar" className={"flex items-center justify-center z-10 w-screen"
    //             + (scrolled ? ' h-1/6 md:h-28 pt-6 bg-white shadow-sm' : ' h-44 bg-white')
    //             }
    //             >
    //             <div className={"m-0 text-center relative text-white h-20 w-44"
    //                 + (scrolled ? '' : ' pt-5')
    //             }>
    //                 <div className={"z-50 absolute flex justify-center rounded-full items-center ml-0 mt-0 bg-gray-400 transform duration-1000 transition-all ease-out w-20 h-20" 
    //                     + (scrolled ? ' -translate-x-22 -translate-y-3 hover:bg-red-400 shadow-m' : ' scale-250 hover:bg-red-400 translate-x-12 translate-y-9')
    //                     + ' bg-workPhoto bg-contain'
    //                     }></div>
    //                 <div className={"z-40 absolute flex justify-center items-center ml-8 mt-6 bg-gray-400 w-20 h-20 transform transition-all ease-out duration-1000" 
    //                     // + (loaded ? ' duration-1000' : ' duration-3000 translate-x-6')
    //                     + (scrolled ? ' -translate-x-8 -translate-y-9 hover:bg-red-400 hover:scale-110 shadow-m' : ' scale-100 hover:bg-red-400 hover:scale-110 '  + positions[0])
    //                     + ' bg-hobbit bg-cover'
    //                     }>

    //                 </div>
    //                 <div className={"z-20 absolute flex justify-center items-center ml-0 mt-0 bg-gray-600 w-20 h-20 transform transition-all ease-out duration-1000" 
    //                     // + (loaded ? ' duration-1000' : ' duration-3000 translate-x-24')
    //                     + (scrolled ? ' translate-x-23 -translate-y-3 hover:bg-red-600 hover:scale-110 shadow-m' : ' translate-x-12 scale-125 hover:bg-red-600 hover:-translate-x-12 ' + positions[1])
    //                     + ' bg-kaikoura bg-cover'
    //                     }>

    //                 </div>
    //                 <div className={"z-0 absolute flex justify-center items-center ml-16 mt-8 bg-gray-800 w-20 h-20 transform transition-all ease-out duration-1000" 
    //                     // + (loaded ? ' duration-1000' : ' duration-3000 translate-x-12 translate-y-44')
    //                     + (scrolled ? ' translate-x-30 -translate-y-11 hover:bg-red-800 hover:scale-110 shadow-m' : ' scale-150 hover:bg-red-800 hover:translate-x-12 ' + positions[2])
    //                     + ' bg-hills bg-cover'
    //                     }>

    //                 </div>
    //             </div>
    //         </nav>
    //         <div className={"w-screen flex items-center justify-center pt-6 md:items-start md:pt-44 bg-white" }
    //             style={{height: '45vh'}}>
    //             <Info />
    //         </div>
    //     </>
    // );
}

function Info() {
    return (
        <div className="text-center max-w-md bg-white">
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
