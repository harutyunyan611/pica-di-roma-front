import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {IUserCredentials} from "../types/IUserCredentials";
import UserManager from "../managers/UserManager";
import {Alert, AlertTitle} from '@material-ui/lab';
import _ from 'lodash';
import {useHistory} from "react-router";
import {Backdrop, CircularProgress} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();

  const [userCredentials, setUserCredentials] = useState<IUserCredentials>({
    confirm_password: "", email: "", first_name: "", last_name: "", password: ""
  });
  const [userCredentialErrors, setUserCredentialErrors] = useState<IUserCredentials>({
    confirm_password: "", email: "", first_name: "", last_name: "", password: ""
  });
  const [isErrorsAvailable, setIsErrorsAvailable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUserCredentialsUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserCredentials({...userCredentials, [e.target.name]: e.target.value})
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsErrorsAvailable(false);
    try {
      const response = await UserManager.signUp(userCredentials);
      if (response.data) {
        history.push("/signIn");
      }
    } catch (e) {
      setUserCredentialErrors(e.response?.data?.error)
      setIsErrorsAvailable(true);
    }
    setIsLoading(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>
        <Backdrop className={classes.backdrop} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        {isErrorsAvailable && <Alert severity="error" className="error-bar">
          <AlertTitle>Errors</AlertTitle>
          {_.map(userCredentialErrors, (error) => {
            return <span>{error}<br/></span>
          })}
        </Alert>}
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSignUp}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="FirstName"
            name="first_name"
            autoComplete="firstName"
            autoFocus
            onChange={handleUserCredentialsUpdate}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="LastName"
            name="last_name"
            autoComplete="lastName"
            onChange={handleUserCredentialsUpdate}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={handleUserCredentialsUpdate}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleUserCredentialsUpdate}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirm_password"
            label="Confirm Password"
            type="password"
            id="confirm_password"
            autoComplete="current-password"
            onChange={handleUserCredentialsUpdate}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signIn" variant="body2">
                {"Do you have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default SignUp;
