import React from 'react';
import Icon from '../../../images/admin/icon-01.svg';

// Import utilities

function DashboardCard01() {

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={Icon} width="32" height="32" alt="Icon 01" />
          {/* Menu button */}
        </header>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Template 1</h2>
        <div className="text-xs font-semibold text-gray-400 uppercase mb-1">Number of certs</div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 mr-2">Name</div>
          <div className="text-sm font-semibold text-white px-1.5 bg-green-500 rounded-full"></div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="flex-grow">
        {/* Change the height attribute to adjust the chart height */}
        {/* <LineChart data={chartData} width={389} height={128} /> */}
      </div>
    </div>
  );
}

export default DashboardCard01;
