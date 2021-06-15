import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Input } from '@angular/core';
import { FormBuilder, FormsModule, FormGroup } from '@angular/forms';
// import { Person } from './person';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  
  public personForm: FormGroup;
  id!: number;
  private sub: any;
  product!: Object
  person: any;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private fb: FormBuilder
    ) { 

      this.personForm = this.fb.group({
        artist: '',
        title: '',
        year: ''
        
      });
    }
    

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; 
      // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
   });

   this.apiService.getProduct(this.id).subscribe((data: Object) => {
    this.product = data
    this.personForm.controls["artist"].setValue(this.product['artist']);
    this.personForm.controls["title"].setValue(this.product['title']);
    this.personForm.controls["year"].setValue(this.product['year']);
  })
  }

  saveForm() {
    this.product['artist'] = this.personForm.value;
    this.product['title'] = this.personForm.value;
    this.product['year'] = this.personForm.value;

    let body = {}
    body = this.personForm.value; 
    this.apiService.update(this.id, body)
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
