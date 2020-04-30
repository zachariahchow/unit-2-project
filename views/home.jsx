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
                <body>

                    <Header hasMenu="true" />
                    <Nav link="/gear" linklabel="Gear" link2="/pedalboards" link2label="Pedalboards" link3="/lists" link3label="Lists"/>
                    <Burgermenu />
                    <main>
                    <div className="form__wrapper home">
                            <div className="login-wrapper">
                                {displayLoggedInUser()}
                                <form type="hidden" method="POST" action={`/auth/logout`} className="auth-form logout-form">
                                <button type="submit" className="logout-btn btn-primary"><p>Logout</p></button>
                                </form>
                            </div>
                    </div>

                    </main>
                </body>
            </html>
        );
    }
}

module.exports = Home;