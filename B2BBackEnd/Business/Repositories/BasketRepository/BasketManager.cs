using Business.Aspects.Secured;
using Business.Repositories.BasketRepository.Constants;
using Business.Repositories.BasketRepository.Validation;
using Core.Aspects.Caching;
using Core.Aspects.Performance;
using Core.Aspects.Validation;
using Core.Utilities.Result.Abstract;
using Core.Utilities.Result.Concrete;
using DataAccess.Repositories.BasketRepository;
using Entities.Concrete;
using Entities.Dtos;

namespace Business.Repositories.BasketRepository
{
    public class BasketManager : IBasketService
    {
        private readonly IBasketDal _basketDal;


        public BasketManager(IBasketDal basketDal)
        {
            _basketDal = basketDal;
        }

        [SecuredAspect()]
        [ValidationAspect(typeof(BasketValidator))]
        [RemoveCacheAspect("IBasketService.Get")]

        public async Task<IResult> Add(Basket basket)
        {
            var list =(await _basketDal.GetListByCustomerId(basket.CustomerId)).Find(x => x.ProductId == basket.ProductId && x.Price == basket.Price);
            if (list == null)
                await _basketDal.Add(basket);
            else
            {            
                Basket updbasket = new()
                {
                    Id=list.Id,
                    CustomerId=list.CustomerId,
                    ProductId=list.ProductId,
                    Price=list.Price + basket.Price,
                    Quantity= list.Quantity + basket.Quantity
                };
                await _basketDal.Update(updbasket);
            }

            return new SuccessResult(BasketMessages.Added);
        }

        [SecuredAspect()]
        [ValidationAspect(typeof(BasketValidator))]
        [RemoveCacheAspect("IBasketService.Get")]

        public async Task<IResult> Update(Basket basket)
        {
            await _basketDal.Update(basket);
            return new SuccessResult(BasketMessages.Updated);
        }

        //[SecuredAspect()]
        [RemoveCacheAspect("IBasketService.Get")]

        public async Task<IResult> Delete(Basket basket)
        {
            await _basketDal.Delete(basket);
            return new SuccessResult(BasketMessages.Deleted);
        }

        //[SecuredAspect()]
        [CacheAspect()]
        [PerformanceAspect()]
        public async Task<IDataResult<List<Basket>>> GetList()
        {
            return new SuccessDataResult<List<Basket>>(await _basketDal.GetAll());
        }
        //[SecuredAspect()]
        [CacheAspect()]
        [PerformanceAspect()]
        public async Task<IDataResult<List<BasketListDto>>> GetListByCustomerId(int customerId)
        {
            return new SuccessDataResult<List<BasketListDto>>(await _basketDal.GetListByCustomerId(customerId));
        }
        //[SecuredAspect()]
        [CacheAspect()]
        [PerformanceAspect()]
        public async Task<List<Basket>> GetListByProductId(int productId)
        {
            return await _basketDal.GetAll(x=>x.ProductId==productId);
        }

        [SecuredAspect()]
        public async Task<IDataResult<Basket>> GetById(int id)
        {
            return new SuccessDataResult<Basket>(await _basketDal.Get(p => p.Id == id));
        }

    }
}
