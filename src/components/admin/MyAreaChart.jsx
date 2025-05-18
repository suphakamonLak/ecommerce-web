import React from 'react'
import { Line } from 'react-chartjs-2'
import { 
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
 } from 'chart.js'
import { numberFormat } from '../../utils/number';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

const MyAreaChart = ({ labels, data }) => {
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: "ยอดขาย",
                lineTension: 0.3,
                backgroundColor: "rgba(78, 115, 223, 0.05)",
                borderColor: "rgba(78,115,223,1)",
                pointRadius: 3,
                pointBackgroundColor: "rgba(78,115,223,1)",
                pointBorderColor: "rgba(78,115,223,1)",
                pointHoverRadius: 3,
                pointHoverBackgroundColor: "rgba(78,115,223,1)",
                pointHoverBorderColor: "rgba(78,115,223,1)",
                pointHitRadius: 10,
                pointBorderWidth: 2,
                data: data,
            },
        ],
    };
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend:{ display: false },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.dataset.label || "";
                        const value = context.raw;
                        return `${label}: ฿${numberFormat(value)}`;
                    },
                },
                backgroundColor: "rgba(255,255,255)",
                bodyColor: "#858796",
                borderColor: "#dddfeb",
                borderWidth: 1,
                titleColor: "#6e707e",
                titleFont: {size:14},
                padding: 15,
            },
        },
        scales: {
            x: {
                grid: {display: false},
                ticks: {maxTicksLimit: 7},
            },
            y: {
                ticks: {
                    maxTicksLimit: 5,
                    padding: 10,
                    callback: function(value) {
                        return "฿" + numberFormat(value)
                    },
                },
                grid: {
                    color: "rgba(234,236,244)",
                    borderDash: [2],
                }
            }
        }
    };
    return <Line data={chartData} options={options} height={350}></Line>
};

export default MyAreaChart