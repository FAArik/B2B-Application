using Core.DataAccess;
using Entities.Concrete;
using Entities.Dtos;

namespace DataAccess.Repositories.ProductRepository
{
    public interface IProductDal : IEntityRepository<Product>
    {
        Task<List<ProductListDto>> GetProductList(int customerId);
        Task<List<ProductListDto>> GetListDto();
    }
}
