import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function StockChart({ series, categories }) {
  const options = {
    // 出現警告提示說要有此設定
    accessibility: { enabled: false },

    chart: {
      type: 'line',
    },
    title: {
      text: '長榮航',
    },
    // 3條數列
    series: series,
    // X軸標籤(配合 series 數值 data)
    xAxis: {
      // categories: ['7/1', '7/8', '7/15'],
      categories: categories,
    },
    // Y軸文字
    yAxis: {
      title: {
        text: 'NT/元',
      },
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
