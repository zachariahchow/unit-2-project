const React = require("react");

import Head from '../page-components/head-component';
import Header from '../page-components/header-component';

class AuthIndex extends React.Component {
    render() {

        return (
            <html>
                <Head />
                <body>

                    <Header />
                    <main>

                    <div className="banner">
                        <div className="landing-page__nav">
                            <div className="overlay"></div>
                        </div>
                    </div>
                    <div className="login-register__wrapper">
                            <a href="/auth/login" className="login-link"><p>Login</p></a>
                            <a href="/auth/register" className="register-link"><p>Register</p></a>
                    </div>
                    </main>
                </body>
            </html>
        );
    }
}

module.exports = AuthIndex;