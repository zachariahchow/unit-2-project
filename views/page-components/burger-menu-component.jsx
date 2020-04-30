const React = require('react');

import Header from '../page-components/header-component';

const burger = () => {
    return (
        <div className="burger-menu">
            <div className="burger-menu__close-btn">X</div>
            <Header extraClass="header__burger-menu"/>
            <ul className="burger-menu__list">
                <li className="burger-menu__link">
                    <a href="">About</a>
                </li>
                <li className="burger-menu__link">
                    <a href="">Contact</a>
                </li>
                <li className="burger-menu__link">
                    <a href="">Profile</a>
                </li>
            </ul>
        </div>
    )
}

export default burger;