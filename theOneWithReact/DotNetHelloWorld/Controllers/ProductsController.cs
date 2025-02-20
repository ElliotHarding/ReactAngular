using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace MyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // Or [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private static readonly List<Product> _products = new List<Product>
        {
            new Product { Id = 1, Name = "Laptop", Price = 1200 },
            new Product { Id = 2, Name = "Mouse", Price = 25 },
            new Product { Id = 3, Name = "Keyboard", Price = 50 }
        };

        [HttpGet]
        public ActionResult<IEnumerable<Product>> Get()
        {
            return Ok(_products);
        }

        [HttpGet("{id}")]
        public ActionResult<Product> Get(int id)
        {
            var product = _products.Find(p => p.Id == id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }
        
        public ActionResult<Product> initAdd()
        {
        	_products.Add(new Product { Id = 1, Name = "Laptop", Price = 1200 });
            _products.Add(new Product { Id = 2, Name = "Mouse", Price = 25 });
            _products.Add(new Product { Id = 3, Name = "Keyboard", Price = 50 });
            
            return NoContent();
        }

        [HttpPost]
        public ActionResult<Product> Post(Product product)
        {
            if (product == null)
            {
                return BadRequest();
            }

            // In a real application, you'd likely generate a new ID and save to a database.
            product.Id = _products.Count + 1;
            _products.Add(product);

            return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
        }

        [HttpPut("{id}")]
        public ActionResult<Product> Put(int id, Product updatedProduct)
        {
            var existingProduct = _products.Find(p => p.Id == id);
            if (existingProduct == null)
            {
                return NotFound();
            }

            existingProduct.Name = updatedProduct.Name;
            existingProduct.Price = updatedProduct.Price;

            return Ok(existingProduct);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var product = _products.Find(p => p.Id == id);
            if (product == null)
            {
                return NotFound();
            }

            _products.Remove(product);

            return NoContent(); // 204 No Content
        }
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
    }
}


/*using Microsoft.AspNetCore.Mvc;
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
    }* /

    [HttpGet]
    public IActionResult Get()
    {
    	return Ok("Hello from .NET!");
    }

    // ... other API methods (POST, PUT, DELETE, etc.)
}*/
