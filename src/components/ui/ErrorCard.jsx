import { Box, Typography, Button } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

export default function ErrorCard({ message, onRetry }) {
  return (
    <Box sx={{
      background: 'rgba(248,81,73,0.1)',
      border: '1px solid rgba(248,81,73,0.3)',
      borderRadius: 2,
      p: 3,
      textAlign: 'center',
    }}>
      <ErrorOutlineIcon sx={{ color: 'error.main', fontSize: 36, mb: 1 }} />
      <Typography color="error.main" mb={2}>{message}</Typography>
      {onRetry && (
        <Button variant="outlined" color="error" size="small" onClick={onRetry}>
          Try again
        </Button>
      )}
    </Box>
  )
}