import React from 'react';
import { Link } from "react-router-dom";

const Navigation = () => {

    const navLinks = [
        { to: '/', text: 'Workout' },
        { to: '/history', text: 'History' },
        { to: '/planner', text: 'Exercises' },
    ]
    return (

        <nav>
            <ul>
                {
                    navLinks.map((link, index) => {
                        return (
                            <li key={index}>
                                <Link to={link.to}>{link.text}</Link>
                            </li>
                        );
                    })
                }
            </ul>
        </nav>
    );
}

export default Navigation;