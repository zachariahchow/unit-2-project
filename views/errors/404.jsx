const React = require("react");

import Head from '../page-components/head-component';
import Header from '../page-components/header-component';
import Nav from '../page-components/nav-component';

class Error404 extends React.Component {

    render() {

        return (
            <html>
                <Head />
                <body>

                    <Header />
                    <Nav link="/" linklabel="Back to Home Page"/>
                    <main>
                    <div className="form__wrapper home">
                            <div className="login-wrapper">
                                <p className="page-header">Oops. The page you're looking for doesn't exist.</p>
                            </div>
                    </div>
                    </main>
                </body>
            </html>
        );
    }
}

module.exports = Error404;