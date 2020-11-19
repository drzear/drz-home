import React from "react";
import { Container, Media, Row } from "react-bootstrap";
import "./Contact.css";
import CV from "../../../Documents/CV-DRZear.pdf";

function Contact() {
    return (
        <>
            <Container className="contact-container">
                <br />
                <Row className="justify-content-center">
                    <Media>
                        <a
                            href="https://www.linkedin.com/in/david-zear-68244910/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={require("../../../Images/Logos/linkedin.png")}
                                className="align-self-center contact-logo-linkedin"
                                alt="LinkedIn"
                                title="LinkedIn"
                            />
                        </a>
                    </Media>
                </Row>
                <br />
                <Row className="justify-content-center">
                    <Media>
                        <a
                            href="https://github.com/drzear"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={require("../../../Images/Logos/github.png")}
                                className="align-self-center contact-logo"
                                alt="Github"
                                title="Github"
                            />
                        </a>
                    </Media>
                </Row>
                <br />
                <Row className="justify-content-center">
                    <Media>
                        <a
                            href="mailto:drzear@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={require("../../../Images/Logos/gmail.png")}
                                className="align-self-center contact-logo"
                                alt="Gmail"
                                title="Gmail"
                            />
                        </a>
                    </Media>
                </Row>
                <Row className="justify-content-center">
                    <a href={CV} target="_blank" rel="noopener noreferrer">
                        <p className="cv-as-pdf">CV as PDF</p>
                    </a>
                </Row>
            </Container>
        </>
    );
}

export default Contact;
