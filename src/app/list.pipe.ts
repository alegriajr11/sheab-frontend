import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'list'
})
export class ListPipe implements PipeTransform {

  transform(value: any[], args: string[]): any {
    let lists = [];
    for(let list in value){
      lists.push({ list: list, value: value[list] });
    }
    return lists;
  }

}


// import { PipeTransform, Pipe } from '@angular/core';

// @Pipe({ name: 'keys' })
// export class KeysPipe implements PipeTransform {
//     transform(value, args: string[]): any {
//         let keys = [];
//         for (let key in value) {
//             keys.push({ key: key, value: value[key] });
//         }
//         return keys;
//     }
// }
