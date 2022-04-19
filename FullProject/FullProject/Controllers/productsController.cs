using FullProject.Data;
using FullProject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FullProject.Controllers
{
    
        [ApiController]
        [Route("/api[controller]")]
    public class productsController : Controller
    {

        private readonly UsersDbcontext usersDbContext;

        public productsController(UsersDbcontext usersDbContext)
            {
                this.usersDbContext = usersDbContext;
            }
            [HttpGet("product")]
            public IActionResult Username()
            {
                var pro = usersDbContext.products.AsQueryable();
                return Ok(pro);

            }

            [HttpPost("Post")]

            public IActionResult AddDetails([FromBody] products userObj)
            {

            if (userObj == null)
            {
                return BadRequest();
            }

            else
            {
                usersDbContext.products.Add(userObj);
                usersDbContext.SaveChanges();
                return Ok(new
                {
                    StatusCode=200,
                    Message="Product Added Successfully"
                });
            }
            }

        [HttpPut("update")]

        public IActionResult UpdateProduct([FromBody] products userObj)
        {

            if(userObj == null)
            {
                return BadRequest();
            }
            var user = usersDbContext.products.AsNoTracking().FirstOrDefault( x => x.Id == userObj.Id);
            if (user == null)
            {
                return NotFound( new
                {
                    StatusCode = 404,
                    Message = "Product Not found",
                });
            }
            else { 
            usersDbContext.Entry(userObj).State = EntityState.Modified;
                usersDbContext.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Product Updated Successfully"
                });
            
            }
        }

        [HttpDelete("Delete/{id}")]


        public IActionResult RemoveDetails(int id)
        {
            var user = usersDbContext.products.Find(id);

            if (user == null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "Product Not Found"
                });
            }
            else
            {
                usersDbContext.Remove(user);
                usersDbContext.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Delete SuccessFully"
                });
            }
        }


    }
    }
    

