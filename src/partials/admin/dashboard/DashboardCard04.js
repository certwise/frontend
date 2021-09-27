import React from 'react';

function DashboardCard04() {

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
