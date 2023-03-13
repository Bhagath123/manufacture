import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getProducts(){
    return this.http.get('http://127.0.0.1:8000/api/products');
   }

   getParts(){
    return this.http.get(`http://127.0.0.1:8000/api/parts`);
   }

   getPartsByProduct(products:any){
    if(products.length>0){
    return this.http.get(`http://127.0.0.1:8000/api/parts?product_ids=[${products}]`);
    }else{
      return this.getParts();
    }
   }


   addProduct(data:any){
    console.log(data,'post category');
    return this.http.post('http://127.0.0.1:8000/api/products',data);
   }

   addParts(data:any){
    console.log(data,'post category');
    return this.http.post('http://127.0.0.1:8000/api/parts',data);
   }

   getProductById(id:any){
   
    return this.http.get(`http://127.0.0.1:8000/api/products/${id}`);
   }

   getPartsById(id:any){
   
    return this.http.get(`http://127.0.0.1:8000/api/parts/${id}`);
   }

   updateProductById(data:any,id:number){
   
    return this.http.post(`http://127.0.0.1:8000/api/products/${id}`,data);
   }

   deleteProductImageById(id:number){
   
    return this.http.delete(`http://127.0.0.1:8000/api/destroyproductimage/${id}`);
   }

   deletePartImageById(id:number){
   
    return this.http.delete(`http://127.0.0.1:8000/api/destroypartimage/${id}`);
   }

   updatePartsById(data:any,id:number){
   
    return this.http.post(`http://127.0.0.1:8000/api/parts/${id}`,data);
   }

   getCategory(){
    return this.http.get('http://127.0.0.1:8000/api/categories');
   }

   addCategory(data:any){
    console.log(data,'post category');
    return this.http.post('http://127.0.0.1:8000/api/categories',data);
   }

   getCategoryById(id:any){
   
    return this.http.get(`http://127.0.0.1:8000/api/categories/${id}`);
   }

   updateCategoryById(data:any){
   
    return this.http.put(`http://127.0.0.1:8000/api/categories/${data.id}`,data);
   }
 
  //  register(details:any){
  //    return this.http.post(this.api_register,details);
  //   }
}
