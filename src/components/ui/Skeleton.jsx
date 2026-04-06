import { Skeleton as MuiSkeleton } from '@mui/material'

export default function Skeleton({ width = '100%', height = 16 }) {
  return (
    <MuiSkeleton
      variant="rectangular"
      width={width}
      height={height}
      sx={{ borderRadius: 1, bgcolor: 'rgba(255,255,255,0.06)' }}
    />
  )
}