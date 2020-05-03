const React = require("react");

import Head from '../page-components/head-component';
import Header from '../page-components/header-component';
import Nav from '../page-components/nav-component';
import Burgermenu from '../page-components/burger-menu-component';

class SinglePedalboard extends React.Component {

    render() {

        // const pedalsInfo = this.props.singlePedalboardPedals.map(pedal => {
        //     return (<div className="single-pedal__container" key={pedal.id}>
        //         <div className="single-pedal__img-container">
        //             <img src={pedal["img_link"]} alt={pedal.name} className="single-pedal__img"/>
        //         </div>
        //         <a href={`/pedals/${pedal.id}`} className="single-pedal__name">{pedal.name}</a>
        //     </div>)
        // })

        const pedalsOptions = this.props.allUnaddedPedals.map(pedal => <option value={pedal.id} data-pedal-name={pedal.name} className="pedal-option">{pedal.name}</option>)


        const pedalsListItems = this.props.singlePedalboardPedals
            .map(pedal =>
                <div className={`single-pedalboard__pedal-wrapper pedal-wrapper-${pedal['gear_id']}`} data-gear-id={pedal["gear_id"]}>
                    <li data-pedal-pedalboard-id={pedal['pedalboard_id']} className="edit-form__pedals-list-item">
                        {pedal.name}
                    </li>
                    <div className="single-pedal__img-container">
                        <img src={pedal["img_link"]} alt={pedal.name} className="single-pedal__img"/>
                    </div>
                    <button type="button" data-pedalboard-id={this.props.singlePedalboard.id} data-pedal-id={pedal.id} data-gear-id={pedal['gear_id']} className="single-pedalboard__pedals-list-item-delete-btn btn-secondary">Delete</button>
                </div>
            )

        return (
            <html>
                <Head />

                <body>
                    <Header hasMenu="true"/>
                    <script defer src='./js/util/send-http-request.js' />
                    <script defer src='./js/pedalboards-single.js' />
                    <Nav link="/pedalboards" linklabel="Back to Pedalboards" link2="/gear" link2label="Gear" link3="/lists" link3label="Lists"/>
                    <Burgermenu img={this.props.currentUser['img_link']} name={this.props.currentUser.name} email={this.props.currentUser.email} csrf={this.props['_locals'].csrfToken}/>
                    <main>
                        <div className="single-pedalboard__container single-display wrapper-primary">
                            <input className="single-pedalboard__name input-header" data-pedalboard-id={this.props.singlePedalboard.id} defaultValue={this.props.singlePedalboard.name}></input>
                            <div className="single-pedalboard__pedals-list">
                                <select className="single-pedalboard__pedals-list-select" data-pedalboard-id={this.props.singlePedalboard.id}>
                                    {pedalsOptions}
                                </select>
                                <button type="button" data-pedalboard-id={this.props.singlePedalboard.id} className="single-pedalboard__pedals-list-add-btn btn-secondary">
                                Add Pedal</button>
                                {pedalsListItems}
                            </div>
                            <div className ="pedalboard__edit-delete-links links-wrapper-primary">
                                <a href="./delete" className="pedalboard__delete-link link-primary"><p>Delete Pedalboard</p></a>
                            </div>
                        </div>
                    </main>
                </body>
            </html>
        );
    }
}

module.exports = SinglePedalboard;