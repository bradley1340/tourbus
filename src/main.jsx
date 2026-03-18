import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// Dynamic import to handle case-insensitive filename
const App = React.lazy(() => import('./app.jsx'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <React.Suspense fallback={null}>
      <App />
    </React.Suspense>
  </React.StrictMode>
)
