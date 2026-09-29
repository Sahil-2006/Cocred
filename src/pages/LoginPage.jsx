import { Link } from 'react-router-dom'

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-cocred-mint/10 to-white py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600">
            Login to access your credentials
          </p>
        </div>
        
        <div className="card">
          <p className="text-center text-gray-500">Login page - Coming in US2</p>
          <div className="mt-6 text-center">
            <Link to="/signup" className="font-medium text-cocred-mint hover:text-cocred-green">
              Don't have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
