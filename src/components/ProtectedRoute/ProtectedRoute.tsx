import { observer } from 'mobx-react-lite'
import { authStore } from '@stores/authStore'
import { Navigate } from 'react-router'
interface Props {
    children: React.ReactNode
}
export const ProtectedRoute: React.FC<Props> = observer(({ children }) => {
    if (!authStore.isAuthenticated) return <Navigate to="/denied" replace />
    return <>{children}</>
})
