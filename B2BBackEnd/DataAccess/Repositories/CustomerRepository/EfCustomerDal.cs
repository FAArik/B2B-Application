using Core.DataAccess.EntityFramework;
using DataAccess.Context.EntityFramework;
using Entities.Concrete;
using Entities.Dtos;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories.CustomerRepository;

public class EfCustomerDal : EfEntityRepositoryBase<Customer, SimpleContextDb>, ICustomerDal
{
    public async Task<List<CustomerDto>> GetlistDto()
    {
        using (var context = new SimpleContextDb())
        {
            var result = from customer in context.Customers
                         select new CustomerDto
                         {
                             Id = customer.Id,
                             Email = customer.Email,
                             Name = customer.Name,
                             PasswordHash = customer.PasswordHash,
                             PasswordSalt = customer.PasswordSalt,
                             PriceListId = context.CustomerRelationships.Where(p => p.CustomerId == customer.Id).Select(s => s.PriceListId).FirstOrDefault(),
                             PriceListName = (context.CustomerRelationships.Where(p => p.CustomerId == customer.Id).Count() > 0 ?
                             context.PriceLists.Where(p => p.Id == (context.CustomerRelationships.Where(p => p.CustomerId == customer.Id).Select(s => s.PriceListId).FirstOrDefault())).Select(s => s.Name).FirstOrDefault()
                             : "-"),
                             Discount= (context.CustomerRelationships.Where(p => p.CustomerId == customer.Id).Count() > 0 ?
                             context.CustomerRelationships.Where(p => p.CustomerId == customer.Id).Select(x=>x.Discount).FirstOrDefault()
                             : 0),
                         };
            return await result.OrderBy(p => p.Name).ToListAsync();
        }
    }
    public async Task<CustomerDto> GetDto(int id)
    {
        using (var context = new SimpleContextDb())
        {
            var result = from customer in context.Customers.Where(p=>p.Id==id)
                         select new CustomerDto
                         {
                             Id = customer.Id,
                             Email = customer.Email,
                             Name = customer.Name,
                             PasswordHash = customer.PasswordHash,
                             PasswordSalt = customer.PasswordSalt,
                             PriceListId = context.CustomerRelationships.Where(p => p.CustomerId == customer.Id).Select(s => s.PriceListId).FirstOrDefault(),
                             PriceListName = (context.CustomerRelationships.Where(p => p.CustomerId == customer.Id).Count() > 0 ?
                             context.PriceLists.Where(p => p.Id == (context.CustomerRelationships.Where(p => p.CustomerId == customer.Id).Select(s => s.PriceListId).FirstOrDefault())).Select(s => s.Name).FirstOrDefault()
                             : "-"),
                             Discount = (context.CustomerRelationships.Where(p => p.CustomerId == customer.Id).Count() > 0 ?
                             context.CustomerRelationships.Where(p => p.CustomerId == customer.Id).Select(x => x.Discount).FirstOrDefault()
                             : 0),
                         };
            return await result.FirstOrDefaultAsync();
        }
    }
}
