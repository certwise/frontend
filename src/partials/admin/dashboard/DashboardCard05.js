import React, { useState, useEffect } from 'react';
import Info from '../../../utils/admin/Info';
import RealtimeChart from '../charts/RealtimeChart';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../../utils/admin/Utils';

function DashboardCard05() {


  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100 flex items-center">
        <h2 className="font-semibold text-gray-800">Your Issued Certificates</h2>
        <Info className="ml-2" containerClassName="min-w-44">
          <div className="text-sm text-center">All <a className="underline" href="https://www.chartjs.org/" target="_blank" rel="noreferrer"></a></div>
        </Info>
      </header>

    </div>
  );
}

export default DashboardCard05;
