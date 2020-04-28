const React = require('react');

const nav = (props) => {

    if (props.link3) {
        return (
            <div className="nav">
                <a href={`${props.link}`} className="nav__link ">{props.linklabel}</a>
                <a href={`${props.link2}`} className="nav__link ">{props.link2label}</a>
                <a href={`${props.link3}`} className="nav__link ">{props.link3label}</a>
            </div>
        )
    } else if (props.link2) {
        return (
            <div className="nav">
                <a href={`${props.link}`} className="nav__link ">{props.linklabel}</a>
                <a href={`${props.link2}`} className="nav__link ">{props.link2label}</a>
            </div>
        )
    } else if (props.link) {
        return (
            <div className="nav">
                    <a href={`${props.link}`} className="nav__link ">{props.linklabel}</a>
                </div>
        )
    }
}

export default nav;