import React from "react";
import "./About.css";

function About () {
    // magic number calculations for later
    // const angle = 6;
    // const angleRad = angle * Math.PI / 180;
    // const magicNumber = Math.abs( Math.tan(angleRad) / 2 );    
    // console.log(magicNumber);

    return (
        <>
            <div className="diagonal-box about">
                <div id="about" className="about-div container content about">
                    <h3 className="about-h">about me</h3>
                    <p className="about-para">
                        I graduated from the University of Iowa in 2007 with a B.S. in Biology. From 2008 to 20015 I worked a variety 
                        of biology-related jobs, trying to figure out what I enjoy doing. 
                        I relocated to Sweden with my wife in 2017 and decided to use the change of scenery to change fields
                        from Biology to data and programming. From
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
                            href="https://en.wikipedia.org/wiki/Mario_Kart_8"
                            title="Mario Kart 8 Deluxe, my current favorite"
                        >
                            video
                        </a>{" "}
                        games, and learn new things.
                    </p>
                    <h3 className="about-h">about this site</h3>
                    <p className="about-para">
                        This site was made using{" "}
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://reactjs.org/"
                            title="React"
                        >
                            React.js
                        </a>{" "}
                        (this is my first React project!),{" "}
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.typescriptlang.org/"
                            title="Typescript"
                        >
                            Typescript
                        </a>{" "}
                        ,{" "}
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://tailwindcss.com/"
                            title="Tailwind css"
                        >
                            Tailwindcss
                        </a>{" "}
                        (right now it's a mix of Bootstrap and Tailwind since it started with Bootstrap), and{" "}
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://echarts.apache.org/en/index.html"
                            title="Echarts"
                        >
                            Echarts
                        </a>
                        . You can find the source code{" "}
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://github.com/drzear/drz-home"
                            title="drz-home github repo"
                        >
                            here
                        </a>
                        .
                    </p>
                </div>
            </div>
        </>
    );
}
export default About;
