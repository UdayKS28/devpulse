import {
  Box, Avatar, Typography, Chip, Stack, Divider
} from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PeopleIcon from '@mui/icons-material/People'
import FolderIcon from '@mui/icons-material/Folder'
import LinkIcon from '@mui/icons-material/Link'
import BusinessIcon from '@mui/icons-material/Business'

export default function ProfileCard({ user }) {
  const stats = [
    { icon: <PeopleIcon fontSize="small" />, label: 'Followers', value: user.followers },
    { icon: <PeopleIcon fontSize="small" />, label: 'Following', value: user.following },
    { icon: <FolderIcon fontSize="small" />, label: 'Repos', value: user.public_repos },
  ]

  return (
    <Box sx={{
      bgcolor: 'background.paper',
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 3,
      p: 3,
    }}>
      {/* Avatar + name */}
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <Avatar
          src={user.avatar_url}
          alt={user.login}
          sx={{ width: 80, height: 80, border: '2px solid', borderColor: 'divider' }}
        />
        <Box>
          <Typography variant="h6" fontWeight={700} color="text.primary">
            {user.name || user.login}
          </Typography>
          <Typography color="primary.main" fontSize={14}>
            @{user.login}
          </Typography>
          {user.bio && (
            <Typography color="text.secondary" fontSize={13} mt={0.5}>
              {user.bio}
            </Typography>
          )}
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Stats row */}
      <Stack direction="row" spacing={3} mb={2}>
        {stats.map(s => (
          <Box key={s.label} textAlign="center">
            <Typography fontWeight={700} fontSize={18} color="text.primary">
              {s.value?.toLocaleString()}
            </Typography>
            <Typography fontSize={12} color="text.secondary">{s.label}</Typography>
          </Box>
        ))}
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* Meta info */}
      <Stack spacing={1}>
        {user.company && (
          <Box display="flex" alignItems="center" gap={1}>
            <BusinessIcon fontSize="small" sx={{ color: 'text.secondary' }} />
            <Typography fontSize={13} color="text.secondary">{user.company}</Typography>
          </Box>
        )}
        {user.location && (
          <Box display="flex" alignItems="center" gap={1}>
            <LocationOnIcon fontSize="small" sx={{ color: 'text.secondary' }} />
            <Typography fontSize={13} color="text.secondary">{user.location}</Typography>
          </Box>
        )}
        {user.blog && (
          <Box display="flex" alignItems="center" gap={1}>
            <LinkIcon fontSize="small" sx={{ color: 'text.secondary' }} />
            <Typography
              fontSize={13}
              color="primary.main"
              component="a"
              href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
              target="_blank"
              rel="noreferrer"
              sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              {user.blog}
            </Typography>
          </Box>
        )}
      </Stack>
    </Box>
  )
}