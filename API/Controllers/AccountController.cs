using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using API.Services;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public AccountController(DataContext context, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _context = context;
        }

        // Lesson 35: Initial creation
        // Lesson 36: (user exists checking and change to RegisterDto)
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> RegisterAsync(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Username)) return BadRequest("Username already taken");

            // HMACSHA512 is IDisposable
            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                UserName = registerDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            System.Console.WriteLine($"pwhash: {user.PasswordHash}");

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> LoginAsync(LoginDto loginDto)
        {
            var invalidLoginMessage = "invalid login credentials";

            var user = await _context.Users
                .SingleOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());

            if (user == null) return Unauthorized(invalidLoginMessage);

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            // this is different than what Neil did, but it appears to be a NET way of comparing
            // things without writing explicit loops to compare byte arrays one byte at a time
            if (!StructuralComparisons.StructuralEqualityComparer.Equals(computedHash, user.PasswordHash))
                return Unauthorized(invalidLoginMessage);

            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}