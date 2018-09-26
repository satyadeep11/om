import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'genderfilter'
})
export class GenderFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
      if(!items) return [];
      if(!searchText) return items;
      searchText = searchText.toLowerCase();
      return items.filter( it => {
        return it.product.ProductName.toLowerCase().includes(searchText);
      });
   }
} 