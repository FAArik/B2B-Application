using Business.Aspects.Secured;
using Business.Repositories.CustomerRelationshipRepository;
using Business.Repositories.CustomerRepository.Constants;
using Business.Repositories.CustomerRepository.Validation;
using Business.Repositories.OrderRepository;
using Core.Aspects.Caching;
using Core.Aspects.Performance;
using Core.Aspects.Validation;
using Core.Utilities.Business;
using Core.Utilities.Hashing;
using Core.Utilities.Result.Abstract;
using Core.Utilities.Result.Concrete;
using DataAccess.Repositories.CustomerRepository;
using Entities.Concrete;
using Entities.Dtos;

namespace Business.Repositories.CustomerRepository
{
    public class CustomerManager : ICustomerService
    {
        private readonly ICustomerDal _customerDal;
        private readonly ICustomerRelationshipService _customerRelationshipService;
        private readonly IOrderService _orderService;

        public CustomerManager(ICustomerDal customerDal, ICustomerRelationshipService customerRelationshipService, IOrderService orderService)
        {
            _customerDal = customerDal;
            _customerRelationshipService = customerRelationshipService;
            _orderService = orderService;
        }

        //[SecuredAspect()]
        [ValidationAspect(typeof(CustomerValidator))]
        [RemoveCacheAspect("ICustomerService.Get")]

        public async Task<IResult> Add(CustomerRegisterDto CustomerRegisterDto)
        {
            IResult result = BusinessRules.Run(
           await CheckIfEmailExists(CustomerRegisterDto.Email)
           );

            byte[] passwordHash, passwordSalt;
            HashingHelper.CreatePassword(CustomerRegisterDto.Password, out passwordHash, out passwordSalt);
            Customer customer = new Customer()
            {
                Id = 0,
                Email = CustomerRegisterDto.Email,
                Name = CustomerRegisterDto.Name,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
            };
            await _customerDal.Add(customer);
            return new SuccessResult(CustomerMessages.Added);
        }

        [SecuredAspect()]
        [ValidationAspect(typeof(CustomerValidator))]
        [RemoveCacheAspect("ICustomerService.Get")]

        public async Task<IResult> Update(Customer customer)
        {
            await _customerDal.Update(customer);
            return new SuccessResult(CustomerMessages.Updated);
        }
        [SecuredAspect()]
        [ValidationAspect(typeof(CustomerValidator))]
        [RemoveCacheAspect("ICustomerService.Get")]

        public async Task<IResult> ChangePasswordByAdminPanel(CustomerChangePasswordByAdminPanelDto customerdto)
        {
            byte[] passwordHash, passwordSalt;
            HashingHelper.CreatePassword(customerdto.Password, out passwordHash, out passwordSalt);
            var customer = await _customerDal.Get(x => x.Id == customerdto.Id);
            customer.PasswordSalt = passwordSalt;
            customer.PasswordHash = passwordHash;
            await _customerDal.Update(customer);
            return new SuccessResult(CustomerMessages.ChangedPassword);
        }

        [SecuredAspect()]
        [RemoveCacheAspect("ICustomerService.Get")]

        public async Task<IResult> Delete(Customer customer)
        {
            IResult result = BusinessRules.Run(await CheckIfCustomerOrderExists(customer.Id));
            var customerRelationship = await _customerRelationshipService.GetByCustomerId(customer.Id);

            if (result != null)
            {
                return result;
            }
            await _customerDal.Delete(customer);
            return new SuccessResult(CustomerMessages.Deleted);
        }

        [SecuredAspect()]
        [CacheAspect()]
        [PerformanceAspect()]
        public async Task<IDataResult<List<CustomerDto>>> GetList()
        {
            return new SuccessDataResult<List<CustomerDto>>(await _customerDal.GetlistDto());
        }

        [SecuredAspect()]
        public async Task<IDataResult<Customer>> GetById(int id)
        {
            return new SuccessDataResult<Customer>(await _customerDal.Get(p => p.Id == id));
        }
        [SecuredAspect()]
        public async Task<IDataResult<CustomerDto>> GetDtoById(int id)
        {
            return new SuccessDataResult<CustomerDto>(await _customerDal.GetDto(id));
        }

        public async Task<Customer> GetByEmail(string email)
        {
            var result = await _customerDal.Get(p => p.Email == email);
            return result;
        }
        private async Task<IResult> CheckIfEmailExists(string email)
        {
            var list = await GetByEmail(email);
            if (list != null)
            {
                return new ErrorResult("Bu mail adresi daha önce kullanýlmýþ");
            }
            return new SuccessResult();
        }
        private async Task<IResult> CheckIfCustomerOrderExists(int customerId)
        {

            var list = await _orderService.GetListByCustomerId(customerId);
            if (list.Data.Count > 0)
            {
                return new ErrorResult("Sipariþi bulunan müþteri kaydý silinemez!");
            }
            return new SuccessResult();
        }
    }
}
