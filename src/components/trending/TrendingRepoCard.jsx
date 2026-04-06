import { Box, Typography, Chip, Stack } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import ForkRightIcon from '@mui/icons-material/ForkRight'
import BugReportIcon from '@mui/icons-material/BugReport'
import { getLanguageColor } from '../../utils/formatters'

export default function TrendingRepoCard({ repo, rank }) {
  return (
    <Box
      component="a"
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      sx={{
        display: 'flex',
        gap: 2,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        p: 2.5,
        textDecoration: 'none',
        transition: 'border-color 0.2s, transform 0.15s',
        '&:hover': {
          borderColor: 'primary.main',
          transform: 'translateY(-1px)',
        },
      }}
    >
      {/* Rank number */}
      <Typography
        sx={{
          fontSize: 20,
          fontWeight: 700,
          color: 'text.secondary',
          minWidth: 36,
          opacity: 0.4,
          lineHeight: 1,
          pt: 0.3,
        }}
      >
        #{rank}
      </Typography>

      {/* Main content */}
      <Box flex={1} minWidth={0}>
        {/* Repo name + owner */}
        <Box display="flex" alignItems="center" gap={1} mb={0.5} flexWrap="wrap">
          <Typography
            fontSize={15}
            fontWeight={600}
            color="primary.main"
            noWrap
          >
            {repo.full_name}
          </Typography>
          {repo.topics?.slice(0, 2).map(topic => (
            <Chip
              key={topic}
              label={topic}
              size="small"
              sx={{
                fontSize: 10,
                height: 18,
                bgcolor: 'rgba(88,166,255,0.1)',
                color: 'primary.main',
                border: '1px solid rgba(88,166,255,0.2)',
              }}
            />
          ))}
        </Box>

        {/* Description */}
        <Typography
          fontSize={13}
          color="text.secondary"
          mb={1.5}
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {repo.description || 'No description provided'}
        </Typography>

        {/* Stats row */}
        <Stack direction="row" spacing={2.5} alignItems="center" flexWrap="wrap">
          {repo.language && (
            <Box display="flex" alignItems="center" gap={0.5}>
              <Box sx={{
                width: 10, height: 10, borderRadius: '50%',
                bgcolor: getLanguageColor(repo.language),
                flexShrink: 0,
              }} />
              <Typography fontSize={12} color="text.secondary">
                {repo.language}
              </Typography>
            </Box>
          )}

          <Box display="flex" alignItems="center" gap={0.5}>
            <StarIcon sx={{ fontSize: 14, color: '#e3b341' }} />
            <Typography fontSize={12} color="text.secondary">
              {repo.stargazers_count.toLocaleString()}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={0.5}>
            <ForkRightIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
            <Typography fontSize={12} color="text.secondary">
              {repo.forks_count.toLocaleString()}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={0.5}>
            <BugReportIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
            <Typography fontSize={12} color="text.secondary">
              {repo.open_issues_count.toLocaleString()} issues
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Star count — big display on right */}
      <Box
        textAlign="center"
        sx={{
          display: { xs: 'none', sm: 'flex' },
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 70,
          bgcolor: 'rgba(227,179,65,0.07)',
          border: '1px solid rgba(227,179,65,0.2)',
          borderRadius: 2,
          px: 1.5,
          py: 1,
        }}
      >
        <StarIcon sx={{ fontSize: 16, color: '#e3b341', mb: 0.3 }} />
        <Typography fontSize={13} fontWeight={700} color="#e3b341">
          {repo.stargazers_count >= 1000
            ? (repo.stargazers_count / 1000).toFixed(1) + 'k'
            : repo.stargazers_count}
        </Typography>
      </Box>
    </Box>
  )
}