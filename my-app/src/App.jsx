import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import DataTable from "./components/DataTable";
import { ImageGallery, FavoritesSection } from "./components/DetailCard";

function App() {
  const [activeTab, setActiveTab] = useState("dog");
  const [dogBreeds, setDogBreeds] = useState([]);
  const [catBreeds, setCatBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [images, setImages] = useState([]);
  const [facts, setFacts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("animalFavorites");
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Error loading favorites:", error);
        localStorage.removeItem("animalFavorites");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("animalFavorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const fetchDogBreeds = async () => {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        const data = await response.json();
        if (data.status === "success") {
          const breeds = Object.keys(data.message);
          setDogBreeds(breeds);
        }
      } catch (error) {
        console.error("Error fetching dog breeds:", error);
      }
    };

    fetchDogBreeds();
  }, []);

  useEffect(() => {
    const catBreedsList = [
      "persian",
      "siamese",
      "maine coon",
      "ragdoll",
      "bengal",
      "british shorthair",
      "abyssinian",
      "birman",
      "sphynx",
      "scottish fold",
      "american shorthair",
      "russian blue",
    ];
    setCatBreeds(catBreedsList);
  }, []);

  useEffect(() => {
    fetchImages();
  }, [activeTab, selectedBreed]);

  useEffect(() => {
    fetchFacts();
  }, [activeTab]);

  useEffect(() => {
    setSelectedBreed("");
  }, [activeTab]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      if (activeTab === "dog") {
        let url = selectedBreed
          ? `https://dog.ceo/api/breed/${selectedBreed}/images/random/12`
          : "https://dog.ceo/api/breeds/image/random/12";

        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "success") {
          setImages(data.message);
        }
      } else {
        const catImages = Array.from(
          { length: 12 },
          (_, i) => `https://cataas.com/cat?width=300&height=300&t=${i + 1}`
        );
        setImages(catImages);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchFacts = async () => {
    setLoading(true);
    try {
      if (activeTab === "cat") {
        const factsArray = [];

        for (let i = 0; i < 5; i++) {
          const response = await fetch("https://catfact.ninja/fact");
          const data = await response.json();

          if (data.fact && data.fact.trim() !== "") {
            factsArray.push({
              fact: data.fact,
              length: data.length || data.fact.length,
            });
          }
        }

        setFacts(factsArray);
      } else {
        const dogFacts = [
          {
            fact: "Dogs have a sense of smell that is 10,000 to 100,000 times more acute than humans.",
            length: 88,
          },
          {
            fact: "A dog's nose print is unique, much like a person's fingerprint.",
            length: 68,
          },
          {
            fact: "Dogs can understand up to 250 words and gestures, count up to five, and perform simple mathematical calculations.",
            length: 120,
          },
          {
            fact: "The Basenji is the only dog breed that doesn't bark, but they can yodel!",
            length: 77,
          },
          {
            fact: "Puppies are born blind, deaf, and toothless. They develop their senses over the first few weeks.",
            length: 99,
          },
        ];
        setFacts(dogFacts);
      }
    } catch (error) {
      console.error("Error fetching facts:", error);
      setFacts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = (imageUrl) => {
    if (favorites.includes(imageUrl)) {
      setFavorites(favorites.filter((fav) => fav !== imageUrl));
    } else {
      setFavorites([...favorites, imageUrl]);
    }
  };

  const handleRemoveFavorite = (imageUrl) => {
    setFavorites(favorites.filter((fav) => fav !== imageUrl));
  };

  const handleBreedChange = (breed) => {
    setSelectedBreed(breed);
  };

  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        <SearchForm
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          breeds={activeTab === "dog" ? dogBreeds : catBreeds}
          selectedBreed={selectedBreed}
          onBreedChange={handleBreedChange}
        />

        <ImageGallery
          images={images}
          onFavorite={handleFavorite}
          favorites={favorites}
        />

        <DataTable facts={facts} onRefresh={fetchFacts} loading={loading} />

        <FavoritesSection
          favorites={favorites}
          onRemove={handleRemoveFavorite}
        />
      </main>

      <footer className="footer">
        <p>UTS Pengembangan Aplikasi Web -123140169</p>
      </footer>
    </div>
  );
}

export default App;
