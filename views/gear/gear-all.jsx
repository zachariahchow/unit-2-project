const React = require("react");

import Head from '../page-components/head-component';
import Header from '../page-components/header-component';
import Nav from '../page-components/nav-component';

class AllGear extends React.Component {

    render() {

        const gearInfo = this.props.allGear.map(gear =>

            <div className="single-gear__container" key={gear.id}>
                <div className="single-gear__img-container">
                    <img src={gear["img_link"]} alt={gear.name} className="single-gear__img"/>
                </div>
                <a href={`./gear/${gear.id}`} className="single-gear__name">{gear.name}</a>
            </div>
        )

        return (
            <html>
                <Head />
                <script defer src='./js/util/send-http-request.js' />
                <script defer src='./js/gear-all.js' />
                <body>
                    <Header />
                    <main>
                        <form method="POST" action={`/gear`} className="add-form">
                            <h2 className="add-form__header">Add Item</h2>
                            <input className="add-form__name-input" type="text" name="name" placeholder="Name" maxlength="100"/>
                            <input className="add-form__img-input" type="text" name="img" placeholder="Image Link" maxlength="300"/>
                            <select className="add-form__select" name="type">
                                <option value="guitar" className="add-form__option">Guitar/Bass</option>
                                <option value="pedal" className="add-form__option">Guitar/Bass Pedals</option>
                                <option value="amp" className="add-form__option">Amplifiers & Monitors</option>
                                <option value="drums" className="add-form__option">Drums & Percussion</option>
                                <option value="keyboard" className="add-form__option">Keyboards/Synths</option>
                                <option value="accessory" className="add-form__option">Accessories</option>
                            </select>
                            <button className="add-form__submit-btn" type="button">Add</button>
                        </form>
                            <div className="filter__wrapper">
                                <h2 className="filter__header">Filter By Type:</h2>
                                <select className="filter__select" name="type">
                                    <option value="guitar" className="filter__option guitar-option">Guitar/Bass</option>
                                    <option value="pedal" className="filter__option pedal-option">Guitar/Bass Pedals</option>
                                    <option value="amp" className="filter__option amp-option">Amplifiers & Monitors</option>
                                    <option value="drums" className="filter__option drums-option">Drums & Percussion</option>
                                    <option value="keyboard" className="filter__option keyboard-option">Keyboards/Synths</option>
                                    <option value="accessory" className="filter__option accessory-option">Accessories</option>
                                </select>
                            </div>
                        <div className="all-single-gear__wrapper">
                            {gearInfo}
                        </div>
                    </main>
                    <Nav link="/pedalboards" linklabel="Pedalboards" link2="/lists" link2label="Lists" link3="/" link3label="Home"/>
                </body>
            </html>
        );
    }
}

module.exports = AllGear;