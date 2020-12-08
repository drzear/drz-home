import React, { useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import "./BiSamples.css";
import USACovidDashboard from "./USACovidDashboard/USACovidDashboard";
// import WorldCovidDashboard from "./WorldCovidDashboard/WorldCovidDashboard";

function BiSamples(props) {
    const [selectedDash, setSelectedDash] = useState("USA Covid");
    const dashboards = ["Fake Business", "USA Covid"];
    return (
        <Container className="bi-container">
            <Row
                style={{
                    marginBottom: "10px",
                }}
            >
                <div className="btn dashboard-btn-label">Dashboards:</div>
                {dashboards.map((el, i) => {
                    return (
                        <Button
                            style={{
                                marginRight: "5px",
                            }}
                            variant={
                                props.theme !== "light"
                                    ? "outline-info"
                                    : "info"
                            }
                            key={i}
                            onClick={() => setSelectedDash(el)}
                        >
                            <i>{el}</i>
                        </Button>
                    );
                })}
            </Row>
            {selectedDash === "Fake Business" && <div>Under construction</div>}
            {selectedDash === "USA Covid" && (
                <USACovidDashboard theme={props.theme}></USACovidDashboard>
            )}
            {/* {selectedDash === "World Covid" && (
                <WorldCovidDashboard theme={props.theme}></WorldCovidDashboard>
            )} */}
        </Container>
    );
}

export default BiSamples;
