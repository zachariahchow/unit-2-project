const React = require("react");

import Head from './page-components/head-component';
import Header from './page-components/header-component';
import Nav from './page-components/nav-component';
import Burgermenu from './page-components/burger-menu-component';

class Home extends React.Component {

    render() {

        const displayLoggedInUser = () => {
            if (this.props.currentUser) {
                return (<div className="user__wrapper">
                    <p className="user-email">Logged in as: {this.props.currentUser.email}</p>
                    </div>)
            } else {
                return;
            }
        }

        return (
            <html>
                <Head />
                <script defer src="./js/util/send-http-request.js" />
                <script defer src="./js/user-feed.js" />
                <body>

                    <Header hasMenu="true" />
                    <Nav link="/gear" linklabel="Gear" link2="/pedalboards" link2label="Pedalboards" link3="/lists" link3label="Lists"/>
                    <Burgermenu img={this.props.currentUser['img_link']} name={this.props.currentUser.name} email={this.props.currentUser.email}/>
                    <main className="login-register__main">
                    <div className="form__wrapper home">
                            <div className="login-wrapper">
                                {displayLoggedInUser()}
                                <form type="hidden" method="POST" action={`/auth/logout`} className="auth-form logout-form">
                                <button type="submit" className="logout-btn btn-primary"><p>Logout</p></button>
                                </form>
                            </div>
                    </div>
                    <h3 className="user-feed__header page-header">User Feed</h3>
                    </main>
                </body>
            </html>
        );
    }
}

module.exports = Home;