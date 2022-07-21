import React from "react";
import { ConnectButton } from "web3uikit";
import { NavLink } from "react-router-dom";

import classes from "./Header.module.css"

const Header = () => {
    return (
        <div className={classes.Header}>
            <ConnectButton />
            {/* <div className={classes.Links}>
                <ul>
                    <li>
                        <NavLink to="./enter-lottery">Learn</NavLink>
                    </li>
                    <li>
                        <NavLink to="./enter-lottery">Enter Lottery</NavLink>
                    </li>
                </ul>
            </div> */}
            <h1>Smart Contract Lottery</h1>

        </div>

    )
}

export default Header