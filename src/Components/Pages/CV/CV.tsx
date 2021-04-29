import React, { useState, useEffect } from "react";
import "./CV.css";
import { useSpring, animated } from "react-spring";
import { cvData, colorArrays, cvDataInt } from "./cvData";
import ReactEcharts from "echarts-for-react";
import echarts from "echarts";
import world from "../../../Images/world_echarts_big.json";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import "./CV";
// @ts-ignore: problem adding PDF types to tsconfig
import CVPDF from "../../../Documents/CV-DRZear.pdf";

const Line = (props) => {
    const widthMultiplier: number = props.svgWidth / 0.25 <= 700 ? 0.3 : 0.1;
    const spring = useSpring({
        width:
            widthMultiplier *
            props.svgWidth *
            (props.currentlyHovered ? 1.5 : 1),
        y1:
            props.y1 * props.svgHeight -
            props.svgHeight * (props.currentlyHovered ? 0.01 : 0.0),
        y2:
            props.y2 * props.svgHeight +
            props.svgHeight * (props.currentlyHovered ? 0.01 : 0.0),
        color: props.currentlyHovered ? "yellow" : props.stroke,
        from: {
            width:
                widthMultiplier *
                props.svgWidth *
                (props.currentlyHovered ? 1.5 : 1),
            y1:
                props.y1 * props.svgHeight -
                props.svgHeight * (props.currentlyHovered ? 0.0 : 0.01),
            y2:
                props.y2 * props.svgHeight +
                props.svgHeight * (props.currentlyHovered ? 0.0 : 0.01),
            color: props.currentlyHovered ? "yellow" : props.stroke,
        },
    });
    return (
        <animated.line
            x1={props.x1 * props.svgWidth}
            x2={props.x2 * props.svgWidth}
            y1={props.y1 * props.svgHeight}
            y2={props.y2 * props.svgHeight}
            stroke={spring.color}
            strokeWidth={spring.width}
            onMouseEnter={props.onMouseEnter}
            style={{ cursor: "pointer" }}
        />
    );
};

const SlideShow = (props: { data: cvDataInt }) => {
    const imageArray = props.data.slideshow;
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        let loop = setTimeout(() => {
            let nextImage: number;
            if (currentImage + 1 >= imageArray.length) {
                nextImage = 0;
            } else {
                nextImage = currentImage + 1;
            }
            setCurrentImage(nextImage);
        }, 5000);
        return () => {
            window.clearTimeout(loop);
        };
    }, [currentImage, imageArray]);

    return (
        <SwitchTransition mode="out-in">
            <CSSTransition
                key={currentImage}
                timeout={500}
                classNames="slideshow-transition"
            >
                <img
                    src={require("../../../Images/SlideShow/" +
                        (imageArray[currentImage] &&
                        imageArray[currentImage] !== ""
                            ? imageArray[currentImage]
                            : imageArray[0]) +
                        "").default}
                    className="max-h-full max-w-full h-auto w-auto border-white border-solid border-2"
                    alt=""
                />
            </CSSTransition>
        </SwitchTransition>
    );
};

const getEchartOption = (selection: cvDataInt) => {
    // generate list of countries in cvData
    let countries: string[] = [];
    cvData.forEach((cvPoint) => {
        cvPoint.country.forEach((country) => {
            if (countries.findIndex((cntry) => cntry === country) === -1) {
                countries.push(country);
            }
        });
    });
    let mapData: any[] = [];
    countries.forEach((country) => {
        mapData.push({
            name: country,
            value:
                selection.country.findIndex((el) => country === el) !== -1
                    ? 2
                    : 1,
            label: { show: false },
        });
    });
    // seperate scatter and 1 effectScatter data
    return {
        geo: {
            name: "World Map",
            type: "map",
            map: "world",
            // roam: "move",
            roam: false,
            // silent: true,
            show: true,
            selectedMode: "single",
            label: {
                emphasis: {
                    color: "rgb(255, 255, 255)",
                    show: false,
                },
            },
            zoom: selection.zoom,
            center: selection.center,
        },
        visualMap: {
            left: "right",
            min: 1,
            max: 4,
            inRange: {
                color: ["yellowgreen", "yellow", "gray", "red"],
            },
            text: ["High", "Low"],
            calculable: true,
            show: false,
        },
        tooltip: {
            trigger: "item",
            showDelay: 0,
            transitionDuration: 0.2,
            formatter: function (params) {
                return params.name;
            },
        },
        series: [
            {
                name: "World Map",
                type: "map",
                geoIndex: 0,
                emphasis: {
                    label: {
                        // show: true,
                    },
                },
                data: mapData,
            },
            {
                type: "effectScatter",
                coordinateSystem: "geo",
                zlevel: 4,
                data: selection.markedCities,
                encode: {
                    value: 2,
                },
                symbolSize: function (val) {
                    return val[2] ^ 10;
                },
                showEffectOn: "render",
                rippleEffect: {
                    brushType: "stroke",
                },
                hoverAnimation: true,
            },
        ],
    };
};

function parseData(): any[] {
    let firstDate = 999999;
    let latestDate = 0;
    // get first and latest dates
    cvData.forEach((el) => {
        if (el.startYYYYMM < firstDate) {
            firstDate = el.startYYYYMM;
        }
        if (el.endYYYYMM > latestDate) {
            latestDate = el.endYYYYMM;
        }
    });
    const firstYear = +firstDate.toString().slice(0, 4);
    const firstMonth = +firstDate.toString().slice(4);
    const latestYear = +latestDate.toString().slice(0, 4);
    const latestMonth = +latestDate.toString().slice(4);

    // generate array of YYYYMM
    let allYYYYMM: number[] = [];
    for (let year = latestYear; year >= firstYear; year--) {
        for (let month = 12; month >= 1; month--) {
            if (year === firstYear && month < firstMonth) {
                // do not append to array
            } else if (year === latestYear && month > latestMonth) {
                // do not append to array
            } else {
                allYYYYMM.push(year * 100 + month);
            }
        }
    }
    let yearMarkers: { year: number; position: number }[] = [];
    for (let i = 0; i < allYYYYMM.length; i++) {
        if (+allYYYYMM[i].toString().slice(4) === 1) {
            yearMarkers.push({
                year: +allYYYYMM[i].toString().slice(0, 4),
                position: i / allYYYYMM.length,
            });
        }
    }

    // add multiplier to each cvData element
    cvData.forEach((el, i) => {
        // find position of start year month
        let y1 =
            allYYYYMM.findIndex((yyyymm) => yyyymm === el.endYYYYMM) /
            allYYYYMM.length;
        let y2 =
            allYYYYMM.findIndex((yyyymm) => yyyymm === el.startYYYYMM) /
            allYYYYMM.length;
        el["y1"] = y1;
        el["y2"] = y2;
    });

    // returns jan of each year to mark timeline
    return yearMarkers;
}
function CV() {
    // window resizing
    const [svgWidth, setSvgWidth] = useState(
        window.innerWidth >= 1600
            ? window.innerWidth * 0.15
            : window.innerWidth >= 900
            ? window.innerWidth * 0.2
            : window.innerWidth * 0.3
    );
    const [height, setHeight] = useState(window.innerHeight);
    // handle swipe
    const [initialClientX, setInitialClientX] = useState(0);
    const [finalClientX, setFinalClientX] = useState(0);
    const [initialClientY, setInitialClientY] = useState(0);
    const [finalClientY, setFinalClientY] = useState(0);
    const [currentlyHovered, setCurrentlyHovered] = useState(cvData.length - 1);
    const [infoPopupHidden, setInfoPopupHidden] = useState(true);
    // register world map
    useEffect(() => {
        echarts.registerMap("world", world, {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // window resize event listener
    useEffect(() => {
        const handleResize = () => {
            setSvgWidth(
                window.innerWidth >= 1600
                    ? window.innerWidth * 0.15
                    : window.innerWidth >= 900
                    ? window.innerWidth * 0.2
                    : window.innerWidth * 0.3
            );
            setHeight(window.innerHeight);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    // timeline keypress detection
    useEffect(() => {
        // next and back on timeline buttons
        const handleBackClick = () => {
            const bla =
                currentlyHovered === 0
                    ? cvData.length - 1
                    : currentlyHovered - 1;
            setCurrentlyHovered(bla);
        };
        const handleNextClick = () => {
            const bla =
                currentlyHovered === cvData.length - 1
                    ? 0
                    : currentlyHovered + 1;
            setCurrentlyHovered(bla);
        };
        const handleKeydown = (e) => {
            if (e.code === "ArrowLeft") {
                handleNextClick();
            } else if (e.code === "ArrowRight") {
                handleBackClick();
            } else if (e.code === "Escape" || e.code === "Esc") {
                if (!infoPopupHidden) setInfoPopupHidden(!infoPopupHidden);
            }
        };
        document.addEventListener("keydown", handleKeydown);
        return () => {
            document.removeEventListener("keydown", handleKeydown);
        };
    }, [currentlyHovered, infoPopupHidden]);
    // mouse hover over timeline
    const handleLineMouseEnter = (line: number) => {
        setCurrentlyHovered(line);
    };
    const handleLineMouseLeave = () => {
        setCurrentlyHovered(-1);
    };
    // next and back on timeline buttons
    const handleBackClick = () => {
        const bla =
            currentlyHovered === 0 ? cvData.length - 1 : currentlyHovered - 1;
        setCurrentlyHovered(bla);
    };
    const handleNextClick = () => {
        const bla =
            currentlyHovered === cvData.length - 1 ? 0 : currentlyHovered + 1;
        setCurrentlyHovered(bla);
    };
    const handleTouchStart = (e) => {
        setInitialClientX(e.nativeEvent.touches[0].clientX);
        setInitialClientY(e.nativeEvent.touches[0].clientY);
    };
    const handleTouchMove = (e) => {
        setFinalClientX(e.nativeEvent.touches[0].clientX);
        setFinalClientY(e.nativeEvent.touches[0].clientY);
    };
    const handleTouchEnd = (e) => {
        if (
            finalClientX < initialClientX &&
            Math.abs(finalClientY - initialClientY) < 50
        ) {
            handleNextClick();
        } else if (
            finalClientX > initialClientX &&
            Math.abs(finalClientY - initialClientY) < 50
        ) {
            handleBackClick();
        }
        setInitialClientX(0);
        setInitialClientY(0);
    };
    const onInfoClick = () => {
        setInfoPopupHidden(!infoPopupHidden);
    }
    const yearMarkers: { year: number; position: number }[] = parseData();
    const svgHeight = 2 * height;
    const reverseCvData = [...cvData].reverse();
    return (
        <>
            <div className={"h-screen w-screen bg-smoke fixed top-0 left-0 z-50 items-center justify-center" + (infoPopupHidden ? " hidden" : " flex")} onClick={onInfoClick}>
                <div className="bg-gray-200 h-92 w-40 rounded-sm p-2">
                    <b>Mobile:</b>
                    <br/>
                    Swipe left and right to move through the timeline or
                    press on a time period. 
                    <br/>
                    <b>Desktop:</b>
                    <br/>
                    Left and right arrow on keyboard
                    can navigate the timeline as well as hovering over a time period.
                </div>
            </div>
            <div className="diagonal-box cv">
                <div
                    id="cv"
                    className="cv-container container content cv"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={{
                        height: svgHeight + 300,
                    }}
                >
                    <div className="row justify-center">
                        <h2 className=" h-20 text-center text-3xl text-white font-bold">timeline</h2>
                    </div>
                    <div className="row-span-full grid grid-cols-3">
                        <div id="timeline-div" className="timeline-div col-span-1">
                            <div className="ml-0 mr-1 md:mr-0 row-span-full grid grid-cols-5">
                                <button
                                    className="hover:bg-blue-600 bg-blue-500 hover:text-gray-300 font-semibold text-white py-2 md:px-4 border border-blue-500 hover:border-transparent rounded col-span-2 md:col-span-1"
                                    style={{
                                        flex: 1,
                                        marginTop: "1vh",
                                        marginRight: "1px",
                                    }}
                                    onClick={onInfoClick}
                                    title="
                                    Mobile:
                                    Swipe left and right to move through the timeline or
                                    press on a time period. 
                                    Desktop:
                                    Left and right arrow on keyboard can
                                    navigate the timeline as well as hovering over a time period."
                                >
                                    <i>i</i>
                                </button>
                                <a
                                    className="hover:bg-gray-500 bg-gray-200 text-blue-600 hover:text-white font-semibold py-2 md:px-4 border border-blue-500 hover:border-transparent rounded col-span-3 md:col-span-4 text-center"
                                    style={{
                                        flex: 6,
                                        marginTop: "1vh",
                                    }}
                                    href={CVPDF}
                                    target="_blank"
                                    title="Download CV in PDF format."
                                >
                                    <i>PDF</i>
                                </a>
                            </div>
                            <div className="ml-0 mr-1 md:mr-0 row-span-full grid grid-cols-2">
                                <button
                                    onClick={handleNextClick}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 hover:text-white font-bold py-2 px-4 rounded-l col-span-1"
                                    style={{
                                        flex: 3,
                                        marginTop: "5px",
                                        marginBottom: "1vh",
                                        marginRight: "1px",
                                    }}
                                    title="Go forward in time"
                                >
                                    {"<"}
                                </button>
                                <button
                                    onClick={handleBackClick}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 hover:text-white font-bold py-2 px-4 rounded-r col-span-1"
                                    style={{
                                        flex: 3,
                                        marginTop: "5px",
                                        marginBottom: "1vh",
                                    }}
                                    title="Go back in time"
                                >
                                    {">"}
                                </button>
                            </div>
                            <svg className="-ml-5 " height={svgHeight} width={svgWidth}>
                                <line
                                    className="timeline-line"
                                    strokeWidth="2"
                                    x1={0.8 * svgWidth}
                                    x2={0.8 * svgWidth}
                                    y1={cvData[0]["y1"]}
                                    y2={svgHeight}
                                />
                                {yearMarkers.map((el, i) => {
                                    return (
                                        <line
                                            className="timeline-line"
                                            strokeWidth="2"
                                            x1={0.15 * svgWidth}
                                            x2={0.8 * svgWidth}
                                            y1={el.position * svgHeight}
                                            y2={el.position * svgHeight}
                                            key={i}
                                        />
                                    );
                                })}
                                {yearMarkers.map((el, i) => {
                                    return (
                                        <text
                                            className="timeline-year-text"
                                            x={0.15 * svgWidth}
                                            y={el.position * svgHeight - 5}
                                            key={i}
                                        >
                                            {el.year}
                                        </text>
                                    );
                                })}
                                {reverseCvData.map((el, i) => {
                                    return (
                                        <Line
                                            onMouseEnter={() => handleLineMouseEnter(i)}
                                            onMouseLeave={() => handleLineMouseLeave()}
                                            x1={0.8}
                                            x2={0.8}
                                            y1={el["y1"]}
                                            y2={el["y2"]}
                                            svgHeight={svgHeight}
                                            svgWidth={svgWidth}
                                            stroke={colorArrays[el.category][i % 2]}
                                            currentlyHovered={currentlyHovered === i}
                                            key={i}
                                        />
                                    );
                                })}
                            </svg>
                        </div>
                        <div 
                            id="info-div" 
                            className={"info-div text-xs md:text-sm lg:text-base md:pl-3 md:pr-3 col-span-2"}
                            style={{}}
                            >
                            <div className="h-1/6 row-span-full grid grid-cols-3 gap-1 shadow-smYellow md:shadow-mdYellow border-white border-2 border-solid">
                                <div className="logo-div h-full flex content-center justify-center items-center col-span-1 self-center">
                                    <img
                                        src={require("../../../Images/Logos/" +
                                            reverseCvData[currentlyHovered].image +
                                            "").default}
                                        className="logo max-h-full border-white border-2 border-solid"
                                        alt=""
                                    />
                                </div>
                                <div className="title-company col-span-1 self-center">
                                    <span className="para">
                                        <div className="-mb-0 md:mb-5 font-bold">{reverseCvData[currentlyHovered].title}</div>
                                        <div>{reverseCvData[currentlyHovered].company}</div>
                                    </span>
                                </div>
                                <div className="col-span-1 self-center">
                                    <span className="para">
                                        <div className="-mb-0 md:mb-5 italic">
                                            {reverseCvData[currentlyHovered].startDate}{" "}
                                            - {reverseCvData[currentlyHovered].endDate}
                                        </div>
                                        <div>{reverseCvData[currentlyHovered].location}</div>
                                    </span>
                                </div>
                            </div>
                            <div
                                className={
                                    reverseCvData[currentlyHovered].category ===
                                    "Travel"
                                        ? "p-2 shadow-smYellow md:shadow-mdYellow border-white border-2 border-solid h-3/6 mt-4 mb-4 flex justify-center items-center content-center"
                                        : "grid p-2 shadow-smYellow md:shadow-mdYellow border-white border-2 border-solid h-3/6 mt-4 mb-4"
                                }
                            >
                                {reverseCvData[currentlyHovered].category !==
                                    "Travel" && (
                                    <div className="">
                                        {reverseCvData[
                                            currentlyHovered
                                        ].description.map((el, i) => {
                                            return (
                                                <span className="para" key={i}>
                                                    {el}
                                                    <br />
                                                </span>
                                            );
                                        })}
                                    </div>
                                )}
                                {reverseCvData[currentlyHovered].category ===
                                    "Travel" && (
                                    <SlideShow data={reverseCvData[currentlyHovered]} />
                                )}
                            </div>
                            <div id="map-div" className="map-div shadow-smYellow md:shadow-mdYellow border-white border-2 border-solid grid h-1/6">
                                <ReactEcharts
                                    option={getEchartOption(
                                        reverseCvData[currentlyHovered]
                                    )}
                                    lazyUpdate={true}
                                    className="world-map"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default CV;
