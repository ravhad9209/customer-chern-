import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js'
import { Bar, Doughnut, Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const CHART_FONT = 'system-ui, -apple-system, sans-serif'
const GRID_COLOR = '#2d323c'
const TICK_COLOR = '#9ca3af'
const TITLE_COLOR = '#f3f4f6'
const PRIMARY = '#3b82f6'
const GRAY_300 = '#d1d5db'
const GRAY_400 = '#9ca3af'
const GRAY_500 = '#6b7280'
const GREEN_MUTED = '#22c55e'

const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        font: { family: CHART_FONT, size: 12 },
        color: TICK_COLOR,
        usePointStyle: true,
        padding: 16,
      },
    },
    tooltip: {
      enabled: true,
      titleFont: { family: CHART_FONT, size: 12 },
      bodyFont: { family: CHART_FONT, size: 12 },
    },
  },
}

const CHURN_TREND_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
const CHURN_TREND_VALUES = [4.2, 4.5, 4.1, 4.8, 4.3, 4.6]

export function ChurnRateLineChart() {
  const data = {
    labels: CHURN_TREND_LABELS,
    datasets: [
      {
        label: 'Churn Rate (%)',
        data: CHURN_TREND_VALUES,
        borderColor: PRIMARY,
        backgroundColor: 'transparent',
        borderWidth: 2,
        fill: false,
        pointRadius: 3,
        pointBackgroundColor: PRIMARY,
      },
    ],
  }

  const options = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: 'Churn Rate Trend',
        font: { family: CHART_FONT, size: 14, weight: '600' },
        color: TITLE_COLOR,
        padding: { bottom: 12 },
      },
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: true, color: GRID_COLOR, lineWidth: 1 },
        ticks: {
          font: { family: CHART_FONT, size: 11 },
          color: TICK_COLOR,
        },
        title: {
          display: true,
          text: 'Month',
          font: { family: CHART_FONT, size: 11 },
          color: TICK_COLOR,
        },
      },
      y: {
        grid: { display: true, color: GRID_COLOR, lineWidth: 1 },
        ticks: {
          font: { family: CHART_FONT, size: 11 },
          color: TICK_COLOR,
        },
        title: {
          display: true,
          text: 'Churn %',
          font: { family: CHART_FONT, size: 11 },
          color: TICK_COLOR,
        },
      },
    },
  }

  return (
    <div className="h-[280px] w-full">
      <Line data={data} options={options} />
    </div>
  )
}

const SEGMENT_LABELS = ['Basic', 'Premium', 'Enterprise']
const SEGMENT_VALUES = [5.2, 3.1, 1.8]

export function ChurnBySegmentBarChart() {
  const data = {
    labels: SEGMENT_LABELS,
    datasets: [
      {
        label: 'Churn %',
        data: SEGMENT_VALUES,
        backgroundColor: [PRIMARY, GRAY_400, GRAY_500],
        borderColor: [PRIMARY, GRAY_400, GRAY_500],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: 'Churn by Customer Segment',
        font: { family: CHART_FONT, size: 14, weight: '600' },
        color: TITLE_COLOR,
        padding: { bottom: 12 },
      },
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          font: { family: CHART_FONT, size: 11 },
          color: TICK_COLOR,
        },
        title: {
          display: true,
          text: 'Segment',
          font: { family: CHART_FONT, size: 11 },
          color: TICK_COLOR,
        },
      },
      y: {
        grid: { display: true, color: GRID_COLOR, lineWidth: 1 },
        ticks: {
          font: { family: CHART_FONT, size: 11 },
          color: TICK_COLOR,
        },
        title: {
          display: true,
          text: 'Churn %',
          font: { family: CHART_FONT, size: 11 },
          color: TICK_COLOR,
        },
      },
    },
  }

  return (
    <div className="h-[280px] w-full">
      <Bar data={data} options={options} />
    </div>
  )
}

const RISK_LABELS = ['High', 'Medium', 'Low']
const RISK_VALUES = [12, 28, 60]
const RISK_COLORS = [PRIMARY, GRAY_400, GRAY_300]

export function RiskDistributionDoughnutChart() {
  const data = {
    labels: RISK_LABELS,
    datasets: [
      {
        data: RISK_VALUES,
        backgroundColor: RISK_COLORS,
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  }

  const options = {
    ...commonOptions,
    cutout: '60%',
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: 'Risk Distribution',
        font: { family: CHART_FONT, size: 14, weight: '600' },
        color: TITLE_COLOR,
        padding: { bottom: 12 },
      },
      legend: {
        ...commonOptions.plugins.legend,
        position: 'bottom',
      },
      tooltip: {
        ...commonOptions.plugins.tooltip,
        callbacks: {
          label: (context) =>
            `${context.label}: ${context.parsed}%`,
        },
      },
    },
  }

  return (
    <div className="h-[280px] w-full">
      <Doughnut data={data} options={options} />
    </div>
  )
}

const RETENTION_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
const RETENTION_VALUES = [95.2, 95.1, 95.5, 94.8, 95.2, 95.4]

export function RetentionTrendLineChart() {
  const data = {
    labels: RETENTION_LABELS,
    datasets: [
      {
        label: 'Retention %',
        data: RETENTION_VALUES,
        borderColor: GREEN_MUTED,
        backgroundColor: 'transparent',
        borderWidth: 2,
        fill: false,
        pointRadius: 3,
        pointBackgroundColor: GREEN_MUTED,
      },
    ],
  }
  const options = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: 'Retention Rate Trend',
        font: { family: CHART_FONT, size: 14, weight: '600' },
        color: TITLE_COLOR,
        padding: { bottom: 12 },
      },
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: true, color: GRID_COLOR, lineWidth: 1 },
        ticks: { font: { family: CHART_FONT, size: 11 }, color: TICK_COLOR },
        title: { display: true, text: 'Month', font: { family: CHART_FONT, size: 11 }, color: TICK_COLOR },
      },
      y: {
        grid: { display: true, color: GRID_COLOR, lineWidth: 1 },
        ticks: { font: { family: CHART_FONT, size: 11 }, color: TICK_COLOR },
        title: { display: true, text: 'Retention %', font: { family: CHART_FONT, size: 11 }, color: TICK_COLOR },
      },
    },
  }
  return (
    <div className="h-[280px] w-full">
      <Line data={data} options={options} />
    </div>
  )
}

const AT_RISK_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
const AT_RISK_VALUES = [312, 340, 328, 365, 358, 384]

export function AtRiskTrendLineChart() {
  const data = {
    labels: AT_RISK_LABELS,
    datasets: [
      {
        label: 'At-risk count',
        data: AT_RISK_VALUES,
        borderColor: PRIMARY,
        backgroundColor: 'transparent',
        borderWidth: 2,
        fill: false,
        pointRadius: 3,
        pointBackgroundColor: PRIMARY,
      },
    ],
  }
  const options = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: 'At-Risk Customers Over Time',
        font: { family: CHART_FONT, size: 14, weight: '600' },
        color: TITLE_COLOR,
        padding: { bottom: 12 },
      },
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: true, color: GRID_COLOR, lineWidth: 1 },
        ticks: { font: { family: CHART_FONT, size: 11 }, color: TICK_COLOR },
        title: { display: true, text: 'Month', font: { family: CHART_FONT, size: 11 }, color: TICK_COLOR },
      },
      y: {
        grid: { display: true, color: GRID_COLOR, lineWidth: 1 },
        ticks: { font: { family: CHART_FONT, size: 11 }, color: TICK_COLOR },
        title: { display: true, text: 'Count', font: { family: CHART_FONT, size: 11 }, color: TICK_COLOR },
      },
    },
  }
  return (
    <div className="h-[280px] w-full">
      <Line data={data} options={options} />
    </div>
  )
}

const STACKED_LABELS = ['Basic', 'Premium', 'Enterprise']
const CHURNED_VALUES = [520, 310, 90]
const RETAINED_VALUES = [9480, 1690, 857]

export function ChurnVsRetainedStackedBarChart() {
  const data = {
    labels: STACKED_LABELS,
    datasets: [
      { label: 'Churned', data: CHURNED_VALUES, backgroundColor: GRAY_500, borderColor: GRAY_500, borderWidth: 1 },
      { label: 'Retained', data: RETAINED_VALUES, backgroundColor: GREEN_MUTED, borderColor: GREEN_MUTED, borderWidth: 1 },
    ],
  }
  const options = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: 'Churned vs Retained by Segment',
        font: { family: CHART_FONT, size: 14, weight: '600' },
        color: TITLE_COLOR,
        padding: { bottom: 12 },
      },
      legend: { position: 'bottom' },
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        ticks: { font: { family: CHART_FONT, size: 11 }, color: TICK_COLOR },
        title: { display: true, text: 'Segment', font: { family: CHART_FONT, size: 11 }, color: TICK_COLOR },
      },
      y: {
        stacked: true,
        grid: { display: true, color: GRID_COLOR, lineWidth: 1 },
        ticks: { font: { family: CHART_FONT, size: 11 }, color: TICK_COLOR },
        title: { display: true, text: 'Customers', font: { family: CHART_FONT, size: 11 }, color: TICK_COLOR },
      },
    },
  }
  return (
    <div className="h-[280px] w-full">
      <Bar data={data} options={options} />
    </div>
  )
}

const FEATURE_NAMES = ['Tenure (months)', 'Support tickets', 'Login frequency', 'Contract value', 'NPS score']
const FEATURE_IMPORTANCE = [0.28, 0.22, 0.18, 0.16, 0.12]

export function FeatureImportanceBarChart() {
  const data = {
    labels: FEATURE_NAMES,
    datasets: [
      {
        label: 'Importance',
        data: FEATURE_IMPORTANCE,
        backgroundColor: PRIMARY,
        borderColor: PRIMARY,
        borderWidth: 1,
      },
    ],
  }
  const options = {
    ...commonOptions,
    indexAxis: 'y',
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: 'Churn Model – Feature Importance',
        font: { family: CHART_FONT, size: 14, weight: '600' },
        color: TITLE_COLOR,
        padding: { bottom: 12 },
      },
      legend: { display: false },
    },
    scales: {
      x: {
        max: 0.35,
        grid: { display: true, color: GRID_COLOR, lineWidth: 1 },
        ticks: { font: { family: CHART_FONT, size: 11 }, color: TICK_COLOR },
        title: { display: true, text: 'Importance', font: { family: CHART_FONT, size: 11 }, color: TICK_COLOR },
      },
      y: {
        grid: { display: false },
        ticks: { font: { family: CHART_FONT, size: 11 }, color: TICK_COLOR },
      },
    },
  }
  return (
    <div className="h-[220px] w-full">
      <Bar data={data} options={options} />
    </div>
  )
}

const SCORE_BUCKETS = ['0–20%', '20–40%', '40–60%', '60–80%', '80–100%']
const SCORE_COUNTS = [4200, 3100, 2800, 1800, 947]

export function ScoreDistributionChart() {
  const data = {
    labels: SCORE_BUCKETS,
    datasets: [
      {
        label: 'Customers',
        data: SCORE_COUNTS,
        backgroundColor: [GRAY_300, GRAY_400, PRIMARY, GRAY_400, GRAY_500],
        borderColor: [GRAY_300, GRAY_400, PRIMARY, GRAY_400, GRAY_500],
        borderWidth: 1,
      },
    ],
  }
  const options = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: 'Churn Score Distribution',
        font: { family: CHART_FONT, size: 14, weight: '600' },
        color: TITLE_COLOR,
        padding: { bottom: 12 },
      },
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { family: CHART_FONT, size: 11 }, color: TICK_COLOR },
        title: { display: true, text: 'Churn probability', font: { family: CHART_FONT, size: 11 }, color: TICK_COLOR },
      },
      y: {
        grid: { display: true, color: GRID_COLOR, lineWidth: 1 },
        ticks: { font: { family: CHART_FONT, size: 11 }, color: TICK_COLOR },
        title: { display: true, text: 'Count', font: { family: CHART_FONT, size: 11 }, color: TICK_COLOR },
      },
    },
  }
  return (
    <div className="h-[260px] w-full">
      <Bar data={data} options={options} />
    </div>
  )
}

const SEGMENT_COUNT_LABELS = ['Basic', 'Premium', 'Enterprise']
const SEGMENT_COUNTS = [6200, 2100, 2547]

export function CustomerCountBySegmentChart() {
  const data = {
    labels: SEGMENT_COUNT_LABELS,
    datasets: [
      {
        label: 'Customers',
        data: SEGMENT_COUNTS,
        backgroundColor: [PRIMARY, GRAY_400, GRAY_500],
        borderColor: [PRIMARY, GRAY_400, GRAY_500],
        borderWidth: 1,
      },
    ],
  }
  const options = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: 'Customers by Segment',
        font: { family: CHART_FONT, size: 14, weight: '600' },
        color: TITLE_COLOR,
        padding: { bottom: 12 },
      },
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { family: CHART_FONT, size: 11 }, color: TICK_COLOR },
      },
      y: {
        grid: { display: true, color: GRID_COLOR, lineWidth: 1 },
        ticks: { font: { family: CHART_FONT, size: 11 }, color: TICK_COLOR },
      },
    },
  }
  return (
    <div className="h-[220px] w-full">
      <Bar data={data} options={options} />
    </div>
  )
}
