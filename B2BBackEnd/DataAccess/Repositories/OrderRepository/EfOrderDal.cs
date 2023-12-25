using Core.DataAccess.EntityFramework;
using DataAccess.Context.EntityFramework;
using Entities.Concrete;

namespace DataAccess.Repositories.OrderRepository
{
    public class EfOrderDal : EfEntityRepositoryBase<Order, SimpleContextDb>, IOrderDal
    {
        public string GetOrderNumber()
        {
            using (var context = new SimpleContextDb())
            {
                var lastOrder = context.Orders.OrderByDescending(x=>x.Id).LastOrDefault();

                if (lastOrder == null)
                {
                    return "SP00000000000001";
                }
                var findlastOrderNumber = lastOrder.OrderNumber;

                findlastOrderNumber = findlastOrderNumber.Substring(2, 14);
                int ordernumber = Convert.ToInt16(findlastOrderNumber);
                ordernumber++;
                string newOrderNumber = ordernumber.ToString();
                for (int i = newOrderNumber.Length; i < 14; i++)
                {
                    newOrderNumber = "0" + newOrderNumber;
                }
                newOrderNumber = "SP" + newOrderNumber;
                return newOrderNumber;

            }
        }
    }
}
