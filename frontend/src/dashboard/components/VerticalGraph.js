// import React from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top",
//     },
//     title: {
//       display: true,
//       text: "Holdings",
//     },
//   },
// };

// export function VerticalGraph({ data }) {
//   return <Bar options={options} data={data} />;
// }

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip
);

// Displays the percentage at the end of each bar.
const percentageLabels = {
  id: "percentageLabels",

  afterDatasetsDraw(chart) {
    const { ctx } = chart;

    const values = chart.data.datasets[0].data;
    const total = values.reduce(
      (sum, value) => sum + Number(value || 0),
      0
    );

    const meta = chart.getDatasetMeta(0);

    ctx.save();
    ctx.font = "14px Arial";
    ctx.fillStyle = "#174F3D";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";

    meta.data.forEach((bar, index) => {
      const percentage = total
        ? ((values[index] / total) * 100).toFixed(1)
        : "0.0";

      ctx.fillText(
        `${percentage}%`,
        chart.width - 8,
        bar.y
      );
    });

    ctx.restore();
  },
};

export function VerticalGraph({ data }) {
  const values = data.datasets[0].data || [];

  const maxValue = Math.max(...values, 0);

  const options = {
    indexAxis: "y",

    responsive: true,
    maintainAspectRatio: false,

    layout: {
      padding: {
        top: 5,
        bottom: 5,
        right: 65,
      },
    },

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        enabled: true,

        callbacks: {
          label: (context) => {
            const total = values.reduce(
              (sum, value) => sum + Number(value || 0),
              0
            );

            const percentage = total
              ? ((context.raw / total) * 100).toFixed(2)
              : "0.00";

            return ` ${Number(context.raw).toLocaleString(
              "en-IN",
              {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 2,
              }
            )} (${percentage}%)`;
          },
        },
      },
    },

    scales: {
      x: {
        display: false,
        beginAtZero: true,
        max: maxValue > 0 ? maxValue * 1.3 : 1,
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },

      y: {
        grid: {
          display: false,
        },

        border: {
          display: false,
        },

        ticks: {
          color: "#174F3D",
          font: {
            size: 14,
            weight: "600",
          },
          padding: 10,
        },
      },
    },
  };

  // Keep the graph height proportional to the number of holdings.
  const chartHeight = Math.max(values.length * 38, 100);

  return (
    <div
      style={{
        width: "100%",
        height: `${chartHeight}px`,
        position: "relative",
      }}
    >
      <Bar
        data={data}
        options={options}
        plugins={[percentageLabels]}
      />
    </div>
  );
}