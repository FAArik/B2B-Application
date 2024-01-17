import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderDetail'
})
export class OrderDetailPipe implements PipeTransform {

  transform(value: any[], filterText: string, statusText: string): any[] {
    if (filterText == null && statusText == "Tümü" || filterText == "" && statusText == "Tümü") {
      return value;
    }
    else if (filterText == null && statusText != "Tümü" || filterText == "" && statusText != "Tümü") {
      let returnvalue = value.filter(p => p.status == statusText);
      return returnvalue;
    }
    let returnvalue = value.filter(p => p.status == statusText);
    return returnvalue.filter(p => {
      const customerName = p.customerName.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
      const ordernumber = p.orderNumber.includes(filterText)
      return (customerName + ordernumber);
    });
  }
}
