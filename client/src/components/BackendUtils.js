export const getUrl = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    // dev
    return `http://localhost:5000`;
  } else {
    // production
    return `https://snake-arena.herokuapp.com`;
  }
};
