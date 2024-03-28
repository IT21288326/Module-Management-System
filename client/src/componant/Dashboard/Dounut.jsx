import React from "react";
import { MDBContainer } from "mdbreact";
import Chart from "chart.js/auto";

class DonutChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.state = {
      dataDoughnut: {
        labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"],
        datasets: [
          {
            data: [300, 50, 100, 40, 120],
            backgroundColor: [
              "#F7464A",
              "#46BFBD",
              "#FDB45C",
              "#949FB1",
              "#4D5360"
            ],
            hoverBackgroundColor: [
              "#FF5A5E",
              "#5AD3D1",
              "#FFC870",
              "#A8B3C5",
              "#616774"
            ]
          }
        ]
      },
      doughnutOptions: {
        responsive: true,
        percentageInnerCutout: 190, // Adjust the value to reduce the radius
      }
    };
  }

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate() {
    this.renderChart();
  }

  renderChart() {
    if (this.chartRef && this.chartRef.current) {
      const { dataDoughnut, doughnutOptions } = this.state;

      if (this.myChart) {
        this.myChart.destroy();
      }

      this.myChart = new Chart(this.chartRef.current.getContext("2d"), {
        type: "doughnut",
        data: dataDoughnut,
        options: doughnutOptions// Pass the options here
      });
    }
  }

  render() {
    return (
      <MDBContainer>
       
        <canvas ref={this.chartRef} />
      </MDBContainer>
    );
  }
}

export default DonutChart;
