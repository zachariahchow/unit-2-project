const React = require("react");

import Head from '../page-components/head-component';
import Header from '../page-components/header-component';
import Nav from '../page-components/nav-component';
import Burgermenu from '../page-components/burger-menu-component';

class SingleList extends React.Component {

    render() {

        const gearListItems = this.props.listGear
            .map(gear =>
                <div className={`single-gear__wrapper gear-wrapper-${gear['gear_id']} wrapper-primary`} data-gear-id={gear["gear_id"]}>
                    <li className="gear-list-item">
                        {gear.name}
                    </li>
                    <div className="single-gear__img-container">
                        <img src={gear["img_link"]} alt={gear.name} className="single-pedal__img"/>
                    </div>
                    <button type="button" data-list-id={gear['list_id']} data-gear-id={gear['gear_id']} className="single-gear__list-item-delete-btn btn-secondary">Delete</button>
                </div>
            )

        const pedalboardsListItems = this.props.listPedalboards
            .map(pedalboard =>
                <div className={`single-pedalboard__wrapper pedalboard-wrapper-${pedalboard.id} wrapper-primary`}>
                    <a href={`/pedalboards/${pedalboard.id}`} className="pedalboard-list-item link-secondary">
                        {pedalboard.name}
                    </a>

                    <button type="button" data-pedalboard-id={pedalboard.id} className="single-pedalboard__list-item-delete-btn btn-secondary">Delete</button>
                </div>
            )

        const gearOptions = this.props.allGear.map(gear => <option value={gear.id} data-gear-name={gear.name} className="gear-option">{gear.name}</option>)

        const pedalboardsOptions = this.props.allPedalboards.map(pedalboard => <option value={pedalboard.id} data-pedalboard-name={pedalboard.name} className="pedalboard-option">{pedalboard.name}</option>)

        return (
            <html>
                <Head />

                <body>
                    <Header hasMenu="true"/>
                    <script defer src='/js/util/send-http-request.js' />
                    <script defer src='/js/lists-single.js' />
                    <Nav link="/lists" linklabel="Back to Lists" link2="/gear" link2label="Gear" link3="/pedalboards" link3label="Pedalboards"/>
                    <Burgermenu img={this.props.currentUser['img_link']} name={this.props.currentUser.name} email={this.props.currentUser.email}/>
                    <main>
                        <div className="single-list__container single-display">
                            <p className="single-list__name page-header">{this.props.singleList.name}</p>
                            <div className="single-list__gear-list">
                                <div className="add-form">
                                    <select className="single-list__gear-list-select" data-list-id={this.props.singleList.id}>
                                        {gearOptions}
                                    </select>
                                    <button type="button" data-list-id={this.props.singleList.id} className="single-list__gear-add-btn btn-secondary">
                                    Add Gear</button>
                                    <select className="single-list__pedalboards-list-select" data-list-id={this.props.singleList.id}>
                                        {pedalboardsOptions}
                                    </select>
                                    <button type="button" data-list-id={this.props.singleList.id} className="single-list__pedalboards-add-btn btn-secondary">
                                    Add Pedalboard</button>
                                </div>
                                <div className="single-list__all-pedalboards-wrapper add-form">
                                    <h3 className="single-list__all-pedalboards-wrapper-header list-header">Pedalboard</h3>
                                    {pedalboardsListItems}
                                </div>
                                <div className="single-list__all-gear-wrapper wrapper-primary">
                                    <h3 className="single-list__all-gear-wrapper-header list-header">Gear</h3>
                                    {gearListItems}
                                </div>
                            </div>
                            <div className ="list__edit-delete-links wrapper-primary">
                                <a href="./delete" className="list__delete-link link-primary"><p>Delete List</p></a>
                            </div>
                        </div>
                    </main>
                </body>
            </html>
        );
    }
}

module.exports = SingleList;