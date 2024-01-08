import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pricelistPipe'
})
export class PricelistpipePipe implements PipeTransform {

  transform(value: any[], filterText: string): any[] {
    if (filterText == null || filterText == "") {
      return value;
    }
    return value.filter(p => {
      const name = p.name.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
      return name;
    });
  }
}
