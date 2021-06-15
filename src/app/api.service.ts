import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private SERVER_URL = "http://localhost:3000/products";
  public id = ''
  public status = ''
  public errorMessage = ''
  public postId =''


  constructor(
    private httpClient: HttpClient,
    private router: Router
    ) {
   }

  public get(){  
		return this.httpClient.get(this.SERVER_URL);  
	}

  public getProduct(id: number){  
		return this.httpClient.get(this.SERVER_URL + "/"+ id);  
	}

  public delete(id: String) {
    this.httpClient.delete(this.SERVER_URL + "/"+ id)
    .subscribe(data => {
      this.router.navigate(['/home'])
    });

  }

  public insert(body: any) {
    this.httpClient.post<any>(this.SERVER_URL, body).subscribe(data => {
      this.postId = data.id;
      if (data.id) {
        this.router.navigate( ['/home'])
      }
  })
  }

  public update(id: number, body: any) {
    const headers = { 'Content-Type': 'application/json'}
    this.httpClient.put<any>(this.SERVER_URL+ "/"+ id, body).subscribe(data => {
      this.postId = data.id;
      if (data.id) {
        this.router.navigate( ['/home'])
      }
  })

  }
}