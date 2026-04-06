import { Box, Container } from '@mui/material'
import Navbar from './Navbar'

export default function Layout({ children }) {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        {children}
      </Container>
    </Box>
  )
}
// ```

// ---

// Make sure these all look good and the app still runs with `npm run dev`. Once confirmed, here's what we build next:

// ## Profile page — what we're building

// When you search "torvalds" and hit enter, you'll land on `/user/torvalds` and see:
// ```
// ┌─────────────────────────────────────────────────┐
// │  [Avatar]  Linus Torvalds                        │
// │            @torvalds · Finland                   │
// │  Followers: 245k  Following: 0  Repos: 8        │
// └─────────────────────────────────────────────────┘

// ┌──────────────┐  ┌──────────────┐  ┌────────────┐
// │  Repos (30)  │  │  Top langs   │  │  Bio/links │
// │  filterable  │  │  pie chart   │  │            │
// └──────────────┘  └──────────────┘  └────────────┘ '''