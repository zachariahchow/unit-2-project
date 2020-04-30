const React = require('react');

const header = (props) => {

    if (props.hasMenu) {
        return (
            <div className="header">
                <div className="header__menu">
                    <li className="header__menu-line"></li>
                    <li className="header__menu-line"></li>
                    <li className="header__menu-line"></li>
                </div>
                <p className="header__heading"><a href="/">GearLog</a></p>
            </div>
        )
    } else {
        return (
            <div className={`header ${props.extraClass}`}>
                <p className="header__heading"><a href="/">GearLog</a></p>
            </div>
        )
    }
}

export default header;