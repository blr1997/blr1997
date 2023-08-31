class RecentlyPlayedStore {
  constructor(storage) {
    this.storage = storage;
    this.store = new Map();
  }

  playSong(user, song) {
    if (this.store.has(user)) {
      const songs = this.store.get(user);
      songs.splice(songs.indexOf(song), 1);
    }

    if (!this.store.has(user)) {
      this.store.set(user, []);
    }
    this.store.get(user).unshift(song);

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
