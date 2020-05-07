import React, { Component } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

class ProductViewsGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //rows: [{}],
            products:[],
            day:[]
        }
    }

    componentDidMount(){
        /*
        var data={
            id:localStorage.getItem("id")
        }*/
            axios.defaults.withCredentials = true;
           
        }
    
    render() {
        const data = {
            labels: this.state.day,
            datasets: [
              {
                label: 'Top 10 products viewed per day',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.state.products
              }
            ]
          }
console.log(this.state.products)
        return (
            <div style={{ background: "#fafafa" }}>
                   <Bar ref="chart" data={data} />
            </div>
        )
    }
}

export default ProductViewsGraph;