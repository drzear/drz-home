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
    async setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve);
        });
    }
    componentDidMount() {
        setTimeout(() => {
            (async () => {
                try {
                    const currentClass = document.body.className;
                    document.body.className = currentClass + " no-duration";
                    await this.setStateAsync({ loaded: true });
                    setTimeout(() => {
                        document.body.className = currentClass;
                    }, 300);
                } catch (e) {
                    this.setState({ loaded: true });
                }
            })();

            // const currentClass = document.body.className;
            // document.body.className = currentClass + " no-duration";
            // // await this.setStateAsync({loaded:true})
            // this.setState({ loaded: true }, () => {
            //     // document.body.className = currentClass;
            // });
        }, 1800);
    }
    handleOnClick = (path: string) => {
        this.props.history.push(path);
    };
    render() {
        return (
            <>
                <ThemeSwitch />
                <section className="animated-grid">
                    <div
                        className={
                            "card" +
                            (this.state.loaded
                                ? " animate-after-load"
                                : " animate-on-load")
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
                            (this.state.loaded
                                ? " animate-after-load"
                                : " animate-on-load")
                        }
                        style={{
                            backgroundImage: `url(${require("../../../Images/vanHills.JPG")})`,
                            backgroundPosition: "right top",
                        }}
                        onClick={() => this.handleOnClick("/cv")}
                    >
                        <span className="cardText">Interactive CV</span>
                    </div>
                    <div
                        className={
                            "card" +
                            (this.state.loaded
                                ? " animate-after-load"
                                : " animate-on-load")
                        }
                        style={{
                            backgroundImage: `url(${require("../../../Images/kaikoura.JPG")})`,
                            backgroundPosition: "center",
                        }}
                        onClick={() => this.handleOnClick("/biSamples")}
                    >
                        <span className="cardText">BI Samples</span>
                    </div>
                    <div
                        className={
                            "card" +
                            (this.state.loaded
                                ? " animate-after-load"
                                : " animate-on-load")
                        }
                        style={{
                            backgroundImage: `url(${require("../../../Images/bineBondi.JPG")})`,
                            backgroundPosition: "center top",
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
