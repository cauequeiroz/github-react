import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { CircularProgress } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: 24
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  loading: {
    display: 'block',
    margin: '0 auto'
  }
});

function SimpleExpansionPanel(props) {
  const { classes, loading, repos, onChange } = props;
  const isLoading = loading;

  let content;

  if (isLoading) {
    content = (
      <CircularProgress className={classes.loading} />
    )
  }

  if (repos) {
    content = (
      <div>mostrar conteudo</div>
    )
  }

  return (
    <div className={classes.root}>
      <ExpansionPanel onChange={onChange}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Repos</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails children={content} />
      </ExpansionPanel>
    </div>
  );
}

SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleExpansionPanel);