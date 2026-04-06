import { Box, Typography, Chip, Stack } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import ForkRightIcon from '@mui/icons-material/ForkRight'
import { getLanguageColor } from '../../utils/formatters'

export default function RepoCard({ repo }) {
  return (
    <Box
      component="a"
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      sx={{
        display: 'block',
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        p: 2,
        textDecoration: 'none',
        transition: 'border-color 0.2s',
        '&:hover': { borderColor: 'primary.main' },
      }}
    >
      <Typography
        fontWeight={600}
        fontSize={14}
        color="primary.main"
        noWrap
        mb={0.5}
      >
        {repo.name}
      </Typography>

      <Typography
        fontSize={12}
        color="text.secondary"
        sx={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          minHeight: 36,
          mb: 1.5,
        }}
      >
        {repo.description || 'No description'}
      </Typography>

      <Stack direction="row" spacing={2} alignItems="center">
        {repo.language && (
          <Box display="flex" alignItems="center" gap={0.5}>
            <Box
              sx={{
                width: 10, height: 10, borderRadius: '50%',
                bgcolor: getLanguageColor(repo.language),
              }}
            />
            <Typography fontSize={11} color="text.secondary">{repo.language}</Typography>
          </Box>
        )}

        <Box display="flex" alignItems="center" gap={0.5}>
          <StarIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
          <Typography fontSize={11} color="text.secondary">
            {repo.stargazers_count.toLocaleString()}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={0.5}>
          <ForkRightIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
          <Typography fontSize={11} color="text.secondary">
            {repo.forks_count.toLocaleString()}
          </Typography>
        </Box>
      </Stack>
    </Box>
  )
}