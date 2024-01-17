using Core.DataAccess;
using Entities.Concrete;
using Entities.Dtos;

namespace DataAccess.Repositories.CustomerRepository;

public interface ICustomerDal : IEntityRepository<Customer>
{
    Task<List<CustomerDto>> GetlistDto();
    Task<CustomerDto> GetDto(int id);
}
