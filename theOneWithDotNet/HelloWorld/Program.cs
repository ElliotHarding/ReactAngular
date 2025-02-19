[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    // ... (Your database context and other dependencies)

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
    {
        return await _context.Products.ToListAsync();
    }

    // ... other API endpoints (POST, PUT, DELETE) ...
}

﻿// See https://aka.ms/new-console-template for more information
Console.WriteLine("Hello, World!");
