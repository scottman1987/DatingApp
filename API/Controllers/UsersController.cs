using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class UsersController : BaseApiController
    {
        private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        // Neil makes a point here that returning List<AppUser>
        // would certainly work, but would be giving far too
        // many features in the returned type. The user only
        // needs to be able to enumerate over the returned list.
        // Adding elements to the returned list, as an example
        // would be inappropriate here.
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<AppUser>> GetUserAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }
    }
}