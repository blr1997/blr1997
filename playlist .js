class RecentlyPlayedStore {
  constructor(storage) {
    this.storage = storage;
// Using a Map to store user-song pairs
    this.store = new Map();
  }

  playSong(user, song) {
 // If the user already exists, remove the old occurrence users
    if (this.store.has(user)) {
      const songs = this.store.get(user);
      songs.splice(songs.indexOf(song), 1);
    }

 // Add the song at the beginning of the list for the users
    if (!this.store.has(user)) {
      this.store.set(user, []);
    }
    this.store.get(user).unshift(song);

 // If the store becomes full, user remove the least recently played song from storage list
    if (this.store.get(user).length > this.storage) {
      this.store.get(user).pop();
    }
  }

  getRecentlyPlayed(user) {
    if (this.store.has(user)) {
      return this.store.get(user);
    } else {
      return [];
    }
  }
}

// Example usage
const store = new RecentlyPlayedStore(3);

store.playSong("User1", "S1");
store.playSong("User1", "S2");
store.playSong("User1", "S3");
console.log(store.getRecentlyPlayed("User1")); 

store.playSong("User1", "S4");
console.log(store.getRecentlyPlayed("User1")); 

store.playSong("User1", "S2");
console.log(store.getRecentlyPlayed("User1"));

store.playSong("User1", "S1");
console.log(store.getRecentlyPlayed("User1"));
