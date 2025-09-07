import { useNavigate, useRouteError } from 'react-router-dom';

function Error() {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      textAlign: 'center',
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)'
    }}>
      <h1 style={{ marginBottom: '20px' }}>Oops!</h1>
      <p style={{ marginBottom: '20px' }}>Sorry, an unexpected error has occurred.</p>
      <p style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>
        {(error as Error)?.message || 'Unknown error occurred'}
      </p>
      <button
        onClick={() => navigate('/')}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Go Back Home
      </button>
    </div>
  );
}

export default Error;