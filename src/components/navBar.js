import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Authentication/Context/authContext";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import AccountCircle from "@material-ui/icons/AccountCircle";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Link } from "react-router-dom";
import { db } from "../Authentication/firebase";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const { currentUser, logout, lastLoggedInUser } = useContext(AuthContext);
  const [userActive, setUserActive] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    logout();
  };

  useEffect(() => {
    if (!currentUser) {
      db.collection("users")
        .doc(lastLoggedInUser.uid)
        .get()
        .then(({ _delegate }) => {
          console.log(_delegate);
          const { firstName: fName, lastName: lName } =
            _delegate._document.data.value.mapValue.fields;

          setUserActive(`${fName.stringValue} ${lName.stringValue}`);
        });
    } else {
      db.collection("users")
        .doc(currentUser.uid)
        .get()
        .then(({ _delegate }) => {
          console.log(_delegate);
          const { firstName: fName, lastName: lName } =
            _delegate._document.data.value.mapValue.fields;

          setUserActive(`${fName.stringValue} ${lName.stringValue}`);
        });
    }
  }, []);

  return (
    <div style={{ width: "100vw", overflow: "hidden" }}>
      <AppBar position="static">
        <Toolbar
          style={{
            backgroundColor: "#32a88f"
          }}
        >
          {userActive && (
            <Typography variant="h6" className={classes.title}>
              Welcome Back, {userActive}
            </Typography>
          )}

          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem>
                <Link to="/update-profile">Update Profile</Link>
              </MenuItem>
              <MenuItem onClick={handleLogOut}>
                <Link>Log Out</Link>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
