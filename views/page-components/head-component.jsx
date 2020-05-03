const React = require('react');

const head = (props) => {

    const csrfTag = (() => {
        if (props.csrfToken) {
            return <meta name="csrf-token" content={props.csrfToken} />
        } else {
            return;
        }
    })();

    return (
        <head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            {csrfTag}
            <title>GearLog</title>
            <link href="https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;1,200;1,300;1,400&display=swap" rel="stylesheet" />
            <link rel="stylesheet" href="css/main.css" />
            <script defer src="js/burger-menu.js"></script>
        </head>
    )
}

export default head;