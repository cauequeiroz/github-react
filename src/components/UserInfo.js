import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Avatar, Grid, Typography, CircularProgress, Divider } from '@material-ui/core';

const styles = {
  card: {
    padding: 24
  },
  avatar: {
    width: 120,
    height: 120,
    marginRight: 48,
    marginBottom: 12
  },
  bio: {
    maxWidth: 280
  },
  divider: {
    margin: '12px 0',
    width: '50%'
  },
  key: {
    display: 'inline-block',
    marginRight: 6
  },
  value: {
    display: 'inline-block',
  },
  loading: {
    display: 'block',
    margin: '0 auto'
  }
}

const UserInfo = props => {
  const { classes, user, loading } = props;

  const isLoading = !!loading;
  const hasUser = !!user;
  const hasInvalidUser = user && !user.image;
  
  if (isLoading) return (
    <CircularProgress className={classes.loading} />
  );

  if (!hasUser) return (
    <Typography align="center">
      type a username to search.
    </Typography>
  );

  if (hasInvalidUser) return (
    <Typography align="center">
      you must type a valid github username.
    </Typography>
  );

  return (
    <Card className={classes.card}>
      <Grid container
        direction="row"
        justify="flex-start"
        alignItems="flex-start">
        
        <Grid item>
          <Avatar
          src={user.image}
          className={classes.avatar} />

          <Typography variant="title" >{user.name}</Typography>
          <Typography variant="subheading" >@{user.username}</Typography>
        </Grid>

        <Grid item>
          {user.bio && (<div>
            <Typography className={classes.bio}>{user.bio}</Typography>
            <Divider className={classes.divider} />
          </div>)}

          {user.info.map(({key, value}) => (
            <div key={key}>
              <Typography
                variant="body2"
                className={classes.key}>{key}:</Typography>
              <Typography
                className={classes.value}>{value}</Typography>
            </div>
          ))}
        </Grid>
      </Grid>
    </Card>
  );
};

UserInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserInfo);