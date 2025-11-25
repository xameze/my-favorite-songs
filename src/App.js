import React, { useState } from 'react';
import './App.css';

function App() {
  // Начальный список песен
  const [songs, setSongs] = useState([
    {
      id: 1,
      title: "Bohemian Rhapsody",
      artist: "Queen",
      url: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ",
      isFavorite: true
    },
    {
      id: 2,
      title: "Smells Like Teen Spirit",
      artist: "Nirvana", 
      url: "https://www.youtube.com/watch?v=hTWKbfoikeg",
      isFavorite: false
    },
  ]);

  // Состояние для новой песни
  const [newSong, setNewSong] = useState({ title: '', artist: '', url: '' });

  // Переключение избранного
  const toggleFavorite = (id) => {
    setSongs(songs.map(song => 
      song.id === id ? { ...song, isFavorite: !song.isFavorite } : song
    ));
  };

  // Добавление новой песни
  const addSong = (e) => {
    e.preventDefault();
    if (newSong.title && newSong.artist && newSong.url) {
      const song = {
        id: Date.now(),
        ...newSong,
        isFavorite: false
      };
      setSongs([...songs, song]);
      setNewSong({ title: '', artist: '', url: '' });
    }
  };

  // Обработчик изменений в форме
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSong(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🎵 Мои Любимые Песни</h1>
      </header>

      <main>
        {/* Форма добавления */}
        <form onSubmit={addSong} className="add-form">
          <h2>Добавить новую песню</h2>
          <input
            type="text"
            name="title"
            placeholder="Название песни"
            value={newSong.title}
            onChange={handleInputChange}
            required
          />
          <input
            type="text" 
            name="artist"
            placeholder="Исполнитель"
            value={newSong.artist}
            onChange={handleInputChange}
            required
          />
          <input
            type="url"
            name="url"
            placeholder="Ссылка на YouTube"
            value={newSong.url}
            onChange={handleInputChange}
            required
          />
          <button type="submit">➕ Добавить</button>
        </form>

        {/* Список песен */}
        <div className="songs-container">
          {songs.map(song => (
            <div 
              key={song.id} 
              className={`song-card ${song.isFavorite ? 'favorite' : ''}`}
            >
              <div className="song-info">
                <h3>{song.title}</h3>
                <p className="artist">{song.artist}</p>
                <a 
                  href={song.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="song-link"
                >
                  🎧 Слушать
                </a>
              </div>
              <button 
                onClick={() => toggleFavorite(song.id)}
                className={`favorite-btn ${song.isFavorite ? 'favorited' : ''}`}
              >
                {song.isFavorite ? '❤️' : '🤍'}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
