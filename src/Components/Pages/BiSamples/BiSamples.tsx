import React, { useState, useEffect } from "react";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import ReactEcharts from "echarts-for-react";
import echarts from "echarts";
import "./BiSamples.css";
import covidData from "./owid-covid-data.json";
import usaCovidData from "./weekly-usa-covid.json";
import { CovidData, SelectionOptionsCovid, usaDiseases } from "./biData";
import world from "../../../Images/world_echarts_big.json";
import usa from "../../../Images/USA.json";
import states from "../../../Images/us_state_pops_2019.json";

const processTimeData = (
    data: any,
    selectionOne: string,
    selectionTwo: string
) => {
    let worldMapCountries: string[] = [];
    world.features.forEach((el) => {
        worldMapCountries.push(el.properties.name);
    });
    worldMapCountries.sort();
    // worldMap.features[0].properties.name;
    let totalDeaths = 0;
    let dataArray: any[] = [];
    let dataCountries: string[] = [];
    Object.keys(data).forEach((cntry) => {
        dataCountries.push(data[cntry]["location"]);
        data[cntry]["data"].forEach((date: CovidData) => {
            if (cntry !== "OWID_WRL" && date["date"] && cntry === "USA") {
                const dt = new Date(date["date"]);
                const mth = dt.getMonth() + 1;
                const yr = dt.getFullYear();
                if (
                    dataArray.findIndex((el) => el["month"] === mth) === -1 ||
                    dataArray.findIndex((el) => el["year"] === yr) === -1
                ) {
                    dataArray.push({
                        month: mth,
                        year: yr,
                    });
                    dataArray[dataArray.length - 1][selectionOne] = date[
                        selectionOne
                    ]
                        ? date[selectionOne]
                        : 0;
                    dataArray[dataArray.length - 1][selectionTwo] = date[
                        selectionTwo
                    ]
                        ? date[selectionTwo]
                        : 0;
                } else {
                    const idx = dataArray.findIndex(
                        (el) => el["month"] === mth && el["year"] === yr
                    );
                    dataArray[idx][selectionOne] += date[selectionOne]
                        ? date[selectionOne]
                        : 0;
                    dataArray[idx][selectionTwo] += date[selectionTwo]
                        ? date[selectionTwo]
                        : 0;
                }
                // const minDt = new Date("2020-01-01");
                // const maxDt = new Date("2020-12-07");
                // if (dt <= maxDt && dt >= minDt && date.new_deaths) {
                //     totalDeaths += date.new_deaths;
                // }
            }
        });
    });

    dataCountries.sort();
    let noMatchCountries: string[] = [];
    dataCountries.forEach((el) => {
        if (worldMapCountries.findIndex((wmEl) => el === wmEl) === -1) {
            noMatchCountries.push(el);
        }
    });
    // console.log(noMatchCountries);

    dataArray.sort((a, b) => a["month"] - b["month"]);
    dataArray.sort((a, b) => a["year"] - b["year"]);
    return dataArray;
};

const processMapData = (data: any, selection: string) => {
    let dataArray: { name: string; value: number; label: any }[] = [];

    Object.keys(data).forEach((cntry) => {
        if (cntry !== "OWID_WRL") {
            const country = data[cntry]["location"];
            // generate array of {cntry, value}
            if (dataArray.findIndex((el) => el["name"] === country) === -1) {
                dataArray.push({
                    name: data[cntry]["location"],
                    value: 0,
                    label: { show: false },
                });
            }
            // filtered values
            data[cntry]["data"].forEach((date: CovidData) => {
                if (date["date"]) {
                    const dt = new Date(date["date"]);
                    const mth = dt.getMonth() + 1;
                    const yr = dt.getFullYear();
                    if (
                        // date in date range TODO
                        date[selection]
                    ) {
                        const idx = dataArray.findIndex(
                            (el) => el["name"] === country
                        );
                        dataArray[idx]["value"] += date[selection];
                    }
                }
            });
        }
    });

    // dataArray.sort((a, b) => a.value - b.value);

    return dataArray;
};

const getMapEchartOption = (
    mapData: { name: string; value: number; label: any }[]
) => {
    let maxValue: number = 0;
    mapData.forEach((el) => {
        if (el.value > maxValue) {
            maxValue = el.value;
        }
    });
    // seperate scatter and 1 effectScatter data
    return {
        geo: {
            name: "World Map",
            type: "map",
            map: "world",
            roam: true,
            // roam: false,
            // silent: false,
            show: true,
            selectedMode: "single",
            label: {
                emphasis: {
                    color: "rgb(255, 255, 255)",
                    show: false,
                },
            },
            zoom: 1,
            center: [0, 0],
            // zoom: selection.zoom,
            // center: selection.center,
        },
        visualMap: {
            left: "right",
            min: 0,
            max: maxValue,
            // inRange: {
            //     color: ["yellowgreen", "yellow", "gray", "red"],
            // },
            text: ["High", "Low"],
            calculable: true,
            // show: false,
        },
        tooltip: {
            trigger: "item",
            showDelay: 0,
            transitionDuration: 0.2,
            formatter: function (params) {
                return (
                    params.name + ": " + (params.value ? params.value : "N/A")
                );
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
        ],
    };
};

const getUSAMapEchartOption = () => {
    // console.log(usaCovidData);

    // maybe change this to deaths % change vs 2019? or % of total
    // either way prob just 1 year

    let dataArray: any[] = [];
    usaCovidData.forEach((row) => {
        const state = row["Jurisdiction of Occurrence"];
        let val = 0;
        if (row["All Cause"] && typeof row["All Cause"] === "string") {
            val = parseFloat(row["All Cause"].replace(/,/g, ""));
        } else if (row["All Cause"] && typeof row["All Cause"] === "number") {
            val = row["All Cause"];
        }
        if (dataArray.findIndex((el) => state === el["name"]) === -1) {
            dataArray.push({ name: state, value: val });
        } else {
            const idx = dataArray.findIndex((el) => state === el["name"]);
            dataArray[idx]["value"] += val;
        }
    });
    let max = 0;
    dataArray.forEach((el) => {
        if (el["name"] !== "United States" && el["value"] > max) {
            max = el["value"];
        }
    });
    return {
        title: {
            text: "USA Deaths",
            subtext: "Data from the US CDC",
            sublink:
                "https://data.cdc.gov/NCHS/Weekly-Counts-of-Deaths-by-State-and-Select-Causes/muzy-jte6",
            left: "left",
        },
        tooltip: {
            trigger: "item",
            showDelay: 0,
            transitionDuration: 0.2,
            formatter: function (params) {
                let valueSplit = (params.value + "").split(".");
                let value = valueSplit[0].replace(
                    /(\d{1,3})(?=(?:\d{3})+(?!\d))/g,
                    "$1,"
                );
                return params.seriesName + "<br/>" + params.name + ": " + value;
            },
        },
        visualMap: {
            left: "right",
            min: 0,
            max: max,
            inRange: {
                color: [
                    "#313695",
                    "#4575b4",
                    "#74add1",
                    "#abd9e9",
                    "#e0f3f8",
                    "#ffffbf",
                    "#fee090",
                    "#fdae61",
                    "#f46d43",
                    "#d73027",
                    "#a50026",
                ],
            },
            // text: ["High", "Low"],
            calculable: true,
        },
        series: [
            {
                name: "USA PopEstimates",
                type: "map",
                roam: true,
                map: "USA",
                emphasis: {
                    label: {
                        show: true,
                    },
                },
                textFixed: {
                    Alaska: [20, -20],
                },
                data: dataArray,
            },
        ],
    };
};

const getUSALineEchartOption = (selectedState: string) => {
    const selectedStates = ["Iowa", "Illinois"];
    // const selectedState = "California";
    let dataArray: any[] = [];
    usaCovidData.forEach((row) => {
        const state = row["Jurisdiction of Occurrence"];
        if (
            row["MMWR Year"] === 2020 &&
            selectedStates.find((el) => el === state)
        ) {
            const week = row["MMWR Week"];
            if (dataArray.findIndex((el) => el["week"] === week) === -1) {
                dataArray.push({ week: week });
            }
            Object.keys(row).forEach((key) => {
                if (usaDiseases[key]) {
                    const idx = dataArray.findIndex(
                        (el) => el["week"] === week
                    );
                    let val = 0;
                    if (row[key] && typeof row[key] === "string") {
                        val = parseFloat(row[key].replace(/,/g, ""));
                    } else if (row[key] && typeof row[key] === "number") {
                        val = row[key];
                    }
                    if (dataArray[idx][key]) {
                        dataArray[idx][key] += val;
                    } else {
                        dataArray[idx][key] = val;
                    }
                }
            });
        }

        // let val = 0;
        // if (row["All Cause"] && typeof row["All Cause"] === "string") {
        //     val = parseFloat(row["All Cause"].replace(/,/g, ""));
        // } else if (row["All Cause"] && typeof row["All Cause"] === "number") {
        //     val = row["All Cause"];
        // }
        // if (dataArray.findIndex((el) => state === el["name"]) === -1) {
        //     dataArray.push({ name: state, value: val });
        // } else {
        //     const idx = dataArray.findIndex((el) => state === el["name"]);
        //     dataArray[idx]["value"] += val;
        // }
    });
    let finalArray: { name: string; type: string; data: number[] }[] = [];
    dataArray.forEach((row, i) => {
        // first create series entry for each disease
        if (i === 1) {
            Object.keys(row).forEach((key) => {
                if (key !== "week") {
                    finalArray.push({ name: key, type: "line", data: [] });
                }
            });
        }
        Object.keys(row).forEach((key) => {
            const idx = finalArray.findIndex((el) => el["name"] === key);
            // only if index is found (to avoid "week")
            if (idx !== -1) {
                finalArray[idx]["data"].push(row[key]);
            }
        });
    });
    console.log(finalArray, dataArray);

    return {
        title: {
            text: "",
        },
        tooltip: {
            trigger: "axis",
        },
        legend: {
            data: finalArray.map((el) => el.name),
        },
        grid: {
            left: "3%",
            right: "4%",
            bottom: "6%",
            containLabel: true,
        },
        toolbox: {
            feature: {
                saveAsImage: {},
            },
        },
        xAxis: {
            type: "category",
            // boundaryGap: false,
            data: dataArray.map((el) => el.week),
            name: "Week in 2020",
            nameLocation: "middle",
            nameGap: 25,
        },
        yAxis: {
            type: "value",
        },
        dataZoom: [
            // {
            //     type: "inside",
            // },
            {
                type: "slider",
            },
        ],
        series: finalArray,
    };
};

const getTimeEchartOption = (
    data: any[],
    selectionOne: string,
    selectionTwo: string
) => {
    // console.log(data);
    // seperate scatter and 1 effectScatter data
    return {
        title: {
            text: "Covid by Month",
        },
        legend: {
            data: [selectionOne, selectionTwo],
        },
        toolbox: {
            // feature: {
            //     magicType: {
            //         type: ["stack", "tiled"],
            //     },
            // },
        },
        tooltip: {},
        xAxis: {
            data: data.map(
                (el) => el.month.toString() + "-" + el.year.toString()
            ),
            splitLine: {
                show: false,
            },
        },
        yAxis: {},
        series: [
            {
                name: selectionOne,
                type: "bar",
                data: data.map((el) => el[selectionOne]),
                animationDelay: function (idx) {
                    return idx * 10;
                },
            },
            {
                name: selectionTwo,
                type: "bar",
                data: data.map((el) => el[selectionTwo]),
                animationDelay: function (idx) {
                    return idx * 10 + 100;
                },
            },
        ],
        animationEasing: "elasticOut",
        animationDelayUpdate: function (idx) {
            return idx * 5;
        },
    };
};

function BiSamples() {
    const [selectionOne, setSelectionOne] = useState("new_cases");
    const [selectionTwo, setSelectionTwo] = useState("new_deaths");
    const [selectionMap, setSelectionMap] = useState("new_deaths_per_million");
    const [selectionState, setSelectionState] = useState("United States");

    useEffect(() => {
        echarts.registerMap("world", world, {});
        echarts.registerMap("USA", usa, {
            Alaska: {
                left: -131,
                top: 25,
                width: 15,
            },
            Hawaii: {
                left: -110,
                top: 28,
                width: 5,
            },
            "Puerto Rico": {
                left: -76,
                top: 26,
                width: 2,
            },
        });
    }, []);

    const processedTimeData = processTimeData(
        covidData,
        selectionOne,
        selectionTwo
    );
    const processedMapData = processMapData(covidData, selectionMap);
    let states: string[] = [];
    usaCovidData.forEach((row) => {
        const state = row["Jurisdiction of Occurrence"];
        if (states.findIndex((el) => el === state) === -1) {
            states.push(state);
        }
    });
    states.sort();

    return (
        <>
            <Container className="bi-container">
                BI Samples
                {/* <Row>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {selectionOne}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {SelectionOptionsCovid.map((el, i) => {
                                return (
                                    <Dropdown.Item
                                        onClick={() =>
                                            setSelectionOne(el.value)
                                        }
                                        key={i}
                                    >
                                        {el.name}
                                    </Dropdown.Item>
                                );
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            {selectionTwo}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {SelectionOptionsCovid.map((el, i) => {
                                return (
                                    <Dropdown.Item
                                        onClick={() =>
                                            setSelectionTwo(el.value)
                                        }
                                        key={i}
                                    >
                                        {el.name}
                                    </Dropdown.Item>
                                );
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                </Row>
                <Row>
                    <Col>
                        <div className="">
                            <ReactEcharts
                                option={getTimeEchartOption(
                                    processedTimeData,
                                    selectionOne,
                                    selectionTwo
                                )}
                                lazyUpdate={true}
                                // className="world-map"
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {selectionMap}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {SelectionOptionsCovid.map((el, i) => {
                                return (
                                    <Dropdown.Item
                                        onClick={() =>
                                            setSelectionMap(el.value)
                                        }
                                        key={i}
                                    >
                                        {el.name}
                                    </Dropdown.Item>
                                );
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                </Row>
                <Row>
                    <Col>
                        <div className="">
                            <ReactEcharts
                                option={getMapEchartOption(processedMapData)}
                                lazyUpdate={true}
                                className="covid-world-map"
                            />
                        </div>
                    </Col>
                </Row> */}
                <Row>
                    <Col>
                        <div className="">
                            <ReactEcharts
                                option={getUSAMapEchartOption()}
                                lazyUpdate={true}
                                className="covid-world-map"
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {selectionState}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {states.map((el, i) => {
                                return (
                                    <Dropdown.Item
                                        onClick={() => setSelectionState(el)}
                                        key={i}
                                    >
                                        {el}
                                    </Dropdown.Item>
                                );
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Col>
                        <div style={{ height: "1000px" }}>
                            <ReactEcharts
                                option={getUSALineEchartOption(selectionState)}
                                lazyUpdate={true}
                                className="covid-usa-timeline"
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default BiSamples;
