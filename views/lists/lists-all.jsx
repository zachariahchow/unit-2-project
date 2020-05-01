const React = require("react");

import Head from '../page-components/head-component';
import Header from '../page-components/header-component';
import Nav from '../page-components/nav-component';
import Burgermenu from '../page-components/burger-menu-component';

class AllLists extends React.Component {

    render() {

        const listInfo = this.props.allLists.map(list =>

            <div className="single-list__container wrapper-primary" key={list.id}>
                <a href={`./lists/${list.id}`} className="single-list__name link-secondary">{list.name}</a>
            </div>
        )



        return (
            <html>
                <Head />
                <script defer src="./js/util/send-http-request.js"></script>
                <body>
                    <Header hasMenu="true"/>
                    <Nav link="/pedalboards" linklabel="Pedalboards" link2="/gear" link2label="Gear" link3="/" link3label="Home"/>
                    <Burgermenu img={this.props.currentUser['img_link']} name={this.props.currentUser.name} email={this.props.currentUser.email}/>
                    <main>
                        <div className="form__wrapper">
                            <h2 className="page-header">LISTS</h2>
                            <form method="POST" action={`/lists`} className="add-form">
                                <h2 className="add-form__header">Add List</h2>
                                <input className="add-form__name-input input-primary" type="text" name="name" placeholder="Name" maxlength="100"/>
                                <button className="add-form__submit-btn btn-secondary" type="submit">Add</button>
                            </form>
                        </div>
                        <div className="form__wrapper">
                            <h2 className="lists-all__header list-header">Lists</h2>
                            { listInfo }
                        </div>
                    </main>
                </body>
            </html>
        );
    }
}

module.exports = AllLists;