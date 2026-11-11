const STORAGE_KEY = "astroGuestName";

const adjectives = [
  "Curious",
  "Sleepy",
  "Brave",
  "Wandering",
  "Mysterious",
  "Cosmic",
  "Cheerful",
  "Tiny",
  "Dancing",
  "Invisible",
];

const nouns = [
  "Comet",
  "Nebula",
  "Pulsar",
  "Quasar",
  "Asteroid",
  "Galaxy",
  "Photon",
  "Meteor",
  "Moon",
  "Supernova",
];

const randomItem = (items) => {
  return items[Math.floor(Math.random() * items.length)];
};

export const generateNewGuestName = () => {
    const currentName = localStorage.getItem(STORAGE_KEY);

    let newName;

    // Avoid generating the same name again.
    do {
      newName = `${randomItem(adjectives)} ${randomItem(nouns)}`;
    } while (newName === currentName);

    localStorage.setItem(STORAGE_KEY, newName);

    return newName;
  };

  export const getGuestName = () => {
    return (
      localStorage.getItem(STORAGE_KEY) ||
      generateNewGuestName()
    );
  };
