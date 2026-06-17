import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const colors = ['#1ee3cf', '#ffb84d', '#8f8bff']

export default function SurfaceExposureChart({ data }) {
  return (
    <section className="glass-panel rounded-3xl p-6 soft-ring">
      <div className="section-title">Attack Surface</div>
      <div className="mt-2 font-display text-2xl font-bold text-white">Identity exposure distribution</div>
      <div className="mt-6 h-72 w-full">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={72}
              outerRadius={100}
              paddingAngle={4}
            >
              {data.map((item, index) => (
                <Cell key={item.name} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: 'rgba(6, 8, 22, 0.92)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
              }}
            />
            <Legend wrapperStyle={{ color: 'rgba(205, 218, 255, 0.8)' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
