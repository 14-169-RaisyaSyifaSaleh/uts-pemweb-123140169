import React from "react";
import { Heart, Trash2 } from "lucide-react";
export const ImageGallery = ({ images, onFavorite, favorites }) => {
  return (
    <div className="gallery-section">
      <h2 className="section-title">Image Gallery</h2>
      {images.length === 0 ? (
        <p className="empty-state">
          No images loaded yet. Select a breed or refresh!
        </p>
      ) : (
        <div className="image-grid">
          {images.map((img, index) => (
            <div key={index} className="image-card">
              <img
                src={img}
                alt={`Animal ${index + 1}`}
                className="animal-image"
                loading="lazy"
              />
              <button
                className={`favorite-button ${
                  favorites.includes(img) ? "active" : ""
                }`}
                onClick={() => onFavorite(img)}
                title={
                  favorites.includes(img)
                    ? "Remove from favorites"
                    : "Add to favorites"
                }
              >
                <Heart
                  size={20}
                  fill={favorites.includes(img) ? "#ff4757" : "none"}
                  color={favorites.includes(img) ? "#ff4757" : "#fff"}
                />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const FavoritesSection = ({ favorites, onRemove }) => {
  return (
    <div className="favorites-section">
      <h2 className="section-title"> Favorite Images ({favorites.length})</h2>
      {favorites.length === 0 ? (
        <p className="empty-state">
          No favorites yet. Click the heart icon on images to add them to your
          collection!
        </p>
      ) : (
        <div className="image-grid">
          {favorites.map((img, index) => (
            <div key={index} className="favorite-card">
              <img
                src={img}
                alt={`Favorite ${index + 1}`}
                className="animal-image"
                loading="lazy"
              />
              <button
                className="remove-button"
                onClick={() => onRemove(img)}
                title="Remove from favorites"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
