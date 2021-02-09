using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Repositories;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        // GET api/movies
        [HttpGet]
        public ActionResult<IEnumerable<Movie>> Get()
        {
            var repo = MoviesRepository.Instance;
            return repo.getMovies();
        }

        // POST api/movies
        [HttpPost]
        public ActionResult Post([FromBody] Movie newMovie)
        {
            var repo = MoviesRepository.Instance;
            try
            {
                repo.addMovie(newMovie);
                repo.saveData();
                return Ok(newMovie);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
