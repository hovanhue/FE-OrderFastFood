import { Component, OnInit } from '@angular/core';
import {Rate} from '../../../models/entity/rate';
import {Product} from '../../../models/entity/product';
import {Cart} from '../../../models/entity/cart';
import {CartDetail} from '../../../models/entity/cart-detail';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../../service/product.service';
import {TokenStorageService} from '../../../service/token-storage.service';
import {MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {ProductCategoryService} from '../../../service/product-category.service';
import {CartService} from '../../../service/cart.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  rates: Rate[];
  products: Product[];
  cart: Cart;
  cartDetail: CartDetail;
  isLoggedIn = false;
  currentRate = 0;
  rate = 0;
  rateLength = 0;

  isLoading = true;
  product: Product;
  productsSuggest: Product[];
  productId: number;
  totalItems = 0;

  constructor(private routeActive: ActivatedRoute,
              private productService: ProductService,
              private route: Router,
              private tokenStorageService: TokenStorageService,
              private router: Router,
              public dialog: MatDialog,
              private toastr: ToastrService,
              private cartService: CartService,
              private productCategoryService: ProductCategoryService) {}

  ngOnInit(): void {
    this.routeActive.paramMap.subscribe(() => {
      this.getProduct();
    });

  }


  getProduct(){
    this.productId = +this.routeActive.snapshot.paramMap.get('id');
    this.productService.getProductById(this.productId).subscribe(data => {
      this.product = data;
      console.log(data);
      this.productService.getProductByCategory(0, 5, this.product.category.id).subscribe(data => {
        this.productsSuggest = data.content;
      });
      this.getStar();
    });
  }

  getStar(){
    if (this.product.rates.length > 0){
      let rate = 0;
      let rateLength = 0;
      for (const tempRate of this.product.rates) {
        if(tempRate.start !== 0){
          rate += tempRate.start;
          rateLength += 1;
        }
      }
      this.rate = rate / rateLength;
      this.rateLength = rateLength;
      this.rates = this.product.rates;
      this.rateLength = this.products.length;
      console.log(this.rateLength);
    }else{
      this.rate = 0;
      this.rateLength = 0;
    }

  }

  addCart(productId: number, price: number) {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const userid = this.tokenStorageService.getUser().id;
      this.cartService.getAllCartByUserId(userid).subscribe(data => {
        this.cart = data[0];

        const product = new Product();
        product.id = productId;
        const cart = new Cart();
        cart.id = this.cart.id;
        this.cartDetail = new CartDetail(1, product, cart);
        this.cartService.saveCartDetail(this.cartDetail).subscribe(data => {
          this.toastr.success('Thêm vào giỏ hàng thành công!', 'Hệ thống!');
          this.cartService.getCartDetailByCartId(this.cart.id).subscribe(data => {
            console.log(data);
            data.forEach(item => {
              this.totalItems += item.quantity;
            });
            this.cartService.setData(this.totalItems);
            this.totalItems = 0;
          });
        }, error => {
          alert('handleError_1');
        });
      }, error => {
        alert('handleError');
      });
    }else{
      this.router.navigateByUrl('login');
    }

  }

}
