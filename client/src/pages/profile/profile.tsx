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
    <div className="profile-container">
      <div className="profile-header">
        <h2>{user?.username}'s Profile</h2>
        <p>{user?.email}</p>
        <div className="profile-actions">
          {!isEditing ? (
            <>
              <button onClick={() => setIsEditing(true)} className="edit-btn">
                Edit Profile
              </button>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <button onClick={() => setIsEditing(false)} className="cancel-btn">
              Cancel
            </button>
          )}
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="profile-content">
        <div className="profile-info">
          <div className="avatar-section">
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt="Avatar" className="avatar" />
            ) : (
              <div className="avatar-placeholder">
                {user?.username?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="user-details">
            <h3>{user?.username}</h3>
            <p>{user?.email}</p>
            {user?.bio && <p className="bio">{user.bio}</p>}
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="profile-form">
            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                {...register("bio")}
                rows={4}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="twitter">Twitter</label>
              <input
                type="url"
                id="twitter"
                {...register("sosialLinks.twitter")}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="facebook">Facebook</label>
              <input
                type="url"
                id="facebook"
                {...register("sosialLinks.facebook")}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="instagram">Instagram</label>
              <input
                type="url"
                id="instagram"
                {...register("sosialLinks.instagram")}
                disabled={loading}
              />
            </div>

            <div className="form-actions">
              <button type="submit" disabled={loading} className="save-btn">
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        ) : (
          <div className="social-links">
            {user?.sosialLinks?.twitter && (
              <a
                href={user.sosialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            )}
            {user?.sosialLinks?.facebook && (
              <a
                href={user.sosialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            )}
            {user?.sosialLinks?.instagram && (
              <a
                href={user.sosialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            )}
          </div>
        )}
      </div>

      <div className="danger-zone">
        <h4>Danger Zone</h4>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="delete-btn"
          disabled={loading}
        >
          Delete Account
        </button>
      </div>

      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Delete Account</h3>
            <p>
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <div className="modal-actions">
              <button
                onClick={handleDeleteProfile}
                disabled={loading}
                className="confirm-delete-btn"
              >
                {loading ? "Deleting..." : "Yes, Delete Account"}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={loading}
                className="cancel-delete-btn"
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
