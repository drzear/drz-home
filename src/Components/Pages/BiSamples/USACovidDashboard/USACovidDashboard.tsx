import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import ReactEcharts from "echarts-for-react";
import echarts from "echarts";
import "./USACovidDashboard.css";
import usaCovidData from "../weekly-usa-covid.json";
import { usaDiseases } from "../biData";
import usa from "../../../../Images/USA.json";
import usaStates from "../us_state_pops_2019.json";

const getUSAMapEchartOption = (theme: string) => {
    // calculate deaths per million per state
    // sometimes the value is a number and sometimes a string so have to clean the numbers before adding
    let dataArray: { name: string; value: number }[] = [];
    usaCovidData.forEach((row) => {
        const state = row["Jurisdiction of Occurrence"];
        // multiple value
        let val0 = 0;
        if (
            row["COVID-19 (U071, Multiple Cause of Death)"] &&
            // eslint-disable-next-line eqeqeq
            row["MMWR Year"] == 2020 &&
            typeof row["COVID-19 (U071, Multiple Cause of Death)"] === "string"
        ) {
            val0 = parseFloat(
                row["COVID-19 (U071, Multiple Cause of Death)"].replace(
                    /,/g,
                    ""
                )
            );
        } else if (
            row["COVID-19 (U071, Multiple Cause of Death)"] &&
            // eslint-disable-next-line eqeqeq
            row["MMWR Year"] == 2020 &&
            typeof row["COVID-19 (U071, Multiple Cause of Death)"] === "number"
        ) {
            val0 = row["COVID-19 (U071, Multiple Cause of Death)"];
        }
        // underlying value NOT NEEDED, APPEARS TO BE FOLDED INTO MULTIPLE CAUSE ABOVE
        // let val1 = 0;
        // if (
        //     row["COVID-19 (U071, Underlying Cause of Death)"] &&
        //     // eslint-disable-next-line eqeqeq
        //     row["MMWR Year"] == 2020 &&
        //     typeof row["COVID-19 (U071, Underlying Cause of Death)"] ===
        //         "string"
        // ) {
        //     val1 = parseFloat(
        //         row["COVID-19 (U071, Underlying Cause of Death)"].replace(
        //             /,/g,
        //             ""
        //         )
        //     );
        // } else if (
        //     row["COVID-19 (U071, Underlying Cause of Death)"] &&
        //     // eslint-disable-next-line eqeqeq
        //     row["MMWR Year"] == 2020 &&
        //     typeof row["COVID-19 (U071, Underlying Cause of Death)"] ===
        //         "number"
        // ) {
        //     val1 = row["COVID-19 (U071, Underlying Cause of Death)"];
        // }
        if (dataArray.findIndex((el) => state === el["name"]) === -1) {
            dataArray.push({ name: state, value: val0 });
        } else {
            const idx = dataArray.findIndex((el) => state === el["name"]);
            dataArray[idx]["value"] += val0;
        }
    });
    // turn raw deaths into per 100,000
    dataArray.forEach((el) => {
        const statePop = usaStates.find((state) => state.State === el.name);
        el.value =
            (el.value / (statePop?.Population ? statePop?.Population : 1)) *
            100000;
    });
    let max = 0;
    dataArray.forEach((el) => {
        if (
            usaStates.find((state) => state.State === el["name"]) &&
            el["value"] > max
        ) {
            max = el["value"];
        }
    });
    return {
        title: {
            text: "USA Covid-Related Deaths per 100,000",
            textStyle: {
                color: theme === "light" ? "black" : "white",
            },
            subtext: "Data from the US CDC as of 2020-11-08",
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
                color: ["aqua", "darkblue"],
            },
            calculable: true,
            textStyle: {
                color: theme === "light" ? "black" : "white",
            },
        },
        series: [
            {
                name: "Total Deaths",
                type: "map",
                roam: true,
                map: "USA",
                emphasis: {
                    label: {
                        show: false,
                    },
                    itemStyle: {
                        areaColor: "white",
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
    // get array of {week, cause1, cause2, ...}
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
    // get population for all selected states
    let population = 0;
    if (selectedStates[0] === "United States") {
        usaStates.forEach((state) => (population += state.Population));
    } else {
        usaStates.forEach((state) => {
            if (
                selectedStates.find(
                    (selectedState) => selectedState === state.State
                )
            ) {
                population += state.Population;
            }
        });
    }
    let finalArray: {
        name: string;
        type: string;
        data: number[];
        animationEasing: string;
        animationDuration: number;
    }[] = [];
    dataArray.forEach((row, i) => {
        // first create series entry for each disease
        if (i === 1) {
            Object.keys(row).forEach((key) => {
                if (key !== "week") {
                    finalArray.push({
                        name: key,
                        type: "line",
                        data: [],
                        animationEasing: "linear",
                        animationDuration: 1000,
                    });
                }
            });
        }
        Object.keys(row).forEach((key) => {
            const idx = finalArray.findIndex((el) => el["name"] === key);
            // only if index is found (to avoid "week")
            if (idx !== -1) {
                finalArray[idx]["data"].push(
                    +((row[key] * 100000) / population).toFixed(1)
                );
            }
        });
    });

    return {
        title: {
            text: "Causes of Death (per 100,000)",
            textStyle: {
                color: theme === "light" ? "black" : "white",
            },
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
        animation: true,
    };
};

function USACovidDashboard(props) {
    const [selectionStates, setSelectionStates] = useState(["United States"]);
    const [showStates, setShowStates] = useState(false);
    // const [btnOutline, setBtnOutline] = useState('outline-');

    useEffect(() => {
        echarts.registerMap("USA", usa, {
            Alaska: {
                left: -131,
                top: 25,
                width: 15,
                height: 7,
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
    const btnOutline = props.theme !== "light" ? "outline-" : "";

    return (
        <>
            <Row>
                <Col>
                    <div className="">
                        <ReactEcharts
                            option={getUSAMapEchartOption(props.theme)}
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
                            marginRight: "10px",
                        }}
                        variant={btnOutline + "primary"}
                        onClick={showStatesButton}
                    >
                        {showStates ? "Hide States" : "Show States"}
                    </Button>
                    <Button
                        variant={btnOutline + "primary"}
                        onClick={clearSelectionButton}
                    >
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
                                            variant={btnOutline + "secondary"}
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
                                        variant={btnOutline + "success"}
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
                                        variant={btnOutline + "success"}
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
                    <div style={{ height: "700px", marginTop: "2vh" }}>
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
