import {Pipe, PipeTransform} from '@angular/core';
@Pipe ({
   name : 'arrayjoin'
})
export class ArrayJoinPipe implements PipeTransform {
   transform(list: any[], nestedObj?: any, property?: any): string {
      if (nestedObj) {
        return list.map(item => item[nestedObj][property]).join(', ');
      } else {
        return list.map(item => item[property]).join(', ');
      }
   }
}
