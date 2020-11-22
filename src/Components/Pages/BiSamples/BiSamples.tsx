import React, { useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import "./BiSamples.css";
import USACovidDashboard from "./USACovidDashboard/USACovidDashboard";
import WorldCovidDashboard from "./WorldCovidDashboard/WorldCovidDashboard";

function BiSamples(props) {
    const [selectedDash, setSelectedDash] = useState("none");
    const dashboards = ["USA Covid", "World Covid"];
    return (
        <Container className="bi-container">
            <Row
                style={{
                    marginBottom: "5px",
                }}
            >
                <div className="btn dashboard-btn-label">Dashboards:</div>
                {dashboards.map((el, i) => {
                    return (
                        <Button
                            style={{
                                marginRight: "5px",
                            }}
                            key={i}
                            onClick={() => setSelectedDash(el)}
                        >
                            <i>{el}</i>
                        </Button>
                    );
                })}
            </Row>
            {selectedDash === "USA Covid" && (
                <USACovidDashboard theme={props.theme}></USACovidDashboard>
            )}
            {selectedDash === "World Covid" && (
                <WorldCovidDashboard theme={props.theme}></WorldCovidDashboard>
            )}
        </Container>
    );
}

export default BiSamples;
