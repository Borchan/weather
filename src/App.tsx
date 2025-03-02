import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { Auth } from '@pages/Auth/Auth.tsx'
import { authStore } from '@stores/authStore.ts'
import { observer } from 'mobx-react-lite'
import { ProtectedRoute } from '@components/ProtectedRoute/ProtectedRoute.tsx'
import { Dashboard } from '@/pages/Dashboard/Dashboard.tsx'
import { ErrorPage } from '@/pages/ErrorPage'

const App: React.FC = observer(() => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/denied"
                    element={<ErrorPage text={'Access denied (403)'} />}
                />
                <Route
                    path="/"
                    element={
                        authStore.isAuthenticated ? (
                            <Navigate to="/dashboard" replace />
                        ) : (
                            <Auth />
                        )
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/auth"
                    element={
                        authStore.isAuthenticated ? (
                            <Navigate to="/dashboard" replace />
                        ) : (
                            <Auth />
                        )
                    }
                />
                <Route
                    path="*"
                    element={<ErrorPage text={'Page not found (404)'} />}
                />
            </Routes>
        </BrowserRouter>
    )
})

export default App
