/// <reference lib="webworker" />

import { GroupedMovies, Movie } from '../types/movie.types';

// This function listens to the "message" event and groups the incoming data (movies) by year
addEventListener('message', (event: { data: Movie[] }) => {
  // Extract the movies from the event data
  const movies: Movie[] = event.data;

  // Create an object to store the movies grouped by year
  const groupedMovies: GroupedMovies = movies.reduce((grouped, movie) => {
    // Get the year of the current movie
    const year = movie.Year;

    // If the year doesn't exist in the grouped object, create an array for it
    if (!grouped[year]) {
      grouped[year] = [];
    }

    // Add the current movie to the corresponding year array
    grouped[year].push(movie);

    // Return the updated grouped object
    return grouped;
  }, {} as GroupedMovies);

  // Post the grouped movies back to the main thread
  postMessage(groupedMovies);
});
