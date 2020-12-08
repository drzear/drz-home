import React from "react";
import "./Home.css";
import { withRouter } from "react-router-dom";
import ThemeSwitch from "../../Pieces/ThemeSwitch/ThemeSwitch";

interface HomeProps {
    history: string[];
}

interface HomeState {
    loaded: boolean;
}

class Home extends React.Component<HomeProps, HomeState> {
    // remove animation from card after page has loaded
    constructor(props) {
        super(props);
        this.state = { loaded: false };
    }
    // after 1800ms add animate-after-load class to cards so that they do not delay on hover
    timer: any;
    componentDidMount() {
        this.timer = setTimeout(() => this.setState({ loaded: true }), 1800);
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    handleOnClick = (path: string) => {
        this.props.history.push(path);
    };
    render() {
        return (
            <>
                <ThemeSwitch onClick={() => {}} />
                <section className="animated-grid">
                    <div
                        className={
                            "card" +
                            (this.state.loaded ? " animate-after-load" : "")
                        }
                        style={{
                            backgroundImage: `url(${require("../../../Images/hobbit.JPG")})`,
                            backgroundPosition: "center",
                        }}
                        onClick={() => this.handleOnClick("/about")}
                    >
                        <span className="cardText">About</span>
                    </div>
                    <div
                        className={
                            "card" +
                            (this.state.loaded ? " animate-after-load" : "")
                        }
                        style={{
                            backgroundImage: `url(${require("../../../Images/hills.JPG")})`,
                            backgroundPosition: "center top",
                        }}
                        onClick={() => this.handleOnClick("/cv")}
                    >
                        <span className="cardText">Interactive CV</span>
                        <span className="cardText">+ Timeline</span>
                    </div>
                    <div
                        className={
                            "card" +
                            (this.state.loaded ? " animate-after-load" : "")
                        }
                        style={{
                            backgroundImage: `url(${require("../../../Images/kaikoura.JPG")})`,
                            backgroundPosition: "center",
                        }}
                        onClick={() => this.handleOnClick("/dashboards")}
                    >
                        <span className="cardText">Dashboards</span>
                    </div>
                    <div
                        className={
                            "card" +
                            (this.state.loaded ? " animate-after-load" : "")
                        }
                        style={{
                            backgroundImage: `url(${require("../../../Images/cloudSmile.JPG")})`,
                            backgroundPosition: "center",
                        }}
                        onClick={() => this.handleOnClick("/contact")}
                    >
                        <span className="cardText">Contact</span>
                    </div>
                </section>
            </>
        );
    }
}
export default withRouter(Home);
