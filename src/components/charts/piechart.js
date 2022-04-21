import React, { Component } from "react";
import Chart from "react-apexcharts"
//import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { Card, CardHeader } from '@material-ui/core'; // , Box

const styles = theme => ({
  piechart: {
    boxShadow: '0 3px 5px 2px #9e9e9e',
    padding: 0,
    //alignItems: 'center',
    height: 481
  },
  title: {
    fontSize: '15px',
    fonWeight: '500',
    fontFamily: 'Jost, sans-serif',
    textAlign: 'left'
  },
  chart: {
    margin: 0,
    padding: 0,
    // selfAlign: 'center'
    // height: 500,
    // width: 500
  }
});

class PieChart extends Component {

  

  constructor(props) {
    super(props);

    // const bins = props.bins;
    // console.log(bins)
    

    this.state = {
      options: {
        chart: {
          //parentHeightOffset: 35,
          //height: 'auto',
          type: 'donut',
          height: 522,
          horizontalAlign: 'center',
          //paddingTop: 30,
          offsetX: 0,
          //offsetY: 40,
          // background: 'grey',
          foreColor: '#78909c',
        },
        colors: ['#8B0000', '#29b6f6', '#8bc34a', '#ffc107', '#FF6347', 	'#D3D3D3'],
        dataLabels: {
          enabled: true
        },
        stroke: {
          curve: 'smooth'
        },
        legend: {
          show: true,
          fontSize: 13,
          position: 'bottom',
          // // marginTop: 20,
          horizontalAlign: 'left',
          //offsetX: 50,
          markers: {
            radius: 12
          },
          //fontWeight: 500,
          itemMargin: { horizontal: 12 },
          labels: {
            colors: '#78909c'
          },
          height: 100,
          width: 300,
          
        },
        labels: ['Overfilled', 'Filled', 'Unfilled', 'Fire', 'Low Battery', 'Abnormal']
      },
      series: [1, 1, 1, 1, 1, 1],

    }
  }



  render() {
    const { classes } = this.props;
    //console.log(classes);
    const bins = this.props.bins;
    //console.log(bins);
    const overfilledBins = bins.filter(function (bin) { return bin.status === "Overfilled" || bin.height === 99 }).length;
    const filledBins = bins.filter(function (bin) { return bin.status === "Filled" }).length; // 70% fill
    const unfilledBins = bins.filter(function (bin) { return bin.status === "Unfilled" }).length;
    // const greenBins = bins.filter(function (bin) { return (bin.full_alarm === 1 && bin.color=== "green")}).length;
    // const blueBins = bins.filter(function (bin) { return (bin.full_alarm === 1 && bin.color=== "blue")}).length;
    const lowBattBins = bins.filter(function (bin) { return bin.battery_alarm === 1 }).length;
    const fireBins = bins.filter(function (bin) { return bin.fire_alarm === 1 }).length;
    const abnormalBins = bins.filter(function (bin) { return bin.height === 9999 || bin.height===0 || bin.status==="Error"}).length;
    const series = [overfilledBins, filledBins, unfilledBins, fireBins, lowBattBins, abnormalBins]    
    
    return (
      <Card className={classes.piechart}>
        <CardHeader className={classes.title} title="Current Status" />
        <Chart className={classes.chart} options={this.state.options} series={series} type="donut" height="430" />
      </Card >
    );
  }
}
PieChart.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PieChart);
