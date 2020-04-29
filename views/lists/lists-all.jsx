const React = require("react");

import Head from '../page-components/head-component';
import Header from '../page-components/header-component';
import Nav from '../page-components/nav-component';

class AllLists extends React.Component {

    render() {

        const listInfo = this.props.allLists.map(list =>

            <div className="single-list__container" key={list.id}>
                <a href={`./lists/${list.id}`} className="single-list__name">{list.name}</a>
            </div>
        )



        return (
            <html>
                <Head />
                <body>
                    <Header />
                    <main>
                        <div className="form__wrapper">
                            <h2 className="lists-all__header">Lists</h2>
                            { listInfo }
                        </div>
                    </main>
                </body>
                <Nav />
            </html>
        );
    }
}

module.exports = AllLists;