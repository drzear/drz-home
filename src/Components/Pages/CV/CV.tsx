import React, { useState, useEffect } from "react";
import "./CV.css";
import { useSpring, animated } from "react-spring";
import { cvData, colorArrays, cvDataInt } from "./cvData";
import ReactEcharts from "echarts-for-react";
import echarts from "echarts";
import world from "../../../Images/world_echarts_big.json";
import Button from "react-bootstrap/Button";

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
            value:
                selection.country.findIndex((el) => country === el) !== -1
                    ? 2
                    : 1,
            label: { show: false },
        });
    });
    const rawData = [
        {
            name: "Iowa City",
            value: [-91.5302, 41.6611, "Iowa City" === selection.city ? 4 : 3],
        },
        {
            name: "Coralville",
            value: [-91.5302, 41.6611, "Coralville" === selection.city ? 4 : 3],
        },
        {
            name: "Stockholm",
            value: [18.0686, 59.3293, "Stockholm" === selection.city ? 4 : 3],
        },
        {
            name: "NYC",
            value: [-74.006, 40.7128, "NYC" === selection.city ? 4 : 3],
        },
        {
            name: "Epe",
            value: [7.0289, 52.1841, "Epe" === selection.city ? 4 : 3],
        },
    ];
    const thaiCities = [
        { name: "Bangkok", value: [100.5018, 13.7563, 3] },
        { name: "Ayutthaya", value: [100.5877, 14.3692, 3] },
        { name: "Lopburi", value: [100.6534, 14.7995, 3] },
        { name: "Chiang Mai", value: [98.9853, 18.7883, 3] },
        { name: "Doi Inthanon", value: [98.4871, 18.588, 3] },
        { name: "Pai", value: [98.4405, 19.3582, 3] },
        { name: "Chiang Rai", value: [99.8406, 19.9105, 3] },
        { name: "Khao Yai", value: [101.3722, 14.4387, 3] },
        { name: "Krong Siem Reap", value: [103.8564, 13.3633, 3] },
        { name: "Angkor Wat", value: [103.867, 13.4125, 3] },
    ];
    const nepalCities = [
        { name: "Dhulikhel", value: [85.5561, 27.6253, 3] },
        { name: "Kathmandu", value: [85.324, 27.7172, 3] },
        { name: "Pokhara", value: [83.9856, 28.2096, 3] },
        { name: "Pothana", value: [83.8303, 28.3132, 3] }, // HERE
    ];
    const nzCities = [
        { name: "Paihia", value: [174.091, -35.2821, 3] },
        { name: "Auckland", value: [174.763336, -36.848461, 3] },
        { name: "Christchurch", value: [172.639847, -43.52565, 3] },
        { name: "Thames", value: [175.5491, -37.1479, 3] },
        { name: "Cathedral Cove", value: [175.79, -36.8277, 3] },
        { name: "Matamata", value: [175.7817, -37.8132, 3] },
        { name: "Hamilton", value: [175.273392, -37.730675, 3] },
        { name: "Waitomo", value: [175.098572, -38.261894, 3] },
        { name: "Rotorua", value: [176.2378, -38.1446, 3] },
        { name: "Taupo", value: [176.070206, -38.685692, 3] },
        { name: "Mount Tongariro", value: [175.6358, -39.1296, 3] },
        { name: "Napier", value: [176.9136, -39.4919, 3] },
        { name: "Wellington", value: [174.777969, -41.276825, 3] },
        { name: "Picton", value: [174.0057, -41.293, 3] },
        { name: "Motueka", value: [173.0112, -41.1101, 3] },
        { name: "Karamea", value: [172.1282, -41.2509, 3] },
        { name: "Westport", value: [171.5928, -41.7669, 3] },
        { name: "Franz Josef Glacier", value: [170.1819, -43.3873, 3] },
        { name: "Wanaka", value: [169.1417, -44.6943, 3] },
        { name: "Queenstown", value: [168.6616, -45.0302, 3] },
        { name: "Milford Sound", value: [167.8974, -44.6414, 3] },
        { name: "Manapouri", value: [167.609, -45.5662, 3] },
        { name: "Invercargill", value: [168.3615, -46.4179, 3] },
        { name: "The Catlins", value: [169.1972, -46.4636, 3] },
        { name: "Dunedin", value: [170.4911, -45.8668, 3] },
        { name: "Lake Tekapo", value: [170.4762, -44.0041, 3] },
        { name: "Kaikoura", value: [173.6795, -42.3997, 3] },
    ];
    const ausCities = [
        { name: "Adelaide", value: [138.6007, -34.9285, 3] },
        { name: "Melbourne", value: [144.9631, -37.8136, 3] },
        { name: "Sydney", value: [151.2093, -33.8688, 3] },
        { name: "Byron Bay", value: [153.602, -28.6474, 3] },
        { name: "Gold Coast", value: [153.4, -28.0167, 3] },
        { name: "Noosa", value: [152.9677, -26.3645, 3] },
        { name: "Whitsundays", value: [148.1893, -20.3441, 3] },
        { name: "Cairns", value: [145.7781, -16.9186, 3] },
    ];
    let scatterData: any[] = [];
    let effectScatterData: any[] = [];
    let zoom: number;
    let center: number[];
    if (selection.country[0] === "Thailand") {
        zoom = 9;
        center = [100, 12];
        effectScatterData = thaiCities;
    } else if (selection.country[0] === "Nepal") {
        zoom = 13;
        center = [85.324, 27.7172];
        effectScatterData = nepalCities;
    } else if (selection.country[0] === "Australia") {
        zoom = 5;
        center = [133.7751, -25.2744];
        effectScatterData = ausCities;
    } else if (selection.country[0] === "New Zealand") {
        zoom = 13;
        center = [174.886, -40.9006];
        effectScatterData = nzCities;
    } else {
        // zoom = 9;
        // center = [100, 12];
        zoom = 1.25;
        center = [0, 0];
        rawData.forEach((el, i) => {
            if (el.name === selection.city) {
                effectScatterData.push(el);
            } else {
                // scatterData.push(el);
            }
        });
    }
    // seperate scatter and 1 effectScatter data
    return {
        geo: {
            name: "World Map",
            type: "map",
            map: "WORLD",
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
            zoom: zoom,
            center: center,
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
            // {
            //     type: "scatter",
            //     coordinateSystem: "geo",
            //     zlevel: 4,
            //     // animation: true,
            //     data: scatterData,
            //     encode: {
            //         value: 2,
            //     },
            //     symbolSize: function (val) {
            //         return val[2] ^ 10;
            //     },
            //     showEffectOn: "render",
            //     rippleEffect: {
            //         brushType: "stroke",
            //     },
            //     hoverAnimation: true,
            //     // silent: true, // disables mouse events
            //     // roam: "move",
            // },
            {
                type: "effectScatter",
                coordinateSystem: "geo",
                zlevel: 4,
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
    const handleBackClick = () => {
        const bla =
            currentlyHovered === 0 ? cvData.length - 1 : currentlyHovered - 1;
        setCurrentlyHovered(bla);
    };
    // TODO HERE HANDLE LAST INSTANCE e.g. if currentlyHovered = blabla.length : 0
    const handleNextClick = () => {
        const bla =
            currentlyHovered === cvData.length - 1 ? 0 : currentlyHovered + 1;
        setCurrentlyHovered(bla);
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
                    <Button
                        onClick={handleNextClick}
                        variant="secondary"
                        style={{
                            width: 0.49 * svgWidth,
                            marginTop: "1vh",
                            marginBottom: "1vh",
                            marginRight: 0.01 * svgWidth,
                        }}
                    >
                        {"<"}
                    </Button>
                    <Button
                        onClick={handleBackClick}
                        variant="secondary"
                        style={{
                            width: 0.49 * svgWidth,
                            marginTop: "1vh",
                            marginBottom: "1vh",
                            marginLeft: 0.01 * svgWidth,
                        }}
                    >
                        {">"}
                    </Button>
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
                                style={{
                                    borderRadius: "10%",
                                }}
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
                        style={{ maxHeight: "500px", width: "100%" }}
                    />
                </div>
            </div>
        </>
    );
}
export default CV;
