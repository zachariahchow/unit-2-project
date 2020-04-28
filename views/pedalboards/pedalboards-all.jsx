const React = require("react");

import Head from '../page-components/head-component';
import Header from '../page-components/header-component';
import Nav from '../page-components/nav-component';

class AllPedalboards extends React.Component {

    render() {

        const pedalboardInfo = this.props.allPedalboards.map(pedalboard =>

            <div className="single-pedalboard__container" key={pedalboard.id}>
                <a href={`./pedalboards/${pedalboard.id}`} className="single-pedalboard__name">{pedalboard.name}</a>
            </div>
        )



        return (
            <html>
                <Head />
                <body>
                    <Header />
                    <main>
                        <div className="form__wrapper">
                            <h2 className="pedalboards-all__header">Pedalboards</h2>
                            { pedalboardInfo }
                        </div>
                    </main>
                </body>
                <Nav />
            </html>
        );
    }
}

module.exports = AllPedalboards;