const React = require("react");

import Head from '../page-components/head-component';
import Header from '../page-components/header-component';
import Nav from '../page-components/nav-component';

class AllGear extends React.Component {

    render() {

        const gearInfo = this.props.allGear.map(gear =>

            <div className="single-gear__container" key={gear.id} data-gear-id={gear.id}>
                <div className="single-gear__img-container">
                    <img src={gear["img_link"]} alt={gear.name} className="single-gear__img"/>
                </div>
                <a href={`./gear/${gear.id}`} className="single-gear__name">{gear.name}</a>
                <button className="single-gear__delete-btn btn-secondary" data-gear-id={gear.id}>DELETE</button>
                <div className={`single-gear__more more-${gear.id} display-none`}>
                    <h4 className="single-gear__select-label">Type:</h4>
                    <select data-gear-id={gear.id} className={`single-gear__select select-${gear.id}`} name="type">
                        <option value="guitar" className="single-gear__option">Guitar/Bass</option>
                        <option value="pedal" className="single-gear__option">Guitar/Bass Pedals</option>
                        <option value="amp" className="single-gear__option">Amplifiers & Monitors</option>
                        <option value="drums" className="single-gear__option">Drums & Percussion</option>
                        <option value="keyboard" className="single-gear__option">Keyboards/Synths</option>
                        <option value="accessory" className="single-gear__option">Accessories</option>
                        <input type="text" className={`single-gear__img-input img-input-${gear.id} input-primary`} defaultValue={`${gear["img_link"]}`} />
                    </select>

                </div>

                <button data-gear-id={gear.id} data-gear-type={gear.type} className={`single-gear__more-btn more-btn-${gear.id} btn-small`}>MORE</button>
            </div>
        )

        return (
            <html>
                <Head />
                <script defer src='./js/util/send-http-request.js' />
                <script defer src='./js/gear-all.js' />
                <body>
                    <Header />
                    <Nav link="/pedalboards" linklabel="Pedalboards" link2="/lists" link2label="Lists" link3="/" link3label="Home"/>
                    <main>
                        <form method="POST" action={`/gear`} className="add-form">
                            <h2 className="add-form__header">Add Item</h2>
                            <input className="add-form__name-input input-primary" type="text" name="name" placeholder="Name" maxlength="100"/>
                            <input className="add-form__img-input input-primary" type="text" name="img" placeholder="Image Link" maxlength="300"/>
                            <select className="add-form__select" name="type">
                                <option value="guitar" className="add-form__option">Guitar/Bass</option>
                                <option value="pedal" className="add-form__option">Guitar/Bass Pedals</option>
                                <option value="amp" className="add-form__option">Amplifiers & Monitors</option>
                                <option value="drums" className="add-form__option">Drums & Percussion</option>
                                <option value="keyboard" className="add-form__option">Keyboards/Synths</option>
                                <option value="accessory" className="add-form__option">Accessories</option>
                            </select>
                            <button className="add-form__submit-btn btn-secondary" type="button">Add</button>
                        </form>
                            <div className="filter__wrapper">
                                <h2 className="filter__header">Filter By Type:</h2>
                                <select className="filter__select" name="type">
                                    <option value="all" className="filter__option all-option">All</option>
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

                </body>
            </html>
        );
    }
}

module.exports = AllGear;