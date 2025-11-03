import useAuthStore from "@/store/auth.store";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { profileSchema, type ProfileSchema } from "./profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Mail, Edit2, LogOut, Check, Loader2, AlertTriangle, Trash2, Twitter, Facebook, Instagram } from "lucide-react";

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
    <div className="max-w-5xl mx-auto p-8 py-16 bg-white min-h-screen">
      <div className="bg-white border border-gray-200 shadow-sm overflow-hidden mb-8">
        {/* Header Section */}
        <div className="bg-gray-50 p-8 border-b border-gray-200">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div className="flex items-center gap-6">
              <div>
                {user?.avatarUrl ? (
                  <img src={user.avatarUrl} alt="Avatar" className="w-24 h-24 object-cover shadow-md" />
                ) : (
                  <div className="w-24 h-24 bg-linear-to-br from-gray-700 to-gray-900 flex items-center justify-center text-4xl font-bold text-white shadow-md">
                    {user?.username?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2 text-gray-900">
                  {user?.username}
                </h2>
                <p className="text-gray-600 flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4" />
                  {user?.email}
                </p>
                {user?.role && (
                  <span className="inline-flex items-center px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
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
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white font-semibold hover:bg-gray-700 transition-all duration-200"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </button>
                  <button 
                    onClick={handleLogout} 
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setIsEditing(false)} 
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-200 border border-gray-300 text-gray-700 font-semibold hover:bg-gray-300 transition-all duration-200"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="mx-8 mt-6 bg-red-50 text-red-600 px-4 py-3 border border-red-200 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {/* Content Section */}
        <div className="p-8">
          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="bio" className="block font-semibold text-gray-900 text-sm">Bio</label>
                <textarea
                  id="bio"
                  {...register("bio")}
                  rows={4}
                  disabled={loading}
                  placeholder="Tell us about yourself..."
                  className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition-all resize-vertical"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="twitter" className="flex items-center gap-2 font-semibold text-gray-900 text-sm">
                    <Twitter className="w-4 h-4" />
                    Twitter
                  </label>
                  <input
                    type="url"
                    id="twitter"
                    {...register("sosialLinks.twitter")}
                    disabled={loading}
                    placeholder="https://twitter.com/username"
                    className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="facebook" className="flex items-center gap-2 font-semibold text-gray-900 text-sm">
                    <Facebook className="w-4 h-4" />
                    Facebook
                  </label>
                  <input
                    type="url"
                    id="facebook"
                    {...register("sosialLinks.facebook")}
                    disabled={loading}
                    placeholder="https://facebook.com/username"
                    className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition-all"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="instagram" className="flex items-center gap-2 font-semibold text-gray-900 text-sm">
                    <Instagram className="w-4 h-4" />
                    Instagram
                  </label>
                  <input
                    type="url"
                    id="instagram"
                    {...register("sosialLinks.instagram")}
                    disabled={loading}
                    placeholder="https://instagram.com/username"
                    className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition-all"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={loading} 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
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
                <div className="bg-gray-50 p-6 border border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wider">About</h3>
                  <p className="text-gray-900 leading-relaxed">{user.bio}</p>
                </div>
              )}

              {/* Social Links */}
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wider">Social Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {user?.sosialLinks?.twitter && (
                    <a
                      href={user.sosialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 bg-sky-50 border border-sky-200 text-sky-700 hover:bg-sky-100 hover:border-sky-300 transition-all"
                    >
                      <Twitter className="w-5 h-5" />
                      <span className="font-semibold">Twitter</span>
                    </a>
                  )}
                  {user?.sosialLinks?.facebook && (
                    <a
                      href={user.sosialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300 transition-all"
                    >
                      <Facebook className="w-5 h-5" />
                      <span className="font-semibold">Facebook</span>
                    </a>
                  )}
                  {user?.sosialLinks?.instagram && (
                    <a
                      href={user.sosialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 bg-pink-50 border border-pink-200 text-pink-700 hover:bg-pink-100 hover:border-pink-300 transition-all"
                    >
                      <Instagram className="w-5 h-5" />
                      <span className="font-semibold">Instagram</span>
                    </a>
                  )}
                </div>
                {!user?.sosialLinks?.twitter && !user?.sosialLinks?.facebook && !user?.sosialLinks?.instagram && (
                  <p className="text-gray-400 text-sm italic">No social links added yet</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border border-red-200 p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-red-100 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h4 className="text-red-600 text-xl font-bold mb-2">Danger Zone</h4>
            <p className="text-gray-600 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 border border-red-700 text-white font-semibold hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
              disabled={loading}
            >
              <Trash2 className="w-4 h-4" />
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white p-8 max-w-md w-full border border-gray-200 shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Delete Account</h3>
                <p className="text-gray-600 text-sm">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Are you absolutely sure you want to delete your account? All of your data will be permanently removed from our servers forever. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDeleteProfile}
                disabled={loading}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Yes, Delete Forever
                  </>
                )}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={loading}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
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
