const React = require("react");

import Head from '../page-components/head-component';
import Header from '../page-components/header-component';
import Nav from '../page-components/nav-component';

class SingleList extends React.Component {

    render() {

        const gearListItems = this.props.listGear
            .map(gear =>
                <div className={`single-gear__wrapper gear-wrapper-${gear['gear_id']}`} data-gear-id={gear["gear_id"]}>
                    <li className="gear-list-item">
                        {gear.name}
                    </li>
                    <div className="single-gear__img-container">
                        <img src={gear["img_link"]} alt={gear.name} className="single-pedal__img"/>
                    </div>
                    <button type="button" data-list-id={gear['list_id']} data-gear-id={gear['gear_id']} className="single-gear__list-item-delete-btn">Delete</button>
                </div>
            )

        const pedalboardsListItems = this.props.listPedalboards
            .map(pedalboard =>
                <div className={`single-pedalboard__wrapper pedalboard-wrapper-${pedalboard.id}`}>
                    <li className="pedalboard-list-item">
                        {pedalboard.name}
                    </li>
                    <button type="button" data-pedalboard-id={pedalboard.id} className="single-pedalboard__list-item-delete-btn">Delete</button>
                </div>
            )

        const gearOptions = this.props.allGear.map(gear => <option value={gear.id} data-gear-name={gear.name} className="gear-option">{gear.name}</option>)

        const pedalboardsOptions = this.props.allPedalboards.map(pedalboard => <option value={pedalboard.id} data-pedalboard-name={pedalboard.name} className="pedalboard-option">{pedalboard.name}</option>)

        return (
            <html>
                <Head />

                <body>
                    <Header />
                    <script defer src='/js/util/send-http-request.js' />
                    <script defer src='/js/lists-single.js' />
                    <main>
                        <div className="single-list__container single-display">
                            <p className="single-list__name">{this.props.singleList.name}</p>
                            <div className="single-list__gear-list">
                                <select className="single-list__gear-list-select" data-list-id={this.props.singleList.id}>
                                    {gearOptions}
                                </select>
                                <button type="button" data-list-id={this.props.singleList.id} className="single-list__gear-add-btn">
                                Add Gear</button>
                                <select className="single-list__pedalboards-list-select" data-list-id={this.props.singleList.id}>
                                    {pedalboardsOptions}
                                </select>
                                <button type="button" data-list-id={this.props.singleList.id} className="single-list__pedalboards-add-btn">
                                Add Pedalboard</button>
                                <div className="single-list__all-pedalboards-wrapper">
                                    <h3 className="single-list__all-pedalboards-wrapper-header">Pedalboards</h3>
                                    {pedalboardsListItems}
                                </div>
                                <div className="single-list__all-gear-wrapper">
                                    <h3 className="single-list__all-gear-wrapper-header">Gear</h3>
                                    {gearListItems}
                                </div>
                            </div>
                            <div className ="list__edit-delete-links">
                                <a href="./edit" className="list__edit-link"><p>Edit</p></a>
                                <a href="./delete" className="list__delete-link"><p>Delete List</p></a>
                            </div>
                        </div>
                        <Nav link="/lists" linklabel="Back" link2="/gear" link2label="Gear" link3="/" link3label="Home"/>
                    </main>
                </body>
            </html>
        );
    }
}

module.exports = SingleList;