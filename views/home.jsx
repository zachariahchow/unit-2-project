const React = require("react");

import Head from './page-components/head-component';
import Header from './page-components/header-component';
import Nav from './page-components/nav-component';

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

                    <Header />
                    <main>
                    <Nav />

                    <div className="banner">
                        <div className="banner__img-container">
                            <div className="overlay"></div>
                            <p></p>
                        </div>
                    </div>
                    <div className="login-register__wrapper home">
                            {displayLoggedInUser()}
                            <form type="hidden" method="POST" action={`/auth/logout`} className="auth-form logout-form">
                            <button type="submit" className="logout-btn"><p>Logout</p></button>
                            </form>
                    </div>

                    </main>
                </body>
            </html>
        );
    }
}

module.exports = Home;