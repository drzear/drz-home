import React, { useState, useEffect } from "react";
import "./CV.css";
// import * as d3 from "d3";
import { useSpring, animated } from "react-spring";
import { cvData, colorArrays } from "./cvData";
import ReactEcharts from "echarts-for-react";
import echarts from "echarts";
import world from "../../../Images/world.json";

const Line = (props) => {
    const spring = useSpring({
        width: 0.1 * props.svgWidth * (props.currentlyHovered ? 1.5 : 1),
        y1:
            props.y1 * props.svgHeight -
            props.svgHeight * (props.currentlyHovered ? 0.01 : 0.0),
        y2:
            props.y2 * props.svgHeight +
            props.svgHeight * (props.currentlyHovered ? 0.01 : 0.0),
        color: props.currentlyHovered ? "yellow" : props.stroke,
        from: {
            width: 0.1 * props.svgWidth * (props.currentlyHovered ? 1.5 : 1),
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
            // y1={spring.y1}
            // y2={spring.y2}
            // stroke={props.stroke}
            stroke={spring.color}
            strokeWidth={spring.width}
            // onClick={props.onMouseClick}
            onMouseEnter={props.onMouseEnter}
            // onMouseLeave={props.onMouseLeave}
            // strokeLinecap="round"
            style={{ cursor: "pointer" }}
        />
    );
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

    // get total months for number of pieces in timeline
    // const firstYearMonths = 12 - +firstDate.toString().slice(4) + 1;
    // const lastYearMonths = +latestDate.toString().slice(4);
    // const otherMonths =
    //     (+latestDate.toString().slice(0, 4) -
    //         +firstDate.toString().slice(0, 4) -
    //         1) *
    //     12;
    // const totalMonths = firstYearMonths + lastYearMonths + otherMonths;

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

        // const firstYearMonthsLoop =
        //     12 - +el.startYYYYMM.toString().slice(4) + 1;
        // const lastYearMonthsLoop = +el.endYYYYMM.toString().slice(4);
        // const otherMonthsLoop =
        //     (+el.endYYYYMM.toString().slice(0, 4) -
        //         +el.startYYYYMM.toString().slice(0, 4) -
        //         1) *
        //     12;

        // console.log(
        //     el.startYYYYMM,
        //     el.endYYYYMM,
        //     firstYearMonthsLoop + lastYearMonthsLoop + otherMonthsLoop
        // );
        // const fractionOfTotal =
        //     (firstYearMonthsLoop + lastYearMonthsLoop + otherMonthsLoop) /
        //     totalMonths;
        // el["y1"] = i === 0 ? 0 : currentPosition;
        // currentPosition += fractionOfTotal;
        // el["y2"] = currentPosition;
        el["y1"] = y1;
        el["y2"] = y2;
    });

    // cvData.length;
    return yearMarkers;
}

function CV() {
    // window resizing
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };
        window.addEventListener("resize", handleResize);

        echarts.registerMap("world", world, {});

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // mouse hover over chart
    const [currentlyHovered, setCurrentlyHovered] = useState(0);
    // const [currentlySelected, setCurrentlySelected] = useState(-1);
    const handleLineMouseEnter = (line: number) => {
        setCurrentlyHovered(line);
    };
    const handleLineMouseLeave = () => {
        setCurrentlyHovered(-1);
    };
    // const handleLineMouseClick = (line: number) => {
    //     setCurrentlySelected(line);
    // };
    const yearMarkers: { year: number; position: number }[] = parseData();

    const svgHeight = 2 * height;
    const svgWidth = 0.25 * width;
    const reverseCvData = [...cvData].reverse();
    return (
        <>
            <div className="cv-div">
                <div className="cv-div-timeline">
                    <svg height={svgHeight} width={svgWidth}>
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
                                    className="year-text"
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
                                    // onMouseClick={() => handleLineMouseClick(i)}
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
                <div className="cv-div-text">
                    {/* {currentlyHovered !== -1 && (
                            <> */}
                    <div>
                        <div className="time-location">
                            <img
                                src={require("../../../Images/Logos/" +
                                    reverseCvData[currentlyHovered].image +
                                    "")}
                                className="logo"
                                // src={reverseCvData[currentlyHovered].image}
                                alt=""
                            />
                        </div>
                        <div className="time-location">
                            <span className="cv-para">
                                {/* <i>from</i> */}
                                <span role="img" aria-label="time period">
                                    🕢
                                </span>
                                <br />
                                {
                                    reverseCvData[currentlyHovered].startDate
                                } - {reverseCvData[currentlyHovered].endDate}
                                <br />
                                {/* <i>in</i> */}
                                <span role="img" aria-label="location">
                                    🗺️
                                </span>
                                <br />
                                {reverseCvData[currentlyHovered].location}
                            </span>
                        </div>
                        <div className="title-company">
                            <span className="cv-para">
                                <span role="img" aria-label="job title">
                                    👔
                                </span>
                                <br />
                                {reverseCvData[currentlyHovered].title}
                                <br />
                                <i>@</i>
                                <br />
                                {reverseCvData[currentlyHovered].company}
                            </span>
                        </div>
                    </div>
                    <br />
                    <div>
                        <div className="">
                            {reverseCvData[currentlyHovered].description.map(
                                (el, i) => {
                                    return (
                                        <span className="cv-para" key={i}>
                                            {el}
                                            <br />
                                        </span>
                                    );
                                }
                            )}
                        </div>
                    </div>
                    {/* </>
                        )} */}
                </div>
                <div className="cv-div-chart">
                    <ReactEcharts
                        option={{
                            xAxis: {
                                type: "category",
                                data: [
                                    "Mon",
                                    "Tue",
                                    "Wed",
                                    "Thu",
                                    "Fri",
                                    "Sat",
                                    "Sun",
                                ],
                            },
                            yAxis: {
                                type: "value",
                            },
                            series: [
                                {
                                    data: [
                                        820,
                                        932,
                                        901,
                                        934,
                                        1290,
                                        1330,
                                        1320,
                                    ],
                                    type: "line",
                                },
                            ],
                        }}
                    />
                </div>
            </div>
        </>
    );
}
export default CV;
