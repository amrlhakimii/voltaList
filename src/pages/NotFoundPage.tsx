import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <p className="text-5xl mb-4">⚽</p>
      <h1 className="text-xl font-bold text-[#F6E9E9] mb-2">Page not found</h1>
      <p className="text-[#F6E9E9]/40 text-sm mb-6">
        This session may have been removed or the link is invalid.
      </p>
      <Link to="/">
        <Button variant="ghost">Go home</Button>
      </Link>
    </div>
  )
}
