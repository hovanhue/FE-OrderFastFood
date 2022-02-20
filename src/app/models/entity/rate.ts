import {Product} from './product';
import {User} from './user';

export class Rate {
  id: number;
  start: number;
  comment: string;
  dateRate: Date;
  product: Product;
  productId: number;
  user: User;


  constructor(id: number, start: number, comment: string, productId: number, user: User) {
    this.id = id;
    this.start = start;
    this.comment = comment;
    this.productId = productId;
    this.user = user;
  }
}
