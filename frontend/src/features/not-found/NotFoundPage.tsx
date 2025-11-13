import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      gap: '1rem'
    }}>
      <h1 style={{ fontSize: '4rem', margin: 0 }}>404</h1>
      <h2 style={{ fontSize: '2rem', margin: 0 }}>Страница не найдена</h2>
      <p style={{ fontSize: '1.2rem', color: '#666' }}>
        Извините, запрашиваемая страница не существует.
      </p>
      <Link 
        to="/list" 
        style={{
          marginTop: '1rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          fontSize: '1rem'
        }}
      >
        Вернуться на главную
      </Link>
    </div>
  )
}