export default function Footer() {
  return (
    <footer style={{
      textAlign: 'center',
      padding: '2rem',
      color: 'var(--muted)',
      fontSize: '0.85rem',
      borderTop: '1px solid var(--border)',
    }}>
      <p>© {new Date().getFullYear()} Christian Shema. Built with React & Vite.</p>
    </footer>
  )
}
