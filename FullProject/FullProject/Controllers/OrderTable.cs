using FullProject.Data;
using FullProject.Models;
using Microsoft.AspNetCore.Mvc;

namespace FullProject.Controllers
{
    [ApiController]
    [Route("/api[controller]")]
    public class OrderTable : Controller
    {
        private readonly UsersDbcontext usersDbcontext;
        public OrderTable(UsersDbcontext usersDbcontext)
        {
           this.usersDbcontext = usersDbcontext;
        }
        [HttpPost("add-order")]
        public IActionResult AddOrder([FromBody] Order orderObj)
        {
            if (orderObj == null)
            {
                return BadRequest();
            }
            else
            {
               usersDbcontext.Order.Add(orderObj);
                usersDbcontext.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Order Successful"
                });
            }
        }
        [HttpGet("view-order")]
        public IActionResult ViewOrder()
        {
            var order = usersDbcontext.Order.AsQueryable();
            if (order == null)
            {
                return BadRequest(new
                {
                    Message = "Order Not Found"
                });
            }
            else
            {
                return Ok(order);
            }
        }
    }
}
