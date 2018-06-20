using Microsoft.AspNetCore.Mvc;

namespace mail.Controllers
{
    public class MathController : BaseController
    {
        [HttpGet("sum")]
        public IActionResult Sum(int a, int b)
        {
            return this.Ok(new { result = a + b });
        }
    }
}