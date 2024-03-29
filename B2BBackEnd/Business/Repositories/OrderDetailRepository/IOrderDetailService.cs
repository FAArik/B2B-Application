using Core.Utilities.Result.Abstract;
using Entities.Concrete;
using Entities.Dtos;

namespace Business.Repositories.OrderDetailRepository;

public interface IOrderDetailService
{
    Task<IResult> Add(OrderDetail orderDetail);
    Task<IResult> Update(OrderDetail orderDetail);
    Task<IResult> Delete(OrderDetail orderDetail);
    Task<IDataResult<List<OrderDetail>>> GetList();
    Task<IDataResult<List<OrderDetailDto>>> GetListDto(int id);
    Task<IDataResult<List<OrderDetail>>> GetListByOrderId(int orderId);
    Task<List<OrderDetail>> GetListByProductId(int productId);
    Task<IDataResult<OrderDetail>> GetById(int id);
}
