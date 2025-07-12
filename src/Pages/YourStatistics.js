import React from 'react';

const YourStatistics = () => {
  const stats = [
    { day: 'Mon', value: 500 },
    { day: 'Tue', value: 300 },
    { day: 'Wed', value: 250 },
    { day: 'Thu', value: 450 },
    { day: 'Fri', value: 800 },
    { day: 'Sat', value: 1200 },
    { day: 'Sun', value: 1500 },
  ];

  const maxValue = 1600;
  const ySteps = 4;
  const chartHeight = 360;

  return (
    <section className="w-full px-6 md:px-[60px] py-16 font-roboto">
      {/* Title */}
      <div className="max-w-[600px] mb-8">
        <h2 className="font-bold text-2xl md:text-3xl text-black">Your Statistics</h2>
        <div className="w-[180px] h-2 bg-[#007860] rounded-[20px]" />
      </div>

      {/* Boxed Chart */}
      <div className="max-w-[1200px] mx-auto">
        {/* Rectangle 834 (Top Header of Box) */}
        <div
          className="w-full h-[84px] rounded-t-[10px] flex items-center justify-center"
          style={{
            background: 'linear-gradient(180deg, #007860 0%, #007860 100%)',
            boxShadow: '0px 7px 9px -5px #07323780',
          }}
        >
          <h3 className="text-white text-xl font-semibold">Weekly Performance Overview</h3>
        </div>

        {/* Main Chart Box */}
        <div className="bg-white border border-gray-300 rounded-b-2xl p-6 shadow-md">
          {/* Y-axis Labels + Bars */}
          <div className="relative flex h-[420px]">
            {/* Y-Axis Static Lines & Labels */}
            <div className="w-[60px] flex flex-col justify-between items-end pr-2 border-r border-gray-300">
              {Array.from({ length: ySteps + 1 }, (_, i) => {
                const val = maxValue - (maxValue / ySteps) * i;
                return (
                  <div key={i} className="h-[72px] relative w-full">
                    <div className="absolute top-0 right-0 text-sm text-gray-500">{val}</div>
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gray-200" />
                  </div>
                );
              })}
            </div>

            {/* Bars */}
            <div className="flex items-end justify-between flex-1 pl-6">
              {stats.map((item, index) => {
                const barHeight = (item.value / maxValue) * chartHeight;

                return (
                  <div key={index} className="flex flex-col items-center">
                    {/* Top Label */}
                    <div className="text-center text-sm font-medium text-black mb-2">
                      {item.day}
                      <br />
                      {item.value}
                    </div>

                    {/* Bar */}
                    <div
                      className="w-[50px] rounded-[10px]"
                      style={{
                        height: `${barHeight}px`,
                        background: `linear-gradient(180deg, #007860 0%, rgba(0, 120, 96, 0) 100%)`,
                      }}
                    ></div>

                    {/* Bottom Day Label */}
                    <div className="mt-3 text-sm text-black">{item.day}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YourStatistics;
