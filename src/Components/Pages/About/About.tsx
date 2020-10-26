import React from "react";
import "./About.css";

class About extends React.Component {
    render() {
        return (
            <>
                <div className="about-div">
                    {/* <h1>About</h1> */}
                    <p className="about-para">
                        <br />
                        Hi, my name is David{" "}
                        <span role="img" aria-label="wave">
                            👋
                        </span>
                        . Some people call me Ryne. I was born and raised in{" "}
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.google.com/maps/place/Iowa+City,+IA,+USA/@41.64716,-91.6094031,12z/data=!3m1!4b1!4m5!3m4!1s0x87e441c16a208817:0x6d711867870582b0!8m2!3d41.6611277!4d-91.5301683"
                        >
                            Iowa City, Iowa, USA
                        </a>{" "}
                        and moved to{" "}
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.google.com/maps/place/Stockholm/@59.3261917,17.7018811,10z/data=!3m1!4b1!4m5!3m4!1s0x465f763119640bcb:0xa80d27d3679d7766!8m2!3d59.3293235!4d18.0685808"
                        >
                            Stockholm, SE
                        </a>{" "}
                        in 2017.
                        <br />
                        <br />
                        After relocating to Sweden with my wife, I changed
                        fields from Biology to data and programming. From
                        2018-2019 I worked as a Data Analyst for Radisson Hotel
                        Group in Sweden and currently work as a BI developer for
                        Radisson Hotel Group in Belgium (while still being based
                        in Sweden).
                        <br />
                        <br />
                        We have a 1-year-old son (Jack) and are currently living
                        in Solna. In my spare time I like to play tennis and
                        learn new things (usually related to programming).
                    </p>
                </div>
            </>
        );
    }
}
export default About;
