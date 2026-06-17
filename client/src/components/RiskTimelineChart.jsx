import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'

export default function RiskTimelineChart({ data }) {
  if (!data || data.length === 0) return null

  return (
    <section className="glass-panel rounded-3xl p-6 soft-ring">
      <div className="section-title">90-Day Risk Timeline</div>
      <div className="mt-2 font-display text-2xl font-bold text-white">Simulated risk drift projections</div>
      <p className="mt-2 text-xs text-cyber-mist leading-relaxed">
        This projection displays how risk ratings escalate over a 90-day window under typical fraud scenarios if security is not updated.
      </p>

      <div className="mt-6 h-72 w-full">
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff5d73" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#ff5d73" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 162, 216, 0.08)" />
            <XAxis
              dataKey="day"
              tickFormatter={(day) => `Day ${day}`}
              tick={{ fill: 'rgba(205, 218, 255, 0.8)', fontSize: 11 }}
            />
            <YAxis
              domain={[0, 150]}
              tick={{ fill: 'rgba(205, 218, 255, 0.8)', fontSize: 11 }}
            />
            <Tooltip
              contentStyle={{
                background: 'rgba(6, 8, 22, 0.92)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
              }}
              formatter={(value, name, props) => {
                const status = props.payload.status
                return [`${value} pts (${status})`, 'Likelihood rating']
              }}
            />
            <Area
              type="monotone"
              dataKey="riskScore"
              stroke="#ff5d73"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#riskGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
