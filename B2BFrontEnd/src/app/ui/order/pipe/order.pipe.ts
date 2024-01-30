import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderPipe'
})
export class OrderPipe implements PipeTransform {

  transform(value: any[], filterText: string): any[] {
    if (filterText == null && filterText == "") {
      return value;
    }

  
    return value.filter(p => {
      const customerName = p.customerName.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
      const ordernumber = p.orderNumber.includes(filterText)
      return (customerName + ordernumber);
    });
  }

}
