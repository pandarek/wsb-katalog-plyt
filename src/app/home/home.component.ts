import { Component, OnInit } from '@angular/core';  
import { ApiService } from '../api.service';

@Component({  
	selector: 'app-home',  
	templateUrl: './home.component.html',  
	styleUrls: ['./home.component.css']  
})  
export class HomeComponent implements OnInit {

	public products = [];
	constructor(
    private apiService: ApiService

    ) { }

	ngOnInit() {
		this.apiService.get().subscribe((data: any )=>{  
			this.products = data;  
		})  
	}


  deleteProduct(id: string) {
    let del = confirm('Czu napewno usunąć?')
    if (del == true) {
      this.apiService.delete(id)
    }
  }

}