import { Injectable } from '@angular/core';
import { GroupedMovies, Movie } from '../types/movie.types';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  // Service to group movies by year using Web Workers
  // Web Workers are used to offload heavy processing to a separate thread
  // to keep the main thread responsive
  getMoviesGroupedByYear(movies: Movie[]): Promise<GroupedMovies> {
    return new Promise((resolve, reject) => {
      // Create a new worker using the URL of the worker script
      const worker = new Worker(
        new URL('./group-by-year.worker', import.meta.url)
      );

      // Post the movies to the worker for processing
      worker.postMessage(movies);

      // Resolve the promise with the grouped movies once the worker is done
      worker.onmessage = ({ data }: { data: GroupedMovies }) => {
        resolve(data);
      };

      // Reject the promise if there is an error in the worker
      worker.onerror = (error) => {
        reject(error);
      };
    });
  }
}
