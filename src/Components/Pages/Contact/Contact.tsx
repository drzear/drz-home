import React from "react";
import "./Contact.css";

function Contact() {
    return (
        <>
            <div className="diagonal-box contact">
                <div id="contact" className="contact-container content contact container">
                    <div className="justify-center row-span-full">
                        <div>
                            <h2 className="text-center text-3xl font-bold mb-3">contact</h2>
                        </div>
                    </div>
                    <div className="row-span-full grid grid-cols-3">
                            <div className="flex justify-center">
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
                            <div className="flex justify-center">
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
                            <div className="flex justify-center">
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
                    </div>
                </div>
            </div>
        </>
    );
}

export default Contact;
