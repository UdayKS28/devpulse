import { Box, Typography } from '@mui/material'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { getLanguageColor } from '../../utils/formatters'

export default function LanguageChart({ repos }) {
  // Count repos per language
  const langData = repos.reduce((acc, repo) => {
    if (!repo.language) return acc
    acc[repo.language] = (acc[repo.language] || 0) + 1
    return acc
  }, {})

  const data = Object.entries(langData)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6) // top 6 languages

  if (data.length === 0) return null

  return (
    <Box sx={{
      bgcolor: 'background.paper',
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 3,
      p: 2,
    }}>
      <Typography fontSize={13} fontWeight={600} color="text.secondary" mb={1}>
        Top languages
      </Typography>

      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={75}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry) => (
              <Cell
                key={entry.name}
                fill={getLanguageColor(entry.name)}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: '#161b22',
              border: '1px solid #30363d',
              borderRadius: 8,
              fontSize: 12,
            }}
            formatter={(value, name) => [value + ' repos', name]}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
        {data.map(entry => (
          <Box key={entry.name} display="flex" alignItems="center" gap={0.5}>
            <Box sx={{
              width: 8, height: 8, borderRadius: '50%',
              bgcolor: getLanguageColor(entry.name)
            }} />
            <Typography fontSize={11} color="text.secondary">
              {entry.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}