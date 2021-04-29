import React, { useState, useEffect } from "react";
// import ReactEcharts from "echarts-for-react";
// import echarts from "echarts";
// import "./WorldCovidDashboard.css";
// import covidData from "../owid-covid-data.json";
// import { CovidData, SelectionOptionsCovid } from "../biData";
// import world from "../../../../Images/world_echarts_big.json";

// const processTimeData = (
//     data: any,
//     selectionOne: string,
//     selectionTwo: string
// ) => {
//     let worldMapCountries: string[] = [];
//     world.features.forEach((el) => {
//         worldMapCountries.push(el.properties.name);
//     });
//     worldMapCountries.sort();
//     // worldMap.features[0].properties.name;
//     let totalDeaths = 0;
//     let dataArray: any[] = [];
//     let dataCountries: string[] = [];
//     Object.keys(data).forEach((cntry) => {
//         dataCountries.push(data[cntry]["location"]);
//         data[cntry]["data"].forEach((date: CovidData) => {
//             if (cntry !== "OWID_WRL" && date["date"] && cntry === "USA") {
//                 const dt = new Date(date["date"]);
//                 const mth = dt.getMonth() + 1;
//                 const yr = dt.getFullYear();
//                 if (
//                     dataArray.findIndex((el) => el["month"] === mth) === -1 ||
//                     dataArray.findIndex((el) => el["year"] === yr) === -1
//                 ) {
//                     dataArray.push({
//                         month: mth,
//                         year: yr,
//                     });
//                     dataArray[dataArray.length - 1][selectionOne] = date[
//                         selectionOne
//                     ]
//                         ? date[selectionOne]
//                         : 0;
//                     dataArray[dataArray.length - 1][selectionTwo] = date[
//                         selectionTwo
//                     ]
//                         ? date[selectionTwo]
//                         : 0;
//                 } else {
//                     const idx = dataArray.findIndex(
//                         (el) => el["month"] === mth && el["year"] === yr
//                     );
//                     dataArray[idx][selectionOne] += date[selectionOne]
//                         ? date[selectionOne]
//                         : 0;
//                     dataArray[idx][selectionTwo] += date[selectionTwo]
//                         ? date[selectionTwo]
//                         : 0;
//                 }
//                 // const minDt = new Date("2020-01-01");
//                 // const maxDt = new Date("2020-12-07");
//                 // if (dt <= maxDt && dt >= minDt && date.new_deaths) {
//                 //     totalDeaths += date.new_deaths;
//                 // }
//             }
//         });
//     });

//     dataCountries.sort();
//     let noMatchCountries: string[] = [];
//     dataCountries.forEach((el) => {
//         if (worldMapCountries.findIndex((wmEl) => el === wmEl) === -1) {
//             noMatchCountries.push(el);
//         }
//     });
//     // console.log(noMatchCountries);

//     dataArray.sort((a, b) => a["month"] - b["month"]);
//     dataArray.sort((a, b) => a["year"] - b["year"]);
//     return dataArray;
// };

// const processMapData = (data: any, selection: string) => {
//     let dataArray: { name: string; value: number; label: any }[] = [];

//     Object.keys(data).forEach((cntry) => {
//         if (cntry !== "OWID_WRL") {
//             const country = data[cntry]["location"];
//             // generate array of {cntry, value}
//             if (dataArray.findIndex((el) => el["name"] === country) === -1) {
//                 dataArray.push({
//                     name: data[cntry]["location"],
//                     value: 0,
//                     label: { show: false },
//                 });
//             }
//             // filtered values
//             data[cntry]["data"].forEach((date: CovidData) => {
//                 if (date["date"]) {
//                     const dt = new Date(date["date"]);
//                     const mth = dt.getMonth() + 1;
//                     const yr = dt.getFullYear();
//                     if (
//                         // date in date range TODO
//                         date[selection]
//                     ) {
//                         const idx = dataArray.findIndex(
//                             (el) => el["name"] === country
//                         );
//                         dataArray[idx]["value"] += date[selection];
//                     }
//                 }
//             });
//         }
//     });

//     // dataArray.sort((a, b) => a.value - b.value);

//     return dataArray;
// };

// const getMapEchartOption = (
//     mapData: { name: string; value: number; label: any }[]
// ) => {
//     let maxValue: number = 0;
//     mapData.forEach((el) => {
//         if (el.value > maxValue) {
//             maxValue = el.value;
//         }
//     });
//     // seperate scatter and 1 effectScatter data
//     return {
//         geo: {
//             name: "World Map",
//             type: "map",
//             map: "world",
//             roam: true,
//             // roam: false,
//             // silent: false,
//             show: true,
//             selectedMode: "single",
//             label: {
//                 emphasis: {
//                     color: "rgb(255, 255, 255)",
//                     show: false,
//                 },
//             },
//             zoom: 1,
//             center: [0, 0],
//             // zoom: selection.zoom,
//             // center: selection.center,
//         },
//         visualMap: {
//             left: "right",
//             min: 0,
//             max: maxValue,
//             // inRange: {
//             //     color: ["yellowgreen", "yellow", "gray", "red"],
//             // },
//             text: ["High", "Low"],
//             calculable: true,
//             // show: false,
//         },
//         tooltip: {
//             trigger: "item",
//             showDelay: 0,
//             transitionDuration: 0.2,
//             formatter: function (params) {
//                 return (
//                     params.name + ": " + (params.value ? params.value : "N/A")
//                 );
//             },
//         },
//         series: [
//             {
//                 name: "World Map",
//                 type: "map",
//                 geoIndex: 0,
//                 emphasis: {
//                     label: {
//                         // show: true,
//                     },
//                 },
//                 data: mapData,
//             },
//         ],
//     };
// };

// const getTimeEchartOption = (
//     data: any[],
//     selectionOne: string,
//     selectionTwo: string
// ) => {
//     // console.log(data);
//     // seperate scatter and 1 effectScatter data
//     return {
//         title: {
//             text: "Covid by Month",
//         },
//         legend: {
//             data: [selectionOne, selectionTwo],
//         },
//         toolbox: {
//             // feature: {
//             //     magicType: {
//             //         type: ["stack", "tiled"],
//             //     },
//             // },
//         },
//         tooltip: {},
//         xAxis: {
//             data: data.map(
//                 (el) => el.month.toString() + "-" + el.year.toString()
//             ),
//             splitLine: {
//                 show: false,
//             },
//         },
//         yAxis: {},
//         series: [
//             {
//                 name: selectionOne,
//                 type: "bar",
//                 data: data.map((el) => el[selectionOne]),
//                 animationDelay: function (idx) {
//                     return idx * 10;
//                 },
//             },
//             {
//                 name: selectionTwo,
//                 type: "bar",
//                 data: data.map((el) => el[selectionTwo]),
//                 animationDelay: function (idx) {
//                     return idx * 10 + 100;
//                 },
//             },
//         ],
//         animationEasing: "elasticOut",
//         animationDelayUpdate: function (idx) {
//             return idx * 5;
//         },
//     };
// };

// function WorldCovidDashboard(props) {
//     const [selectionOne, setSelectionOne] = useState("new_cases");
//     const [selectionTwo, setSelectionTwo] = useState("new_deaths");
//     const [selectionMap, setSelectionMap] = useState("new_deaths_per_million");

//     useEffect(() => {
//         echarts.registerMap("world", world, {});
//     }, []);

//     const processedTimeData = processTimeData(
//         covidData,
//         selectionOne,
//         selectionTwo
//     );
//     const processedMapData = processMapData(covidData, selectionMap);
//     const onMapClick = (event) => {
//         if (event.data && event.data.name) {
//             // ???
//             // addState(event.data.name);
//         }
//     };
//     const onMapEvents = {
//         click: onMapClick,
//         // 'dataZoom': this.onDataZoom,
//     };

//     return (
//         <>
//             <Row>
//                 <Dropdown>
//                     <Dropdown.Toggle variant="success" id="dropdown-basic">
//                         {selectionOne}
//                     </Dropdown.Toggle>

//                     <Dropdown.Menu>
//                         {SelectionOptionsCovid.map((el, i) => {
//                             return (
//                                 <Dropdown.Item
//                                     onClick={() => setSelectionOne(el.value)}
//                                     key={i}
//                                 >
//                                     {el.name}
//                                 </Dropdown.Item>
//                             );
//                         })}
//                     </Dropdown.Menu>
//                 </Dropdown>
//                 <Dropdown>
//                     <Dropdown.Toggle variant="primary" id="dropdown-basic">
//                         {selectionTwo}
//                     </Dropdown.Toggle>

//                     <Dropdown.Menu>
//                         {SelectionOptionsCovid.map((el, i) => {
//                             return (
//                                 <Dropdown.Item
//                                     onClick={() => setSelectionTwo(el.value)}
//                                     key={i}
//                                 >
//                                     {el.name}
//                                 </Dropdown.Item>
//                             );
//                         })}
//                     </Dropdown.Menu>
//                 </Dropdown>
//             </Row>
//             <Row>
//                 <Col>
//                     <div className="">
//                         <ReactEcharts
//                             option={getTimeEchartOption(
//                                 processedTimeData,
//                                 selectionOne,
//                                 selectionTwo
//                             )}
//                             lazyUpdate={true}
//                             // className="world-map"
//                         />
//                     </div>
//                 </Col>
//             </Row>
//             <Row>
//                 <Dropdown>
//                     <Dropdown.Toggle variant="success" id="dropdown-basic">
//                         {selectionMap}
//                     </Dropdown.Toggle>

//                     <Dropdown.Menu>
//                         {SelectionOptionsCovid.map((el, i) => {
//                             return (
//                                 <Dropdown.Item
//                                     onClick={() => setSelectionMap(el.value)}
//                                     key={i}
//                                 >
//                                     {el.name}
//                                 </Dropdown.Item>
//                             );
//                         })}
//                     </Dropdown.Menu>
//                 </Dropdown>
//             </Row>
//             <Row>
//                 <Col>
//                     <div className="">
//                         <ReactEcharts
//                             option={getMapEchartOption(processedMapData)}
//                             lazyUpdate={true}
//                             className="covid-world-map"
//                         />
//                     </div>
//                 </Col>
//             </Row>
//         </>
//     );
// }

// export default WorldCovidDashboard;
