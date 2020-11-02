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
                        . I also go by{" "}
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://en.wikipedia.org/wiki/Ryne_Sandberg"
                            title="Ryne Sandberg, Cubs baseball great"
                        >
                            Ryne
                        </a>{" "}
                        . I'm a full-stack BI developer who was born and raised
                        in{" "}
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.google.com/maps/place/Iowa+City,+IA,+USA/@41.64716,-91.6094031,12z/data=!3m1!4b1!4m5!3m4!1s0x87e441c16a208817:0x6d711867870582b0!8m2!3d41.6611277!4d-91.5301683"
                            title="Iowa City on Google Maps"
                        >
                            Iowa City, Iowa, USA
                        </a>{" "}
                        and moved to{" "}
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.google.com/maps/place/Stockholm/@59.3261917,17.7018811,10z/data=!3m1!4b1!4m5!3m4!1s0x465f763119640bcb:0xa80d27d3679d7766!8m2!3d59.3293235!4d18.0685808"
                            title="Stockholm on Google Maps"
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
                        in Sweden). I love learning new technologies and working
                        with data.
                        <br />
                        <br />
                        We have a 1-year-old son and are currently living in
                        Solna. In my spare time I like to hike, play{" "}
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://boardgamegeek.com/boardgame/201808/clank-deck-building-adventure"
                            title="Clank, my current favorite"
                        >
                            board
                        </a>{" "}
                        +{" "}
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.worldofwarcraft.com"
                            title="WoW, my all-time favorite"
                        >
                            video
                        </a>{" "}
                        games, and learn new things (right now I'm learning
                        react.js).
                    </p>
                </div>
            </>
        );
    }
}
export default About;
