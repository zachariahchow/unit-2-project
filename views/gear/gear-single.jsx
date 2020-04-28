const React = require("react");

import Head from '../page-components/head-component';
import Header from '../page-components/header-component';
import Nav from '../page-components/nav-component';

class SingleGear extends React.Component {

    render() {

        return (
            <html>
                <Head />

                <body>
                    <Header />
                    <main>
                        <div className="single-gear__container single-display">
                            <div className="single-gear__img-container single-display">
                                <img src={this.props.singleGear["img_link"]} alt={this.props.singleGear.name} className="single-gear__img single-display"/>
                            </div>
                            <p className="single-gear__name">{this.props.singleGear.name}</p>
                            <div className ="gear__edit-delete-links">
                                <a href="./edit" className="gear__edit-link"><p>Edit</p></a>
                                <a href="./delete" className="gear__delete-link"><p>Delete Gear</p></a>
                            </div>
                        </div>
                        <Nav link="/gear" linklabel="Back" link2="/pedalboards" link2label="pedalboards" link3="/" link3label="Home"/>
                    </main>
                </body>
            </html>
        );
    }
}

module.exports = SingleGear;