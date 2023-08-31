class RecentlyPlayedStore {
  constructor(storage) {
    this.storage = storage;
    this.store = new Map(); // Using a Map to store user-song pairs
  }
  playSong(user, song) {
    // If the user already exists, remove the old occurrence user
    try {
      if (this.store.has(user)) {
        const songs = this.store.get(user);
        songs.splice(songs.indexOf(song), 1);
      }

      // Add the song at the beginning of the list for the users
      if (!this.store.has(user)) {
        this.store.set(user, []);
      }
      this.store.get(user).unshift(song);

      // If the store becomes full, user remove the least recently played song
      if (this.store.get(user).length > this.storage) {
        this.store.get(user).pop();
      }
    } catch (err) {
      throw err;
    }
  }

  getRecentlyPlayed(user) {
    try {
      if (this.store.has(user)) {
        return this.store.get(user);
      } else {
        return [];
      }
    } catch (err) {
      throw err;
    }
  }
}

// Example usage
const store = new RecentlyPlayedStore(3);
store.playSong("user1", "S1");
store.playSong("user1", "S2");
store.playSong("user1", "S3");
console.log(store.getRecentlyPlayed("user1"));

store.playSong("user1", "S4");
console.log(store.getRecentlyPlayed("user1"));

store.playSong("user1", "S2");
console.log(store.getRecentlyPlayed("user1"));

store.playSong("user1", "S1");
console.log(store.getRecentlyPlayed("user1"));
