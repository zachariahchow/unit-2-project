const React = require('react');

import Header from '../page-components/header-component';

const burger = (props) => {
    return (
        <div className="burger-menu">
            <div className="burger-menu__close-btn">X</div>
            <Header extraClass="header__burger-menu"/>
            <ul className="burger-menu__list">
                <div className="user-profile__container">
                    <div className="user-profile__img-wrapper">
                        <img src={props.img} alt={props.name} className="user-profile__img"/>
                    </div>
                    <h3 className="user-profile__input-header input-img">Profile Picture </h3>
                    <input type="text" className={`user-profile__input-img input-burger`} defaultValue={props.img} />
                    <h3 className="user-profile__input-header input-name">Name</h3>
                    <input type="text" className={`user-profile__input-name input-burger`} defaultValue={props.name} />
                    <h3 className="user-profile__input-header input-email">Email</h3>
                    <input type="text" className={`user-profile__input-email input-burger`} defaultValue={props.email} />
                <form type="hidden" method="POST" action={`/auth/logout`} className="auth-form logout-form">
                <input type="hidden" name="_csrf" value={props.csrf}/>
                <button type="submit" className="logout-btn btn-burger"><p>Logout</p></button>
                </form>
                </div>
            </ul>
        </div>
    )
}

export default burger;