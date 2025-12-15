import { useState } from 'react';
import { Edit2, Save, X } from 'lucide-react';
import { UserProfile } from '../App';

interface ProfilePageProps {
  profile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
}

export function ProfilePage({ profile, onUpdateProfile }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(profile);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-gray-900 mb-2">Profile</h2>
        <p className="text-gray-600">
          Kelola informasi profile Anda
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-gray-900">Informasi Personal</h3>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <X className="w-4 h-4" />
                Batal
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                Simpan
              </button>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm text-gray-700 mb-2">
              Nama Lengkap
            </label>
            {isEditing ? (
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none"
              />
            ) : (
              <div className="px-4 py-2 bg-gray-50 rounded-md text-gray-900">
                {profile.name}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none"
              />
            ) : (
              <div className="px-4 py-2 bg-gray-50 rounded-md text-gray-900">
                {profile.email}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm text-gray-700 mb-2">
              Nomor Telepon
            </label>
            {isEditing ? (
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none"
              />
            ) : (
              <div className="px-4 py-2 bg-gray-50 rounded-md text-gray-900">
                {profile.phone}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}