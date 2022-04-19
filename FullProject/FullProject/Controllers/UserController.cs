using Microsoft.AspNetCore.Mvc;
using FullProject.Data;
using Microsoft.EntityFrameworkCore;
using FullProject.Models;
using FullProject.Helpers;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;

namespace FullProject.Controllers
{
    [ApiController]
    [Route("/api[controller]")]
    public class HomeController : Controller

    {
        private readonly UsersDbcontext usersDbContext;
        private readonly IConfiguration config;

        public HomeController(UsersDbcontext usersDbContext,IConfiguration config)
        {
            this.usersDbContext = usersDbContext;
           this.config = config;
        }
        [HttpGet("user")]
        public IActionResult Username()
        {
            var user = usersDbContext.User.AsQueryable();
            return Ok(user);

        }

        [HttpPost("Signup")]

        public IActionResult AddDetails([FromBody] User userObj)
        {

            if (userObj == null)
            {
                return BadRequest();
            }
            else
            {
                userObj.Passcode = EncDscPassword.EncryptPassword(userObj.Passcode);
                usersDbContext.User.Add(userObj);
                usersDbContext.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "User Added"
                });
            }
        }

        [HttpPost("Login")]

        public IActionResult Login([FromBody] User userobj)
        {
            var uname = userobj.Email;
            if(userobj == null)
            { return BadRequest();
            }
            else
            {
               
                var user = usersDbContext.User.Where( a=>a.Email == userobj.Email).FirstOrDefault();
                if(user != null && EncDscPassword.DecryptPassword(user.Passcode)==userobj.Passcode)

                {
                    var token = GenerateToken(user.FirstName);
                    return Ok(new
                    {
                        StatusCode = 200,
                        message = "LoginSuccessFully" +user.Email,
                        JwtToken = token 
                    });

                }
                else
                {
                    return Ok(new
                    {
                        StatusCode = 404,
                        message = "User Not Found"
                    });
                }
            }
        }

        [HttpDelete()]


        public IActionResult RemoveDetails([FromBody] User userObj)
        {
            usersDbContext.User.Remove(userObj);
            usersDbContext.SaveChanges();
            return Ok();
        }





    private string GenerateToken(string username)
        {
            var tokenhandler = new JwtSecurityTokenHandler();
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JWT:Key"]));
            var credential =new SigningCredentials(key,SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.Email,username)
            };
            var token = new JwtSecurityToken(
                issuer: config["JWT:Issuer"],
                audience: config["JWT:Audience"],
                claims,
                expires: DateTime.Now.AddDays(1),
                 signingCredentials: credential);
            return tokenhandler.WriteToken(token);

        }




    }
}
