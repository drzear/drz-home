import React from "react";
import "./Home.css";
import { withRouter } from "react-router-dom";
import ThemeSwitch from "../../Pieces/ThemeSwitch/ThemeSwitch";

interface HomeProps {
    history: string[];
}

interface HomeState {
    theme: string;
}

class Home extends React.Component<HomeProps, HomeState> {
    // BELOW DRZ GOOD EXAMPLE OF STATE AND PASSING THROUGH TO CHILD COMPONENTS
    // constructor(props) {
    //     super(props);
    //     this.state = { theme: "🔌" };
    // }
    // themeLight: boolean = true;
    // handleThemeClick = () => {
    //     this.themeLight = !this.themeLight;
    //     const theme = !this.themeLight ? "💡" : "🔌";
    //     this.setState({ theme: theme });
    // };
    handleOnClick = (path: string) => {
        this.props.history.push(path);
    };
    render() {
        return (
            <>
                <ThemeSwitch
                // theme={this.state.theme}
                // onClick={this.handleThemeClick}
                />
                <section className="animated-grid">
                    <div
                        className="card"
                        style={{
                            backgroundImage: `url(${require("../../../Images/hobbit.JPG")})`,
                            backgroundPosition: "center",
                        }}
                        onClick={() => this.handleOnClick("/about")}
                    >
                        <span className="cardText">About</span>
                    </div>
                    <div
                        className="card"
                        style={{
                            backgroundImage: `url(${require("../../../Images/vanHills.JPG")})`,
                            backgroundPosition: "right top",
                        }}
                        onClick={() => this.handleOnClick("/cv")}
                    >
                        <span className="cardText">Interactive CV</span>
                    </div>
                    <div
                        className="card"
                        style={{
                            backgroundImage: `url(${require("../../../Images/kaikoura.JPG")})`,
                            backgroundPosition: "center",
                        }}
                        onClick={() => this.handleOnClick("/biSamples")}
                    >
                        <span className="cardText">BI Samples</span>
                    </div>
                    <div
                        className="card"
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
