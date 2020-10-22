import React from "react";
import "./CV.css";
import * as d3 from "d3";
import { useSpring, animated } from "react-spring";

const Line = (props) => {
    const spring = useSpring({ scale: 1.2, from: { scale: 1 } });

    return (
        <animated.line
            style={spring}
            x1={props.x1}
            x2={props.x2}
            y1={props.y1}
            y2={props.y2}
            stroke={props.stroke}
            strokeWidth={props.width}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
        />
    );
};

function AnimatedLineFn(props) {
    const spring = useSpring({ x: 0, from: { x: 100 } });
    const AnimatedLine = animated(Line);
    return (
        <AnimatedLine
            // style={spring}
            strokeDashoffset={spring.x}
            x1={props.x1}
            x2={props.x2}
            y1={props.y1}
            y2={props.y2}
            stroke={props.stroke}
            width={props.width}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
        />
    );
}

interface CVProps {}

interface CVState {
    height: number;
    width: number;
    currentlyHovered: number;
}

class CV extends React.Component<CVProps, CVState> {
    constructor(props) {
        super(props);
        this.state = {
            height: window.innerHeight,
            width: window.innerWidth,
            currentlyHovered: -1,
        };
    }

    resize = () => {
        this.setState({
            height: window.innerHeight,
            width: window.innerWidth,
            currentlyHovered: this.state.currentlyHovered,
        });
    };

    componentDidMount() {
        window.addEventListener("resize", this.resize);
    }

    componentWillUnmount() {
        window.addEventListener("resize", this.resize);
    }

    handleLineMouseEnter = (line: number) => {
        this.setState({
            height: window.innerHeight,
            width: window.innerWidth,
            currentlyHovered: line,
        });
    };

    handleLineMouseLeave = () => {
        this.setState({
            height: window.innerHeight,
            width: window.innerWidth,
            currentlyHovered: -1,
        });
    };

    render() {
        const svgHeight = 0.85 * this.state.height;
        const svgWidth = 0.25 * this.state.width;
        return (
            <>
                <div className="cv-div">
                    <p className="cv-para">Interactive CV</p>
                    <span>
                        <span className="icon">
                            <svg
                                height={svgHeight}
                                width={svgWidth}
                                // width="10%"
                                // height="100%"
                                // viewBox="0 0 100 75"
                            >
                                <Line
                                    // style={spring}
                                    onMouseEnter={() =>
                                        this.handleLineMouseEnter(0)
                                    }
                                    onMouseLeave={() =>
                                        this.handleLineMouseLeave()
                                    }
                                    x1={0.5 * svgWidth}
                                    x2={0.5 * svgWidth}
                                    y1={
                                        0.05 * svgHeight -
                                        svgHeight *
                                            (this.state.currentlyHovered === 0
                                                ? 0.01
                                                : 0)
                                    }
                                    y2={
                                        0.3 * svgHeight +
                                        svgHeight *
                                            (this.state.currentlyHovered === 0
                                                ? 0.01
                                                : 0)
                                    }
                                    stroke="orange"
                                    width={
                                        0.3 *
                                        svgWidth *
                                        (this.state.currentlyHovered === 0
                                            ? 1.2
                                            : 1)
                                    }
                                />
                                <Line
                                    onMouseEnter={() =>
                                        this.handleLineMouseEnter(1)
                                    }
                                    onMouseLeave={() =>
                                        this.handleLineMouseLeave()
                                    }
                                    x1={0.5 * svgWidth}
                                    x2={0.5 * svgWidth}
                                    y1={
                                        0.35 * svgHeight -
                                        svgHeight *
                                            (this.state.currentlyHovered === 1
                                                ? 0.01
                                                : 0)
                                    }
                                    y2={
                                        0.6 * svgHeight +
                                        svgHeight *
                                            (this.state.currentlyHovered === 1
                                                ? 0.01
                                                : 0)
                                    }
                                    stroke="red"
                                    width={
                                        0.3 *
                                        svgWidth *
                                        (this.state.currentlyHovered === 1
                                            ? 1.2
                                            : 1)
                                    }
                                />
                                <Line
                                    onMouseEnter={() =>
                                        this.handleLineMouseEnter(2)
                                    }
                                    onMouseLeave={() =>
                                        this.handleLineMouseLeave()
                                    }
                                    x1={0.5 * svgWidth}
                                    x2={0.5 * svgWidth}
                                    y1={
                                        0.65 * svgHeight -
                                        svgHeight *
                                            (this.state.currentlyHovered === 2
                                                ? 0.01
                                                : 0)
                                    }
                                    y2={
                                        0.9 * svgHeight +
                                        svgHeight *
                                            (this.state.currentlyHovered === 2
                                                ? 0.01
                                                : 0)
                                    }
                                    stroke="green"
                                    width={
                                        0.3 *
                                        svgWidth *
                                        (this.state.currentlyHovered === 2
                                            ? 1.2
                                            : 1)
                                    }
                                />
                            </svg>
                        </span>

                        {this.state.currentlyHovered !== -1 && (
                            <span className="text cv-para">
                                {this.state.currentlyHovered}
                            </span>
                        )}
                    </span>
                </div>
            </>
        );
    }
}
export default CV;
