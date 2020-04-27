const React = require("react");

import Head from '../page-components/head-component';
import Header from '../page-components/header-component';

class LoginForm extends React.Component {

    render() {

        const displayInvalidMsg = () => {

            if (this.props.invalidMsg) {
                return (
                    <div className="invalid-msg__wrapper">
                        <p className="invalid-msg">{this.props.invalidMsg}</p>
                    </div>
                )

            } else {
                return;
            }

        }

        return (

            <html>
                <div className="overlay"></div>
                <Head />
                <body>
                    <Header />
                    <div className="nav">
                        <a href="/" className="nav__link home-link"><p>Home</p></a>
                    </div>
                    <main>
                        <div className="form__wrapper">
                            <form method="POST" action={`/auth/login`} className="auth-form">
                                {displayInvalidMsg()}
                                <h2 className="auth-form__header"></h2>
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" placeholder="email"></input>
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" placeholder="password"></input>
                                <button className="auth-form__submit-btn login-btn" type="submit">Login</button>
                            </form>
                        </div>
                    </main>
                </body>
            </html>
        );
    }
}

module.exports = LoginForm;