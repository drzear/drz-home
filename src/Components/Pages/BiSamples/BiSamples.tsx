import React, { useState } from "react";
import "./BiSamples.css";
import USACovidDashboard from "./USACovidDashboard/USACovidDashboard";
// import WorldCovidDashboard from "./WorldCovidDashboard/WorldCovidDashboard";

function BiSamples(props) {
    const [selectedDash, setSelectedDash] = useState("USA Covid");
    const dashboards = ["USA Covid", "Business"];
    return (
        <div className="bi-container container">
            <div 
                className="row-span-full"
                style={{
                    marginBottom: "10px",
                }}
            >
                <div className="btn dashboard-btn-label">Dashboards:</div>
                {dashboards.map((el, i) => {
                    return (
                        <button
                            style={{
                                marginRight: "5px",
                            }}
                            className=""
                            key={i}
                            onClick={() => setSelectedDash(el)}
                        >
                            <i>{el}</i>
                        </button>
                    );
                })}
            </div>
            {selectedDash === "Business" && <div>Under construction</div>}
            {selectedDash === "USA Covid" && (
                <USACovidDashboard theme={props.theme}></USACovidDashboard>
            )}
            {/* {selectedDash === "World Covid" && (
                <WorldCovidDashboard theme={props.theme}></WorldCovidDashboard>
            )} */}
        </div>
    );
}

export default BiSamples;
