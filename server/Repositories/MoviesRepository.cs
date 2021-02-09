using server.Models;
using System.Collections.Generic;
using System.Collections;
using System;
using System.Xml.Serialization;
using Newtonsoft.Json;
using System.IO;
using System.Text;

namespace server.Repositories
{
    public class MoviesRepository
    {
        private Dictionary<string, Movie> _movies;
        private static readonly MoviesRepository instance = new MoviesRepository();
        private static int MAX_LIST = 10;

        static MoviesRepository() { }
        private MoviesRepository()
        {
            _movies = this.loadData();
        }

        public static MoviesRepository Instance
        {
            get { return instance; }
        }

        public Movie[] getMovies()
        {
            List<Movie> result = new List<Movie>();
            foreach (var key in _movies.Keys)
            {
                result.Add(_movies[key]);
            }
            return result.ToArray();
        }

        public void addMovie(Movie newMovie)
        {
            if (_movies.ContainsKey(newMovie.Name))
            {
                throw new InvalidOperationException("Movie already exists");
            }
            if (_movies.Count == MAX_LIST)
            {
                this.removeLowest();
            }
            _movies.Add(newMovie.Name, newMovie);
        }

        private void removeLowest()
        {
            int curMinRanking = Int32.MaxValue;
            string key = null;
            foreach (var item in _movies)
            {
                if (item.Value.Ranking < curMinRanking)
                {
                    curMinRanking = item.Value.Ranking;
                    key = item.Key;
                }
            }
            _movies.Remove(key);
        }

        public void saveData()
        {
            string json = JsonConvert.SerializeObject(_movies, Formatting.Indented);
            using (StreamWriter file = File.CreateText(@"./movies.json"))
            {
                JsonSerializer serializer = new JsonSerializer();
                serializer.Serialize(file, _movies);
            }
        }

        private Dictionary<string, Movie> loadData()
        {
            try
            {
                StringBuilder sb = new StringBuilder();
                using (StreamReader file = new StreamReader(@"./movies.json"))
                {
                    string line;
                    while ((line = file.ReadLine()) != null)
                    {
                        sb.Append(line);
                    }
                }
                return JsonConvert.DeserializeObject<Dictionary<string, Movie>>(sb.ToString());
            }
            catch (Exception e)
            {
                return new Dictionary<string, Movie>();
            }

        }
    }
}