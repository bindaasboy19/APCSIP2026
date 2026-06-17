import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const barColors = ['#1ee3cf', '#ff5d73', '#ffb84d', '#2be38c']

export default function RiskBreakdownChart({ data }) {
  return (
    <section className="glass-panel rounded-3xl p-6 soft-ring">
      <div className="section-title">Risk Breakdown</div>
      <div className="mt-2 font-display text-2xl font-bold text-white">How the score was calculated</div>
      <div className="mt-6 h-72 w-full">
        <ResponsiveContainer>
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 10, left: 30, bottom: 0 }}>
            <CartesianGrid stroke="rgba(139, 162, 216, 0.12)" horizontal={false} />
            <XAxis type="number" tick={{ fill: 'rgba(205, 218, 255, 0.8)', fontSize: 12 }} />
            <YAxis
              type="category"
              dataKey="label"
              width={150}
              tick={{ fill: 'rgba(205, 218, 255, 0.8)', fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: 'rgba(255, 255, 255, 0.03)' }}
              contentStyle={{
                background: 'rgba(6, 8, 22, 0.92)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
              }}
              formatter={(value) => [`${value} pts`, 'Contribution']}
            />
            <Bar dataKey="points" radius={[0, 12, 12, 0]}>
              {data.map((item, index) => (
                <Cell key={item.key} fill={barColors[index % barColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
