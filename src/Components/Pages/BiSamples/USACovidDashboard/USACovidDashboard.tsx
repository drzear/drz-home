import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import ReactEcharts from "echarts-for-react";
import echarts from "echarts";
import "./USACovidDashboard.css";
import usaCovidData from "../weekly-usa-covid.json";
import { usaDiseases } from "../biData";
import usa from "../../../../Images/USA.json";
import usaStates from "../../../../Images/us_state_pops_2019.json";

const getUSAMapEchartOption = () => {
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
                return params.name + ": " + value;
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
                name: "Total Deaths",
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

const getUSALineEchartOption = (selectedStates: string[], theme: string) => {
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

    return {
        title: {
            text: "",
        },
        tooltip: {
            trigger: "axis",
        },
        legend: {
            data: finalArray.map((el) => el.name),
            textStyle: {
                color: theme === "light" ? "black" : "white",
            },
        },
        grid: {
            left: "3%",
            right: "4%",
            bottom: "10%",
            containLabel: true,
        },
        toolbox: {
            feature: {
                saveAsImage: {},
            },
        },
        xAxis: {
            type: "category",
            data: dataArray.map((el) => el.week),
            name: "Week in 2020",
            nameLocation: "middle",
            nameGap: 25,
            axisLine: {
                lineStyle: {
                    color: theme === "light" ? "black" : "white",
                },
            },
        },
        yAxis: {
            type: "value",
            axisLine: {
                lineStyle: {
                    color: theme === "light" ? "black" : "white",
                },
            },
        },
        dataZoom: [
            {
                type: "slider",
            },
        ],
        series: finalArray,
    };
};

function USACovidDashboard(props) {
    const [selectionStates, setSelectionStates] = useState(["United States"]);
    const [showStates, setShowStates] = useState(false);

    useEffect(() => {
        echarts.registerMap("USA", usa, {
            Alaska: {
                left: -131,
                top: 25,
                width: 15,
            },
            Hawaii: {
                left: -110,
                top: 24,
                width: 5,
            },
            "Puerto Rico": {
                left: -76,
                top: 26,
                width: 2,
            },
        });
    }, []);

    // remove selected state from list
    const removeState = (state: string) => {
        let states = [...selectionStates];
        const idx = states.indexOf(state);
        if (idx !== -1) {
            states.splice(idx, 1);
            if (states.length) {
                setSelectionStates(states);
            } else {
                setSelectionStates(["United States"]);
            }
        }
    };

    // add selected state to list
    const addState = (state: string) => {
        let states = [...selectionStates];
        if (states[0] === "United States") {
            states.pop();
        }
        if (!states.find((el) => el === state)) {
            states.push(state);
        }
        setSelectionStates(states);
    };

    const showStatesButton = () => {
        setShowStates(!showStates);
    };

    const clearSelectionButton = () => {
        setSelectionStates(["United States"]);
    };
    let states: string[] = [];
    usaCovidData.forEach((row) => {
        const state = row["Jurisdiction of Occurrence"];
        if (
            states.findIndex((el) => el === state) === -1 &&
            state !== "New York City" &&
            state !== "United States"
        ) {
            states.push(state);
        }
    });
    states.sort();
    const onMapClick = (event) => {
        if (event.data && event.data.name) {
            addState(event.data.name);
        }
    };
    const onMapEvents = {
        click: onMapClick,
    };

    return (
        <>
            <Row>
                <Col>
                    <div className="">
                        <ReactEcharts
                            option={getUSAMapEchartOption()}
                            lazyUpdate={true}
                            className="covid-usa-map"
                            onEvents={onMapEvents}
                        />
                    </div>
                </Col>
            </Row>
            <Row style={{ marginBottom: "10px" }}>
                <Col>
                    <Button
                        style={{
                            marginRight: "1px",
                        }}
                        onClick={showStatesButton}
                    >
                        {showStates ? "Hide States" : "Show States"}
                    </Button>
                    <Button onClick={clearSelectionButton}>
                        Clear Selection
                    </Button>
                </Col>
            </Row>
            {showStates && (
                <>
                    <Row>
                        <Col>
                            {usaStates
                                .filter(
                                    (element) =>
                                        !selectionStates.find(
                                            (slxnel) => slxnel === element.State
                                        )
                                )
                                .map((el, i) => {
                                    return (
                                        <Button
                                            style={{
                                                marginRight: "1px",
                                                marginBottom: "1px",
                                            }}
                                            onClick={() => addState(el.State)}
                                            key={i}
                                        >
                                            {el.State}
                                        </Button>
                                    );
                                })}
                        </Col>
                        <Col>
                            {selectionStates.map((el, i) => {
                                return (
                                    <Button
                                        style={{
                                            marginRight: "1px",
                                            marginBottom: "1px",
                                        }}
                                        variant="success"
                                        onClick={() => removeState(el)}
                                        key={i}
                                    >
                                        {el}
                                    </Button>
                                );
                            })}
                        </Col>
                    </Row>
                </>
            )}
            {!showStates && (
                <>
                    <Row>
                        <Col>
                            {selectionStates.map((el, i) => {
                                return (
                                    <Button
                                        style={{
                                            marginRight: "1px",
                                            marginBottom: "1px",
                                        }}
                                        variant="success"
                                        onClick={() => removeState(el)}
                                        key={i}
                                    >
                                        {el}
                                    </Button>
                                );
                            })}
                        </Col>
                    </Row>
                </>
            )}
            <Row>
                <Col>
                    <div style={{ height: "700px" }}>
                        <ReactEcharts
                            option={getUSALineEchartOption(
                                selectionStates,
                                props.theme
                            )}
                            lazyUpdate={true}
                            className="covid-usa-timeline"
                        />
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default USACovidDashboard;
