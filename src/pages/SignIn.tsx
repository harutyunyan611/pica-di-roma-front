import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { IUserSignInCredentials } from '../types/IUserSignInCredentials';
import UserManager from "../managers/UserManager";
import {useHistory} from "react-router";
import {Alert, AlertTitle} from "@material-ui/lab";
import _ from "lodash";
import {UseAuthDataStateValue} from "../context/AuthContext";
import {AuthContextDataStaticData} from "../static/AuthContextDataStaticData";
import {Backdrop, CircularProgress} from "@material-ui/core";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

const SignIn = () => {
  const classes = useStyles();
  const history = useHistory();
  const {setAuthDataState} = UseAuthDataStateValue();

  const [userSignInCredentials, setUserSignInCredentials] = useState<IUserSignInCredentials>({email: "", password: ""});
  const [userSignInCredentialErrors, setUserSignInCredentialErrors] = useState<IUserSignInCredentials>({email: "", password: ""});
  const [isErrorsAvailable, setIsErrorsAvailable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignInUserCredentialsUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserSignInCredentials({...userSignInCredentials, [e.target.name]: e.target.value})
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsErrorsAvailable(false);
    try {
      const response = await UserManager.signIn(userSignInCredentials);
      if (response.data) {
        setAuthDataState({type: AuthContextDataStaticData.UPDATE_AUTH_TOKEN, token: response.data.token})
        history.push("/menu");
      }
    } catch (e) {
      setUserSignInCredentialErrors(e.response?.data?.error)
      setIsErrorsAvailable(true);
    }
    setIsLoading(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Backdrop className={classes.backdrop} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        {isErrorsAvailable && <Alert severity="error" className="error-bar">
          <AlertTitle>Errors</AlertTitle>
          {_.map(userSignInCredentialErrors, (error) => {
            return <span>{error}<br/></span>
          })}
        </Alert>}
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSignIn}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleSignInUserCredentialsUpdate}
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
            onChange={handleSignInUserCredentialsUpdate}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default SignIn;
