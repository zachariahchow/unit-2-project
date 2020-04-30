const React = require("react");

import Head from '../page-components/head-component';
import Header from '../page-components/header-component';
import Nav from '../page-components/nav-component';

class AllPedalboards extends React.Component {

    render() {

        const pedalboardInfo = this.props.allPedalboards.map(pedalboard =>

            <div className="single-pedalboard__container wrapper-primary" key={pedalboard.id}>
                <a href={`./pedalboards/${pedalboard.id}`} className="single-pedalboard__name link-secondary">{pedalboard.name}</a>
            </div>
        )



        return (
            <html>
                <Head />
                <body>
                    <Header />
                    <Nav link="/gear" linklabel="Gear" link2="/lists" link2label="Lists" link3="/" link3label="Home"/>
                    <main>
                        <div className="form__wrapper">
                            <h2 className="page-header">PEDALBOARDS</h2>
                            <form method="POST" action={`/pedalboards`} className="add-form">
                                <h2 className="add-form__header">Add Pedalboard</h2>
                                <input className="add-form__name-input input-primary" type="text" name="name" placeholder="Name" maxlength="100"/>
                                <button className="add-form__submit-btn btn-secondary" type="submit">Add</button>
                            </form>
                        </div>
                        <div className="form__wrapper">
                            <h2 className="pedalboards-all__header list-header">Pedalboards</h2>
                            { pedalboardInfo }
                        </div>
                    </main>
                </body>

            </html>
        );
    }
}

module.exports = AllPedalboards;