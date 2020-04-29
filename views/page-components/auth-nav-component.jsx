const React = require('react');

const nav = (props) => {

    return (
        <div className="nav">
                <a href={`${props.link}`} className="nav__link ">{props.linklabel}</a>
                <a href={`${props.link2}`} className="nav__link ">{props.link2label}</a>
                <a href={`${props.link3}`} className="nav__link ">{props.link3label}</a>
            </div>)
}

export default nav;