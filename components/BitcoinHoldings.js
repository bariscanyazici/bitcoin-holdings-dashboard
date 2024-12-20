import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Sector
} from 'recharts';

const BitcoinHoldings = () => {
  const [activeView, setActiveView] = useState('all');
  const [chartType, setChartType] = useState('bar');
  const [activePieIndex, setActivePieIndex] = useState(-1);
  
  const allHolders = [
    { name: 'Coinbase', btc: 2256287, share: 33.64 },
    { name: 'Satoshi', btc: 968452, share: 14.44 },
    { name: 'Binance', btc: 636209, share: 9.49 },
    { name: 'BlackRock', btc: 357509, share: 5.33 },
    { name: 'MicroStrategy', btc: 331200, share: 4.94 },
    { name: 'Grayscale', btc: 224751, share: 3.35 },
    { name: 'U.S. Gov.', btc: 213246, share: 3.18 },
    { name: 'Bitfinex', btc: 207429, share: 3.09 },
    { name: 'OKX', btc: 195182, share: 2.91 },
    { name: 'Kraken', btc: 190998, share: 2.85 },
    { name: 'Chinese Gov.', btc: 190000, share: 2.83 },
    { name: 'Fidelity', btc: 175515, share: 2.62 },
    { name: 'Block.one', btc: 164000, share: 2.45 },
    { name: 'RobinHood', btc: 144657, share: 2.16 },
    { name: 'Unknown 1', btc: 78317, share: 1.17 },
    { name: 'Upbit', btc: 77648, share: 1.16 },
    { name: 'Tether', btc: 75354, share: 1.12 },
    { name: 'Unknown 2', btc: 75079, share: 1.12 },
    { name: 'Unknown 3', btc: 73000, share: 1.09 },
    { name: 'Gemini', btc: 71495, share: 1.07 }
  ].map(holder => ({
    ...holder,
    formattedBTC: holder.btc.toLocaleString(),
    value: holder.btc
  }));

  const nonCustodialHolders = [
    { name: 'Satoshi', btc: 968452, share: 14.44 },
    { name: 'MicroStrategy', btc: 331200, share: 4.94 },
    { name: 'U.S. Gov.', btc: 213246, share: 3.18 },
    { name: 'Chinese Gov.', btc: 190000, share: 2.83 },
    { name: 'Block.one', btc: 164000, share: 2.45 },
    { name: 'Unknown 1', btc: 78317, share: 1.17 },
    { name: 'Unknown 2', btc: 75079, share: 1.12 },
    { name: 'Unknown 3', btc: 73000, share: 1.09 }
  ].map(holder => ({
    ...holder,
    formattedBTC: holder.btc.toLocaleString(),
    value: holder.btc
  }));

  const COLORS = [
    '#f7931a', '#2b5df0', '#00c853', '#ff6b6b', '#9c27b0',
    '#795548', '#607d8b', '#ff9800', '#00bcd4', '#8bc34a',
    '#e91e63', '#3f51b5', '#009688', '#ffeb3b', '#ff5722',
    '#9e9e9e', '#ffcc80', '#81c784', '#b39ddb', '#4db6ac'
  ];

  const renderActiveShape = (props) => {
    const {
      cx, cy, innerRadius, outerRadius, startAngle, endAngle,
      fill, payload
    } = props;

    return (
      <g>
        <text x={cx} y={cy-20} dy={8} textAnchor="middle" fill="#333" fontSize="16px" fontWeight="bold">
          {payload.name}
        </text>
        <text x={cx} y={cy+10} dy={8} textAnchor="middle" fill="#666">
          {`${payload.formattedBTC} BTC`}
        </text>
        <text x={cx} y={cy+40} dy={8} textAnchor="middle" fill="#666">
          {`${payload.share}%`}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 8}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 8}
          outerRadius={outerRadius + 12}
          fill={fill}
        />
      </g>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border rounded shadow">
          <p className="font-bold text-lg mb-2">{data.name}</p>
          <p className="text-gray-700">BTC: {data.formattedBTC}</p>
          <p className="text-gray-700">Market Share: {data.share}%</p>
          <p className="text-gray-700">Value: ${(data.btc * 100000).toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  const renderStats = (data) => {
    const totalBTC = data.reduce((sum, item) => sum + item.btc, 0);
    const totalShare = data.reduce((sum, item) => sum + item.share, 0);
    const topHolder = data.reduce((max, item) => item.btc > max.btc ? item : max, data[0]);
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 mt-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Total Holders</h3>
          <p className="text-2xl font-bold text-blue-600">{data.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Total BTC</h3>
          <p className="text-2xl font-bold text-green-600">{totalBTC.toLocaleString()}</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Total Share</h3>
          <p className="text-2xl font-bold text-orange-600">{totalShare.toFixed(2)}%</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Largest Holder</h3>
          <p className="text-xl font-bold text-purple-600">{topHolder.name}</p>
          <p className="text-sm text-purple-500">{topHolder.share}% Share</p>
        </div>
      </div>
    );
  };

  const currentData = activeView === 'all' ? allHolders : nonCustodialHolders;

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-4">Bitcoin Holdings Distribution</h2>
        <p className="text-gray-600 mb-4">
          Interactive visualization of {activeView === 'all' ? 'all Bitcoin holders' : 'non-custodial Bitcoin holders'} 
          showing distribution of {currentData.length} entities
        </p>
        <div className="flex flex-wrap gap-4 mb-4">
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeView === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setActiveView('all')}
          >
            All Holders
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeView === 'nonCustodial'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setActiveView('nonCustodial')}
          >
            Non-Custodial Holders
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              chartType === 'bar'
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setChartType('bar')}
          >
            Bar Chart
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              chartType === 'pie'
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setChartType('pie')}
          >
            Pie Chart
          </button>
        </div>
      </div>

      {renderStats(currentData)}

      <div className="h-96 mt-8">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'bar' ? (
            <BarChart
              data={currentData}
              margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={100}
                interval={0}
              />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                dataKey="btc"
                name="Bitcoin Amount"
                fill="#f7931a"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          ) : (
            <PieChart>
              <Pie
                activeIndex={activePieIndex}
                activeShape={renderActiveShape}
                data={currentData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={140}
                onMouseEnter={(_, index) => setActivePieIndex(index)}
                onMouseLeave={() => setActivePieIndex(-1)}
              >
                {currentData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>

      {chartType === 'pie' && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {currentData.map((holder, index) => (
            <div 
              key={holder.name}
              className="flex items-center p-2 rounded hover:bg-gray-50"
              onMouseEnter={() => setActivePieIndex(index)}
              onMouseLeave={() => setActivePieIndex(-1)}
            >
              <div 
                className="w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <div>
                <p className="font-medium">{holder.name}</p>
                <p className="text-sm text-gray-600">{holder.share}%</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BitcoinHoldings;
