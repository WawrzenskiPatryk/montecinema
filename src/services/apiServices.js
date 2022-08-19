const api = import.meta.env.VITE_API;

export async function getAllMovies() {
  const fetchedMovies = await fetch(`${api}/movies`).then((res) => {
    return res.json();
  });

  return fetchedMovies;
}
