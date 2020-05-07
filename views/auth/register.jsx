const React = require("react");

import Head from '../page-components/head-component';
import Header from '../page-components/header-component';
import Nav from '../page-components/nav-component';

class RegisterForm extends React.Component {

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
                <script defer src="" />
                <body>

                    <Nav link="/" linklabel="Back"/>
                    <main className="login-register__main">
                        <div className="login-register-wrapper">
                            <Header />
                            <form method="POST" action={`/auth/register`} className="auth-form form-primary">
                                <input type="hidden" name="_csrf" value={`${this.props['_locals'].csrfToken}`}/>
                                {displayInvalidMsg()}
                                <h2 className="auth-form__header"></h2>
                                <label className="label-primary" htmlFor="email">Email</label>
                                <input className="input-primary" type="email" name="email" placeholder="email"></input>
                                <label className="label-primary" htmlFor="password">Password</label>
                                <input className="input-primary" type="password" name="password" placeholder="password"></input>
                                <button className="auth-form__submit-btn login-btn btn-primary" type="submit">Register</button>
                            </form>
                        </div>
                    </main>
                </body>
            </html>
        );
    }
}

module.exports = RegisterForm;