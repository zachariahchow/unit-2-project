const React = require("react");

import Head from '../page-components/head-component';
import Header from '../page-components/header-component';

class AuthIndex extends React.Component {
    render() {

        return (
            <html>
                <Head />
                <body className="auth-home__body">


                    <main className="auth__main">

                    <div className="login-register-wrapper">
                        <div className="form-primary">
                            <div className="logo-wrapper">
                                <img src="./images/gearlog.svg" />
                            </div>
                            <Header />
                            <a href="/auth/login" className="login-link link-primary"><p>Login</p></a>
                            <a href="/auth/register" className="register-link link-primary"><p>Register</p></a>
                        </div>
                    </div>
                    </main>
                </body>
            </html>
        );
    }
}

module.exports = AuthIndex;