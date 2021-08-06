import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { MenuContext } from "react-flexible-sliding-menu";
import { 
          HomeIcon, 
          EditIcon, 
          LogoutIcon, 
          WarningIcon, 
          UserIcon, 
          BallotIcon, 
          StarCheckIcon,
          BulbIcon
        } from "./SVGicon";

const SideNav = () => {
    const { closeMenu } = useContext(MenuContext);

  return (
    <div className="Menu">
      <div className="user">
          <img src="./assets/images/avatar.png" alt="user" />
          <div className="user-detail">
              <div className="name">John</div>
              <div className="action"> 
                <span className="link">Edit Profile</span>
                <span className="icon">
                    <EditIcon />
                </span>
              </div>
          </div>
      </div>

      <nav onClick={closeMenu}>
        <NavLink exact to="/">
          <HomeIcon />
          <span>Home </span>
        </NavLink>
        <NavLink to="./punters-tips">
          <BulbIcon 
            color="#8B8787"
          />
          <span>Punters Tips</span>
        </NavLink>
        <NavLink to="./match-review">
          <StarCheckIcon 
            color="#8B8787"
          />
          <span>Match Review</span>
        </NavLink>
        <NavLink to="./bet-terminologies">
          <BallotIcon />
          <span>Bet Terminologies</span>
        </NavLink>
        <NavLink to="./account" className="account">
          <UserIcon />
          <span>SignUp</span>
        </NavLink>
        <NavLink to="./disclaimer">
          <WarningIcon />
          <span>Disclaimer</span>
        </NavLink>
        <NavLink to="./logout" className="logout">
          <LogoutIcon />
          <span>Logout</span>
        </NavLink>
      </nav>
    </div>
  )
}

export default SideNav
