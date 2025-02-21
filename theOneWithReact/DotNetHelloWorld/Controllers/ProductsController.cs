using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyApi.Controllers // Replace with your actual namespace
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductsController(ApplicationDbContext context)
        {
            _context = context;

            // Seed initial data (for in-memory database)
            if (_context.Products.CountAsync().Result == 0)
            {
                _context.Products.AddRange(
                    new Product { Name = "Laptop", Price = 1200 },
                    new Product { Name = "Mouse", Price = 25 },
                    new Product { Name = "Keyboard", Price = 50 }
                );
                _context.SaveChanges();
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {     	       	
        	if(_context.Products.FirstOrDefault(p => p.Name == "Laptop") == null) 
        	{
        		 _context.Products.AddRange(new Product { Name = "Laptop", Price = 1200 });
        	}
        	
        	if(_context.Products.FirstOrDefault(p => p.Name == "Mouse") == null) 
        	{
        		 _context.Products.AddRange(new Product { Name = "Mouse", Price = 25 });
        	}
        	
        	if(_context.Products.FirstOrDefault(p => p.Name == "Keyboard") == null) 
        	{
        		 _context.Products.AddRange(new Product { Name = "Keyboard", Price = 50 });
        	}
        	
        	 _context.SaveChanges();
        
            return await _context.Products.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Products.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
