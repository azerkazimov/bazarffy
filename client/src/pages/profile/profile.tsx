import useAuthStore from "@/store/auth.store";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { profileSchema, type ProfileSchema } from "./profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout, updateProfile, deleteProfile } = useAuthStore();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { register, handleSubmit } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = async (data: ProfileSchema) => {
    setError("");
    setLoading(true);

    try {
      await updateProfile(data);
      setIsEditing(false);
    } catch (err: unknown) {
      const errorMessage =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "Update failed"
          : "Update failed";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProfile = async () => {
    setLoading(true);
    try {
      await deleteProfile();
      navigate('/');
    } catch (err: unknown) {
      const errorMessage =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "Deletion failed"
          : "Deletion failed";
      setError(errorMessage);
      setShowDeleteConfirm(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="max-w-5xl mx-auto p-8 py-16">
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden mb-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-indigo-600/20 p-8 border-b border-white/10">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div className="flex items-center gap-6">
              <div>
                {user?.avatarUrl ? (
                  <img src={user.avatarUrl} alt="Avatar" className="w-24 h-24 rounded-2xl object-cover shadow-lg" />
                ) : (
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white shadow-lg shadow-indigo-500/30">
                    {user?.username?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  {user?.username}
                </h2>
                <p className="text-white/70 flex items-center gap-2 mb-2">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  {user?.email}
                </p>
                {user?.role && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {user.role.replace('_', ' ').toUpperCase()}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              {!isEditing ? (
                <>
                  <button 
                    onClick={() => setIsEditing(true)} 
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-indigo-500/30"
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Profile
                  </button>
                  <button 
                    onClick={handleLogout} 
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/20 rounded-xl font-semibold hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setIsEditing(false)} 
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-600/50 border border-gray-500/30 text-white rounded-xl font-semibold hover:bg-gray-600/70 transition-all duration-300"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="mx-8 mt-6 bg-red-500/10 text-red-400 px-4 py-3 rounded-xl border border-red-500/20 flex items-center gap-2">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Content Section */}
        <div className="p-8">
          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="bio" className="block font-semibold text-white/90 text-sm">Bio</label>
                <textarea
                  id="bio"
                  {...register("bio")}
                  rows={4}
                  disabled={loading}
                  placeholder="Tell us about yourself..."
                  className="w-full px-4 py-3 border border-white/20 rounded-xl bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-vertical"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="twitter" className="block font-semibold text-white/90 text-sm flex items-center gap-2">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                    </svg>
                    Twitter
                  </label>
                  <input
                    type="url"
                    id="twitter"
                    {...register("sosialLinks.twitter")}
                    disabled={loading}
                    placeholder="https://twitter.com/username"
                    className="w-full px-4 py-3 border border-white/20 rounded-xl bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="facebook" className="block font-semibold text-white/90 text-sm flex items-center gap-2">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                    Facebook
                  </label>
                  <input
                    type="url"
                    id="facebook"
                    {...register("sosialLinks.facebook")}
                    disabled={loading}
                    placeholder="https://facebook.com/username"
                    className="w-full px-4 py-3 border border-white/20 rounded-xl bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="instagram" className="block font-semibold text-white/90 text-sm flex items-center gap-2">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                    Instagram
                  </label>
                  <input
                    type="url"
                    id="instagram"
                    {...register("sosialLinks.instagram")}
                    disabled={loading}
                    placeholder="https://instagram.com/username"
                    className="w-full px-4 py-3 border border-white/20 rounded-xl bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={loading} 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-500 hover:to-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-green-500/30"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Bio Section */}
              {user?.bio && (
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h3 className="text-sm font-semibold text-white/60 mb-2 uppercase tracking-wider">About</h3>
                  <p className="text-white/90 leading-relaxed">{user.bio}</p>
                </div>
              )}

              {/* Social Links */}
              <div>
                <h3 className="text-sm font-semibold text-white/60 mb-3 uppercase tracking-wider">Social Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {user?.sosialLinks?.twitter && (
                    <a
                      href={user.sosialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 hover:bg-sky-500/20 hover:border-sky-500/50 transition-all"
                    >
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                      </svg>
                      <span className="font-semibold">Twitter</span>
                    </a>
                  )}
                  {user?.sosialLinks?.facebook && (
                    <a
                      href={user.sosialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all"
                    >
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                      </svg>
                      <span className="font-semibold">Facebook</span>
                    </a>
                  )}
                  {user?.sosialLinks?.instagram && (
                    <a
                      href={user.sosialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-400 hover:bg-pink-500/20 hover:border-pink-500/50 transition-all"
                    >
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                      <span className="font-semibold">Instagram</span>
                    </a>
                  )}
                </div>
                {!user?.sosialLinks?.twitter && !user?.sosialLinks?.facebook && !user?.sosialLinks?.instagram && (
                  <p className="text-white/40 text-sm italic">No social links added yet</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-500/5 backdrop-blur-xl rounded-2xl border border-red-500/20 p-8 shadow-2xl">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-red-400">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-red-400 text-xl font-bold mb-2">Danger Zone</h4>
            <p className="text-white/70 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600/20 border border-red-500/30 text-red-400 rounded-xl font-semibold hover:bg-red-600/30 hover:border-red-500/50 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
              disabled={loading}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full border border-red-500/30 shadow-2xl shadow-red-500/20 animate-in">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-red-500/20 rounded-xl flex items-center justify-center">
                <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-red-400">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-red-400 mb-1">Delete Account</h3>
                <p className="text-white/60 text-sm">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-white/80 mb-8 leading-relaxed">
              Are you absolutely sure you want to delete your account? All of your data will be permanently removed from our servers forever. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDeleteProfile}
                disabled={loading}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-red-500/30"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Deleting...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Yes, Delete Forever
                  </>
                )}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={loading}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 hover:border-white/30 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
