import React, { useState, useEffect } from "react";
import "./CV.css";
import { useSpring, animated } from "react-spring";
import { cvData, colorArrays, cvDataInt } from "./cvData";
import ReactEcharts from "echarts-for-react";
import echarts from "echarts";
import world from "../../../Images/world_echarts_big.json";

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

const getEchartOption = (selection: cvDataInt) => {
    let countries = [
        "Sweden",
        "United States",
        "New Zealand",
        "Australia",
        "Nepal",
        "Cambodia",
        "Thailand",
        "Germany",
    ];
    let mapData: any[] = [];
    countries.forEach((country) => {
        mapData.push({
            name: country,
            value: country === selection.country ? 2 : 1,
            label: { show: false },
        });
    });
    const rawData = [
        {
            name: "Iowa City",
            value: [-90, 41, "Iowa City" === selection.city ? 4 : 3],
        },
        {
            name: "Coralville",
            value: [-90, 41, "Coralville" === selection.city ? 4 : 3],
        },
        {
            name: "Stockholm",
            value: [18, 59.5, "Stockholm" === selection.city ? 4 : 3],
        },
        {
            name: "NYC",
            value: [-74, 41, "NYC" === selection.city ? 4 : 3],
        },
    ];
    let scatterData: any[] = [];
    let effectScatterData: any[] = [];
    rawData.forEach((el, i) => {
        if (el.name === selection.city) {
            effectScatterData.push(el);
        } else {
            scatterData.push(el);
        }
    });
    // seperate scatter and 1 effectScatter data
    return {
        geo: {
            name: "World Map",
            type: "map",
            map: "WORLD",
            roam: true,
            show: true,
            selectedMode: "single",
            label: {
                emphasis: {
                    color: "rgb(255, 255, 255)",
                    show: false,
                },
            },
            zoom: 1.25,
            // itemStyle: {
            //     normal: {
            //         areaColor: "#323c48",
            //         borderColor: "#111",
            //     },
            //     emphasis: {
            //         opacity: 0.4,
            //         areaColor: "#2a333d",
            //     },
            // },
        },
        visualMap: {
            left: "right",
            min: 1,
            max: 4,
            inRange: {
                color: ["yellowgreen", "yellow", "blue", "orange"],
            },
            text: ["High", "Low"], // 文本，默认为数值文本
            calculable: true,
            show: false,
        },
        tooltip: {
            trigger: "item",
            showDelay: 0,
            transitionDuration: 0.2,
            formatter: function (params) {
                let oldValue = (params.value + "").split(".");
                let value = oldValue[0].replace(
                    /(\d{1,3})(?=(?:\d{3})+(?!\d))/g,
                    "$1,"
                );
                // return params.seriesName + "<br/>" + params.name + ": " + value;
                return params.name;
            },
        },
        series: [
            {
                type: "scatter",
                coordinateSystem: "geo",
                zlevel: 4,
                // animation: true,
                data: scatterData,
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
            {
                type: "effectScatter",
                coordinateSystem: "geo",
                zlevel: 4,
                // animation: true,
                data: effectScatterData,
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
            {
                name: "World Map",
                type: "map",
                // roam: true,
                // map: "WORLD",
                geoIndex: 0,
                emphasis: {
                    label: {
                        // show: true,
                    },
                },
                // silent: true,  // disables mouse events
                data: mapData,
                // [
                //     { name: "Germany", value: 1, label: { show: false } },
                //     {
                //         name: "New Zealand",
                //         value: 1,
                //         label: { show: false },
                //     },
                //     { name: "United States", value: 1, label: { show: false } },
                // ],
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

        echarts.registerMap("WORLD", world, {});

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // mouse hover over chart
    const [currentlyHovered, setCurrentlyHovered] = useState(cvData.length - 1);
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
                        option={getEchartOption(
                            reverseCvData[currentlyHovered]
                        )}
                        lazyUpdate={true}
                        style={{ height: "500px", width: "100%" }}
                    />
                </div>
            </div>
        </>
    );
}
export default CV;
