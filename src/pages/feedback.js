import React from "react";
import FeedbackForm from '../components/feedbackform';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import BinsMap from '../components/GoogleMapsDirection';


const useStyles = makeStyles({
    container: {
        borderRadius: '20px',
        // background: 'linear-gradient(45deg, #e1f5fe 50%, #e0f7fa 50%, #e0f2f1 50%)',
        paddingTop: '100px',
        marginLeft: 0,
        borderLeft: 0,
        width: '100wh'

    },
    formcontainer: {
        marginTop:40
    }
})

const Feedback = ({binList}) => {

    const classes = useStyles();

    return (
      <Container className={classes.container}>
        {/* <Post /> */}
        <h4>Your feedback is important to us!</h4>
        <Container className={classes.formcontainer}>
          <Grid container spacing={3}>
          <Grid item xs={12}>
              <FeedbackForm />
            </Grid>
            <Grid item xs={12}>
              <BinsMap bins={binList}/>
            </Grid>
          </Grid>
        </Container>
      </Container>
    );
};
export default Feedback;
