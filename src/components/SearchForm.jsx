import React from "react";
import anjingIcon from "../assets/icon/anjing.jpeg";
import kucingIcon from "../assets/icon/kucing.jpeg";

const SearchForm = ({
  activeTab,
  setActiveTab,
  breeds,
  selectedBreed,
  onBreedChange,
}) => {
  return (
    <div className="search-form-container">
      <nav className="nav-tabs">
        <button
          className={`nav-button ${activeTab === "dog" ? "active" : ""}`}
          onClick={() => setActiveTab("dog")}
        >
          <img src={anjingIcon} alt="Anjing Icon" className="tab-icon" />
          Dogs
        </button>
        <button
          className={`nav-button ${activeTab === "cat" ? "active" : ""}`}
          onClick={() => setActiveTab("cat")}
        >
          <img src={kucingIcon} alt="Kucing Icon" className="tab-icon" />
          Cats
        </button>
      </nav>
      <div className="breed-selector">
        <label className="form-label" htmlFor="breed-select">
          Select {activeTab === "dog" ? "Dog" : "Cat"} Breed:
        </label>
        <select
          id="breed-select"
          className="form-select"
          value={selectedBreed}
          onChange={(e) => onBreedChange(e.target.value)}
        >
          <option value="">-- All Breeds --</option>
          {breeds.map((breed, index) => (
            <option key={index} value={breed}>
              {breed.charAt(0).toUpperCase() + breed.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchForm;
