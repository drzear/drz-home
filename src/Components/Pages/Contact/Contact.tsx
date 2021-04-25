import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Contact.css";

function Contact() {
    return (
        <>
            <div className="diagonal-box contact">
                <Container id="contact" className="contact-container content contact">
                    <Row className="justify-content: center">
                        <Col>
                            <h2 className="text-center mb-3">contact</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="justify-content-center">
                            <div className="flex justify-content-center">
                                <a
                                    href="https://www.linkedin.com/in/david-zear-68244910/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src={require("../../../Images/Logos/linkedin.png").default}
                                        className="align-self-center contact-logo-linkedin"
                                        alt="LinkedIn"
                                        title="LinkedIn"
                                    />
                                </a>
                            </div>
                        </Col>
                        <br />
                        <Col className="justify-content-center">
                            <div className="flex justify-content-center">
                                <a
                                    href="https://github.com/drzear"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src={require("../../../Images/Logos/github.png").default}
                                        className="align-self-center contact-logo"
                                        alt="Github"
                                        title="Github"
                                    />
                                </a>
                            </div>
                        </Col>
                        <br />
                        <Col className="justify-content-center">
                            <div className="flex justify-content-center">
                                <a
                                    href="mailto:drzear@gmail.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src={require("../../../Images/Logos/gmail.png").default}
                                        className="align-self-center contact-logo"
                                        alt="Gmail"
                                        title="Gmail"
                                    />
                                </a>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default Contact;
