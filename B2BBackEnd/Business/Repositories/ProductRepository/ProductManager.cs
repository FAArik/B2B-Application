using Business.Aspects.Secured;
using Business.Repositories.BasketRepository;
using Business.Repositories.OrderDetailRepository;
using Business.Repositories.PriceListDetailRepository;
using Business.Repositories.ProductImageRepository;
using Business.Repositories.ProductRepository.Constants;
using Business.Repositories.ProductRepository.Validation;
using Core.Aspects.Caching;
using Core.Aspects.Performance;
using Core.Aspects.Validation;
using Core.Utilities.Business;
using Core.Utilities.Result.Abstract;
using Core.Utilities.Result.Concrete;
using DataAccess.Repositories.ProductRepository;
using Entities.Concrete;
using Entities.Dtos;

namespace Business.Repositories.ProductRepository;

public class ProductManager : IProductService
{
    private readonly IProductDal _productDal;
    private readonly IProductImageService _productImageService;
    private readonly IPriceListDetailService _priceListDetailService;
    private readonly IBasketService _basketService;
    private readonly IOrderDetailService _orderDetailService;

    public ProductManager(IProductDal productDal, IProductImageService productImageService, IPriceListDetailService priceListDetailService, IBasketService basketService, IOrderDetailService orderDetailService)
    {
        _productDal = productDal;
        _productImageService = productImageService;
        _priceListDetailService = priceListDetailService;
        _basketService = basketService;
        _orderDetailService = orderDetailService;
    }

    [SecuredAspect("admin,product.add")]
    [ValidationAspect(typeof(ProductValidator))]
    [RemoveCacheAspect("IProductService.Get")]

    public async Task<IResult> Add(Product product)
    {
        await _productDal.Add(product);
        return new SuccessResult(ProductMessages.Added);
    }

    [SecuredAspect("admin,product.update")]
    [ValidationAspect(typeof(ProductValidator))]
    [RemoveCacheAspect("IProductService.Get")]

    public async Task<IResult> Update(Product product)
    {
        await _productDal.Update(product);
        return new SuccessResult(ProductMessages.Updated);
    }

    [SecuredAspect("admin,prodcut.delete")]
    [RemoveCacheAspect("IProductService.Get")]

    public async Task<IResult> Delete(Product product)
    {
        IResult result = BusinessRules.Run(
           await CheckIfProductExistInBaskets(product.Id),
           await CheckIfProductExistInOrderDetails(product.Id)
            );

        if (result != null)
        {
            return result;
        }

        var images = await _productImageService.GetListByProductId(product.Id);
        foreach (var image in images.Data)
        {
            await _productImageService.Delete(image);
        }

        var pricelistProducts = await _priceListDetailService.GetListByProductId(product.Id);
        foreach (var item in pricelistProducts)
        {
            await _priceListDetailService.Delete(item);
        }

        await _productDal.Delete(product);
        return new SuccessResult(ProductMessages.Deleted);
    }

    [SecuredAspect("admin,prodcut.get")]
    [PerformanceAspect()]
    public async Task<IDataResult<List<ProductListDto>>> GetList()
    {
        return new SuccessDataResult<List<ProductListDto>>(await _productDal.GetListDto());
    }

    [SecuredAspect("admin,prodcut.delete")]
    public async Task<IDataResult<Product>> GetById(int id)
    {
        return new SuccessDataResult<Product>(await _productDal.Get(p => p.Id == id));
    }

    //[SecuredAspect("admin,prodcut.get")]
    [PerformanceAspect()]
    public async Task<IDataResult<List<ProductListDto>>> GetProductList(int customerId)
    {
        return new SuccessDataResult<List<ProductListDto>>(await _productDal.GetProductList(customerId));
    }

    public async Task<IResult> CheckIfProductExistInBaskets(int productId)
    {
        var result = await _basketService.GetListByProductId(productId);
        if (result.Count() > 0)
        {
            return new ErrorResult("Silmeye �al��t���n�z �r�n sepette bulunuyor!");
        }
        return new SuccessResult();
    }
    public async Task<IResult> CheckIfProductExistInOrderDetails(int productId)
    {
        var result = await _orderDetailService.GetListByProductId(productId);
        if (result.Count() > 0)
        {
            return new ErrorResult("Silmeye �al��t���n�z �r�n�n sipari�i var!");
        }
        return new SuccessResult();
    }
}
