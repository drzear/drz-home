import React, { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import echarts from "echarts";
import "./USACovidDashboard.css";
import usaCovidData from "../weekly-usa-covid.json";
import { usaDiseases } from "../biData";
import usa from "../../../../Images/USA.json";
import usaStates from "../us_state_pops_2019.json";

const getUSAMapEchartOption = (theme: string) => {
    // calculate deaths per 100,000 per state
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

const clearEchartOption = () => {
    return {};
};

const getUSALineEchartOption = (
    selectedStates: string[],
    theme: string,
    combined: boolean
) => {
    let dataArray: any[] = [];
    let finalArray: {
        name: string;
        type: string;
        data: number[];
        animationEasing: string;
        animationDuration: number;
    }[] = [];
    if (combined) {
        // get array of {week, cause1, cause2, ...}
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
                        const prettyName = usaDiseases[key];
                        const idx = dataArray.findIndex(
                            (el) => el["week"] === week
                        );
                        let val = 0;
                        if (row[key] && typeof row[key] === "string") {
                            val = parseFloat(row[key].replace(/,/g, ""));
                        } else if (row[key] && typeof row[key] === "number") {
                            val = row[key];
                        }
                        if (dataArray[idx][prettyName]) {
                            dataArray[idx][prettyName] += val;
                        } else {
                            dataArray[idx][prettyName] = val;
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
    } else {
        // get array of {week, state1-cause1, state1-cause2, state2-cause1,...}
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
                        const prettyName = state + ": " + usaDiseases[key];
                        const idx = dataArray.findIndex(
                            (el) => el["week"] === week
                        );
                        let val = 0;
                        if (row[key] && typeof row[key] === "string") {
                            val = parseFloat(row[key].replace(/,/g, ""));
                        } else if (row[key] && typeof row[key] === "number") {
                            val = row[key];
                        }
                        if (dataArray[idx][prettyName]) {
                            dataArray[idx][prettyName] += val;
                        } else {
                            dataArray[idx][prettyName] = val;
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
    }

    const textColor = theme === "light" ? "black" : "white";

    let options = {
        tooltip: {
            trigger: "axis",
        },
        legend: {
            data: finalArray.map((el) => el.name),
            textStyle: {
                color: textColor,
            },
        },
        grid: {
            left: "3%",
            right: "4%",
            bottom: "11%",
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
                    color: textColor,
                },
            },
        },
        yAxis: {
            type: "value",
            axisLine: {
                lineStyle: {
                    color: textColor,
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
    if (combined) {
        options["color"] =
            theme === "light" ? ["black", "blue"] : ["white", "aqua"];
    }
    return options;
};

const renderTooltip = (props) => (
    <div id="button-tooltip" {...props}>
        Click a state in the map to add to line chart below.
    </div>
);

const renderTooltipLineToggle = (props) => (
    <div id="button-tooltip" {...props}>
        Toggle between comparing states or adding them together.
    </div>
);

function USACovidDashboard(props) {
    const [selectionStates, setSelectionStates] = useState(["United States"]);
    const [showStates, setShowStates] = useState(false);
    const [lineStatesCombined, setLineStatesCombined] = useState(true);

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

    const combineStatesButton = () => {
        setLineStatesCombined(!lineStatesCombined);
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

    // setUSALineEchartOption(
    //     getUSALineEchartOption(selectionStates, props.theme, lineStatesCombined)
    // );
    return (
        <>
            <div className="echart-title">
                <div>USA Covid-Related Deaths per 100,000</div>
            </div>
            <div className="echart-subtitle">
                <div>
                    <a href="https://data.cdc.gov/NCHS/Weekly-Counts-of-Deaths-by-State-and-Select-Causes/muzy-jte6">
                        Data from the US CDC as of 2020-11-08
                    </a>
                </div>
            </div>
            <div>
                <div>
                    <div className="" style={{ height: "25vh" }}>
                        <ReactEcharts
                            option={getUSAMapEchartOption(props.theme)}
                            lazyUpdate={true}
                            className="covid-usa-map"
                            onEvents={onMapEvents}
                        />
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <button
                        className={btnOutline + "info"}
                        style={{
                            marginRight: "10px",
                            marginBottom: "10px",
                        }}
                    >
                        <i>i</i>
                    </button>
                    <button
                        className={btnOutline + "warning"}
                        style={{
                            marginRight: "10px",
                            marginBottom: "10px",
                        }}
                        onClick={combineStatesButton}
                    >
                        {lineStatesCombined
                            ? "Compare States"
                            : "Combine States"}
                    </button>
                    <button
                        style={{
                            marginRight: "10px",
                            marginBottom: "10px",
                        }}
                        className={btnOutline + "primary"}
                        onClick={showStatesButton}
                    >
                        {showStates ? "Hide States" : "Show States"}
                    </button>
                    <button
                        style={{
                            marginRight: "10px",
                            marginBottom: "10px",
                        }}
                        className={btnOutline + "primary"}
                        onClick={clearSelectionButton}
                    >
                        Clear Selection
                    </button>
                </div>
            </div>
            {showStates && (
                <>
                    <div>
                        <div>
                            {usaStates
                                .filter(
                                    (element) =>
                                        !selectionStates.find(
                                            (slxnel) => slxnel === element.State
                                        )
                                )
                                .map((el, i) => {
                                    return (
                                        <button
                                            style={{
                                                marginRight: "1px",
                                                marginBottom: "1px",
                                            }}
                                            className={btnOutline + "secondary"}
                                            onClick={() => addState(el.State)}
                                            key={i}
                                        >
                                            {el.State}
                                        </button>
                                    );
                                })}
                        </div>
                        <div>
                            {selectionStates.map((el, i) => {
                                return (
                                    <button
                                        style={{
                                            marginRight: "1px",
                                            marginBottom: "1px",
                                        }}
                                        className={btnOutline + "success"}
                                        onClick={() => removeState(el)}
                                        key={i}
                                    >
                                        {el}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
            {!showStates && (
                <>
                    <div>
                        <div>
                            {selectionStates.map((el, i) => {
                                return (
                                    <button
                                        style={{
                                            marginRight: "1px",
                                            marginBottom: "1px",
                                        }}
                                        className={btnOutline + "success"}
                                        onClick={() => removeState(el)}
                                        key={i}
                                    >
                                        {el}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
            <div className="echart-title">
                <div>Causes of Death (per 100,000)</div>
            </div>
            <div>
                <div>
                    <div style={{ height: "50vh" }}>
                        <ReactEcharts
                            // option={USALineEchartOption}
                            option={getUSALineEchartOption(
                                selectionStates,
                                props.theme,
                                lineStatesCombined
                            )}
                            notMerge={true}
                            // ref="echartsInstance"
                            lazyUpdate={true}
                            className="covid-usa-timeline"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default USACovidDashboard;
