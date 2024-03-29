using Core.DataAccess.EntityFramework;
using DataAccess.Context.EntityFramework;
using Entities.Concrete;
using Entities.Dtos;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories.ProductRepository;

public class EfProductDal : EfEntityRepositoryBase<Product, SimpleContextDb>, IProductDal
{
    public async Task<List<ProductListDto>> GetProductList(int customerId)
    {
        using (var context = new SimpleContextDb())
        {
            if (customerId!=0)
            {
                var customerRelationship = context.CustomerRelationships.Where(p => p.CustomerId == customerId).SingleOrDefault();
                var result = from product in context.Products
                             select new ProductListDto
                             {
                                 Id = product.Id,
                                 Name = product.Name,
                                 Discount = customerRelationship.Discount,
                                 Price = context.PriceListDetails.Where(x => x.PriceListId == customerRelationship.PriceListId && x.ProductId == product.Id).Count() > 0
                                 ? context.PriceListDetails.Where(x => x.PriceListId == customerRelationship.PriceListId && x.ProductId == product.Id).Select(s => s.Price).FirstOrDefault() : 0,
                                 MainImageUrl = (context.ProductImages.Where(p => p.ProductId == product.Id && p.IsMain == true).Count() > 0 ? context.ProductImages.Where(p => p.ProductId == product.Id && p.IsMain == true).Select(s => s.ImageUrl).FirstOrDefault() : ""),
                                 Images = context.ProductImages.Where(p => p.ProductId == product.Id).Select(s => s.ImageUrl).ToList()
                             };
                return await result.OrderBy(x => x.Name).ToListAsync();
            }
            else
            {
                var result = from product in context.Products
                             select new ProductListDto
                             {
                                 Id = product.Id,
                                 Name = product.Name,
                                 Discount = 0,
                                 Price =0,
                                 MainImageUrl = (context.ProductImages.Where(p => p.ProductId == product.Id && p.IsMain == true).Count() > 0 ? context.ProductImages.Where(p => p.ProductId == product.Id && p.IsMain == true).Select(s => s.ImageUrl).FirstOrDefault() : ""),
                                 Images = context.ProductImages.Where(p => p.ProductId == product.Id).Select(s => s.ImageUrl).ToList()
                             };
                return await result.OrderBy(x => x.Name).ToListAsync();
            }
            
        }
    }
    public async Task<List<ProductListDto>> GetListDto()
    {
        using (var context = new SimpleContextDb())
        {
            var result = from product in context.Products
                         select new ProductListDto
                         {
                             Id = product.Id,
                             Name = product.Name,
                             MainImageUrl = (context.ProductImages.Where(p => p.ProductId == product.Id && p.IsMain == true).Count() > 0 ? context.ProductImages.Where(p => p.ProductId == product.Id && p.IsMain == true).Select(s => s.ImageUrl).FirstOrDefault() : ""),
                         };
            return await result.OrderBy(x => x.Name).ToListAsync();
        }
    }
}
