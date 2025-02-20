using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic; // Example: For lists

[ApiController]
[Route("/Products")] // Example route: /api/products
public class ProductsController : ControllerBase
{
    // Example: In-memory data (replace with database access)
    private static List<string> products = new List<string> { "Product 1", "Product 2" };
    /*
    [HttpGet]
    public IEnumerable<string> Get()
    {
        return products;
    }*/

    [HttpGet]
    public IActionResult Get()
    {
    	return Ok("Hello from .NET!");
    }

    // ... other API methods (POST, PUT, DELETE, etc.)
}
