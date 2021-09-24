import React from 'react';
import BarChart from '../charts/BarChart01';

// Import utilities
import { tailwindConfig } from '../../../utils/admin/Utils';

function DashboardCard04() {

  const chartData = {
    labels: [
      '12-01-2020', '01-01-2021', '02-01-2021',
      '03-01-2021', '04-01-2021', '05-01-2021',
    ],
    datasets: [
      // Light blue bars
      {
        label: 'Direct',
        data: [
          800, 1600, 900, 1300, 1950, 1700,
        ],
        backgroundColor: tailwindConfig().theme.colors.blue[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[500],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Blue bars
      {
        label: 'Indirect',
        data: [
          4900, 2600, 5350, 4800, 5200, 4800,
        ],
        backgroundColor: tailwindConfig().theme.colors.indigo[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-3 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Your Credits</h2>
      </header>
      <div className="flex flex-col px-3 py-4  text-2xl font-bold text-primary">
        850c credits
      </div>

      <div className="flex flex-col px-3 py-2  text-2xl font-bold text-gray-800">
        Credits spent on Templates:
        <div className='card text-secondary shadow-lg border-2 border-gray-200 p-5 mt-2'>Template 1: 260c</div>
        <div className='card text-secondary shadow-lg border-2 border-gray-200 p-5 mt-2'>Template 2: 480c</div>
      </div>
    </div>
  );
}

export default DashboardCard04;
