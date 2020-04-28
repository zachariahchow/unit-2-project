const React = require("react");

import Head from '../page-components/head-component';
import Header from '../page-components/header-component';
import Nav from '../page-components/nav-component';

class AllGear extends React.Component {

    render() {

        const gearInfo = this.props.allGear.map(gear =>

            <div className="single-artist__container" key={gear.id}>
                <div className="single-artist__img-container">
                    <img src={gear["img_link"]} alt={gear.name} className="single-gear__img"/>
                </div>
                <a href={`./gear/${gear.id}`} className="single-gear__name">{gear.name}</a>
            </div>
        )

        return (
            <html>
                <Head />
                <body>
                    <Header />
                    <main>
                        {gearInfo}
                    </main>
                    <Nav link="/pedalboards" linklabel="Pedalboards" link2="/lists" link2label="Lists" link3="/" link3label="Home"/>
                </body>
            </html>
        );
    }
}

module.exports = AllGear;