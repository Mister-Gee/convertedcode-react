import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { MenuContext } from "react-flexible-sliding-menu";
import { 
          HomeIcon, 
          LogoutIcon, 
          WarningIcon, 
          UserIcon, 
          BallotIcon, 
          StarCheckIcon,
          BulbIcon
        } from "./SVGicon";
import { useState } from '@hookstate/core';
import store from '../../store/store';
import {logout} from '../../services/authServices';


const SideNav = () => {
  const history = useHistory()
  const { closeMenu } = useContext(MenuContext);

  const {user} = useState(store)
  const {authDrawer} = useState(store)
  const {alertNotification} = useState(store)
  const {alertMessage} = useState(store)
  const {alertType} = useState(store)



  const handleLogout = async () => {
    try{
        let res = await logout()
        if(res.status === 200){
            localStorage.removeItem("accessToken")
            localStorage.removeItem("returnToken")
            user.set({})
            alertType.set("success")
            alertMessage.set(res.data.message)
            alertNotification.set(true)
            setTimeout(() => {
                alertNotification.set(false)
            }, 1500)
            // setReturnToken(null)
            history.push({
                    pathname: "/"
                })
        }
    }
    catch(err){
        console.log(err)
    }
}

  return (
    <div className="Menu">
      <div className="user">
          {/* <img src="/assets/images/avatar.png" alt="user" /> */}
          <div className="user-detail ml-5">
              <div className="name">{user.get().username ? user.get().username : "User"}</div>
              {/* <div className="action"> 
                <span className="link">Edit Profile</span>
                <span className="icon">
                    <EditIcon />
                </span>
              </div> */}
          </div>
      </div>

      <nav onClick={closeMenu}>
        <NavLink exact to="/">
          <HomeIcon />
          <span>Home </span>
        </NavLink>
        <NavLink to="/punters-tips">
          <BulbIcon 
            color="#8B8787"
          />
          <span>Punters Tips</span>
        </NavLink>
        <NavLink to="/match-reviews">
          <StarCheckIcon 
            color="#8B8787"
          />
          <span>Match Reviews</span>
        </NavLink>
        <NavLink to="/bet-terminologies">
          <BallotIcon />
          <span>Bet Terminologies</span>
        </NavLink>
        {user.get().username ?
        <NavLink to="/dashboard" className="account">
          <UserIcon />
          <span>Dashboard</span>
        </NavLink>
        :
        <NavLink to="#" onClick={() => {
              authDrawer.set(true)
            }} 
            className="account"
          >
          <UserIcon />
          <span>SignIn</span>
        </NavLink>
        }
        <NavLink to="/disclaimer">
          <WarningIcon />
          <span>Disclaimer</span>
        </NavLink>
        {user.get().username ?
        <NavLink to="#" onClick={handleLogout} className="logout">
          <LogoutIcon />
          <span>Logout</span>
        </NavLink>
        :
        ""
        }
      </nav>
    </div>
  )
}

export default SideNav
