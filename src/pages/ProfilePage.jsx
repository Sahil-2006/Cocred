import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function ProfilePage() {
  const { profile, user, updateProfile, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    register_number: '',
    department: '',
    programme: '',
    year_or_semester: '',
    phone_number: '',
  })
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  // Load profile data when available
  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        email: user?.email || '',
        register_number: profile.register_number || '',
        department: profile.department || '',
        programme: profile.programme || '',
        year_or_semester: profile.year_or_semester || '',
        phone_number: profile.phone_number || '',
      })
    }
  }, [profile, user])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full name is required'
    }

    if (!formData.register_number.trim()) {
      newErrors.register_number = 'Register number is required'
    }

    if (formData.phone_number && !/^\+?[\d\s\-()]+$/.test(formData.phone_number)) {
      newErrors.phone_number = 'Please enter a valid phone number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
    setMessage({ type: '', text: '' })
  }

  const handleCancel = () => {
    // Reset form data to original profile data
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        email: user?.email || '',
        register_number: profile.register_number || '',
        department: profile.department || '',
        programme: profile.programme || '',
        year_or_semester: profile.year_or_semester || '',
        phone_number: profile.phone_number || '',
      })
    }
    setIsEditing(false)
    setErrors({})
    setMessage({ type: '', text: '' })
  }

  const handleSave = async () => {
    if (!validateForm()) {
      return
    }

    setSaving(true)
    setMessage({ type: '', text: '' })

    try {
      // Don't send email (it's read-only and managed by Supabase auth)
      const { email, ...updateData } = formData
      
      const { error } = await updateProfile(updateData)

      if (error) {
        setMessage({ 
          type: 'error', 
          text: error.message || 'Failed to update profile. Please try again.' 
        })
      } else {
        setMessage({ 
          type: 'success', 
          text: 'Profile updated successfully!' 
        })
        setIsEditing(false)
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'An unexpected error occurred. Please try again.' 
      })
    } finally {
      setSaving(false)
    }
  }

  if (authLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cocred-mint"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your personal and academic information
        </p>
      </div>

      {/* Message Alert */}
      {message.text && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          <div className="flex">
            <div className="flex-shrink-0">
              {message.type === 'success' ? (
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{message.text}</p>
            </div>
          </div>
        </div>
      )}

      {/* Profile Card */}
      <div className="card">
        {/* Profile Header with Avatar */}
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            {/* Avatar Placeholder */}
            <div className="w-20 h-20 bg-cocred-mint/20 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-cocred-mint">
                {formData.full_name ? formData.full_name.charAt(0).toUpperCase() : 'S'}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{formData.full_name || 'Student'}</h2>
              <p className="text-sm text-gray-500">{formData.register_number || 'No register number'}</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="btn-primary"
            >
              <svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Profile
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleCancel}
                className="btn-secondary"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={saving}
              >
                {saving ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : (
                  <>
                    <svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Changes
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Profile Form */}
        <div className="space-y-6">
          {/* Personal Information Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      className={`input-field ${errors.full_name ? 'border-red-500' : ''}`}
                      placeholder="Enter your full name"
                    />
                    {errors.full_name && (
                      <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>
                    )}
                  </>
                ) : (
                  <p className="text-gray-900 py-2">{formData.full_name || '-'}</p>
                )}
              </div>

              {/* Email (Read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <p className="text-gray-500 py-2">{formData.email || '-'}</p>
                  {isEditing && (
                    <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                  )}
                </div>
              </div>

              {/* Register Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Register Number / Student ID *
                </label>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="register_number"
                      value={formData.register_number}
                      onChange={handleChange}
                      className={`input-field ${errors.register_number ? 'border-red-500' : ''}`}
                      placeholder="Enter your register number"
                    />
                    {errors.register_number && (
                      <p className="mt-1 text-sm text-red-600">{errors.register_number}</p>
                    )}
                  </>
                ) : (
                  <p className="text-gray-900 py-2">{formData.register_number || '-'}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                {isEditing ? (
                  <>
                    <input
                      type="tel"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      className={`input-field ${errors.phone_number ? 'border-red-500' : ''}`}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone_number && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone_number}</p>
                    )}
                  </>
                ) : (
                  <p className="text-gray-900 py-2">{formData.phone_number || '-'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Academic Information Section */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="e.g., Computer Science"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{formData.department || '-'}</p>
                )}
              </div>

              {/* Programme */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Programme / Degree
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="programme"
                    value={formData.programme}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="e.g., B.Tech, M.Sc"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{formData.programme || '-'}</p>
                )}
              </div>

              {/* Year/Semester */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year / Semester
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="year_or_semester"
                    value={formData.year_or_semester}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="e.g., 3rd Year, Semester 5"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{formData.year_or_semester || '-'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Account Information */}
          {profile && (
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Account Created
                  </label>
                  <p className="text-gray-900">
                    {new Date(profile.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Last Updated
                  </label>
                  <p className="text-gray-900">
                    {new Date(profile.updated_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
