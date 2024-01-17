using Core.Utilities.Result.Abstract;
using Entities.Concrete;
using Entities.Dtos;

namespace Business.Repositories.CustomerRepository;

public interface ICustomerService
{
    Task<IResult> Add(CustomerRegisterDto customer);
    Task<IResult> Update(Customer customer);
    Task<IResult> ChangePasswordByAdminPanel(CustomerChangePasswordByAdminPanelDto customerDto);
    Task<IResult> Delete(Customer customer);
    Task<Customer> GetByEmail(string email);
    Task<IDataResult<List<CustomerDto>>> GetList();
    Task<IDataResult<Customer>> GetById(int id);
    Task<IDataResult<CustomerDto>> GetDtoById(int id);
}
