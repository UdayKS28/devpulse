export function formatNumber(num) {
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
  return num?.toString() ?? '0'
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  })
}

export function getLanguageColor(language) {
  const colors = {
    JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
    Java: '#b07219', CSS: '#563d7c', HTML: '#e34c26',
    Go: '#00ADD8', Rust: '#dea584', Ruby: '#701516', C: '#555555',
    'C++': '#f34b7d', 'C#': '#178600', Shell: '#89e051',
  }
  return colors[language] || '#8b949e'
}