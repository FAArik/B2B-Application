using Business.Aspects.Secured;
using Business.Repositories.OrderDetailRepository.Constants;
using Business.Repositories.OrderDetailRepository.Validation;
using Core.Aspects.Caching;
using Core.Aspects.Performance;
using Core.Aspects.Validation;
using Core.Utilities.Result.Abstract;
using Core.Utilities.Result.Concrete;
using DataAccess.Repositories.OrderDetailRepository;
using Entities.Concrete;
using Entities.Dtos;

namespace Business.Repositories.OrderDetailRepository
{
    public class OrderDetailManager : IOrderDetailService
    {
        private readonly IOrderDetailDal _orderDetailDal;

        public OrderDetailManager(IOrderDetailDal orderDetailDal)
        {
            _orderDetailDal = orderDetailDal;
        }

        [SecuredAspect()]
        [ValidationAspect(typeof(OrderDetailValidator))]
        [RemoveCacheAspect("IOrderDetailService.Get")]

        public async Task<IResult> Add(OrderDetail orderDetail)
        {
            await _orderDetailDal.Add(orderDetail);
            return new SuccessResult(OrderDetailMessages.Added);
        }

        [SecuredAspect()]
        [ValidationAspect(typeof(OrderDetailValidator))]
        [RemoveCacheAspect("IOrderDetailService.Get")]

        public async Task<IResult> Update(OrderDetail orderDetail)
        {
            await _orderDetailDal.Update(orderDetail);
            return new SuccessResult(OrderDetailMessages.Updated);
        }

        [SecuredAspect()]
        [RemoveCacheAspect("IOrderDetailService.Get")]

        public async Task<IResult> Delete(OrderDetail orderDetail)
        {
            await _orderDetailDal.Delete(orderDetail);
            return new SuccessResult(OrderDetailMessages.Deleted);
        }

        [SecuredAspect()]
        [CacheAspect()]
        [PerformanceAspect()]
        public async Task<IDataResult<List<OrderDetail>>> GetList()
        {
            return new SuccessDataResult<List<OrderDetail>>(await _orderDetailDal.GetAll());
        }
        //[SecuredAspect()]
        [CacheAspect()]
        [PerformanceAspect()]
        public async Task<IDataResult<List<OrderDetailDto>>> GetListDto(int id)
        {
            return new SuccessDataResult<List<OrderDetailDto>>(await _orderDetailDal.GetListDto(id));
        }
        [SecuredAspect()]
        [CacheAspect()]
        [PerformanceAspect()]
        public async Task<IDataResult<List<OrderDetail>>> GetListByOrderId(int orderId)
        {
            return new SuccessDataResult<List<OrderDetail>>(await _orderDetailDal.GetAll(x => x.OrderId == orderId));
        }
        [SecuredAspect()]
        [CacheAspect()]
        [PerformanceAspect()]
        public async Task<List<OrderDetail>> GetListByProductId(int productId)
        {
            return await _orderDetailDal.GetAll(x => x.ProductId == productId);
        }

        [SecuredAspect()]
        public async Task<IDataResult<OrderDetail>> GetById(int id)
        {
            return new SuccessDataResult<OrderDetail>(await _orderDetailDal.Get(p => p.Id == id));
        }

    }
}
