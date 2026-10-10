import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const PerformanceCharts: React.FC = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Today'];

  const callsBarData = {
    labels: days,
    datasets: [
      {
        label: 'Calls Handled',
        data: [12, 15, 14, 18, 16, 20, 15],
        backgroundColor: days.map((_, i) => (i === 6 ? '#1d9e75' : '#cbd5e1')),
        borderRadius: 6,
        barThickness: 16
      }
    ]
  };

  const callsBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.parsed.y} completed calls`
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 11, family: 'Inter' } }
      },
      y: {
        grid: { color: '#f1f5f9' },
        ticks: { font: { size: 10, family: 'Inter' } }
      }
    }
  };

  const ogScoreTrendData = {
    labels: days,
    datasets: [
      {
        label: 'OG Score™',
        data: [63, 65, 68, 70, 72, 74, 76],
        borderColor: '#0f6e56',
        backgroundColor: 'rgba(29, 158, 117, 0.1)',
        tension: 0.35,
        fill: true,
        pointBackgroundColor: '#0f6e56',
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };

  const ogScoreTrendOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => `OG Score: ${context.parsed.y} pts`
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 11, family: 'Inter' } }
      },
      y: {
        min: 50,
        max: 85,
        grid: { color: '#f1f5f9' },
        ticks: { font: { size: 10, family: 'Inter' } }
      }
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
      {/* 7-day Calls Handled Bar Chart */}
      <div className="earnings-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>7-Day Calls Handled</div>
            <div style={{ fontSize: '11.5px', color: '#64748b' }}>Daily call output vs target</div>
          </div>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f6e56' }}>15 today</div>
        </div>
        <div style={{ height: '140px' }}>
          <Bar data={callsBarData} options={callsBarOptions} />
        </div>
      </div>

      {/* 7-day OG Score Trend Line Chart */}
      <div className="earnings-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>OG Score™ Progression</div>
            <div style={{ fontSize: '11.5px', color: '#64748b' }}>Quality rating over past 7 days</div>
          </div>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#10b981' }}>▲13 pts</div>
        </div>
        <div style={{ height: '140px' }}>
          <Line data={ogScoreTrendData} options={ogScoreTrendOptions} />
        </div>
      </div>
    </div>
  );
};
