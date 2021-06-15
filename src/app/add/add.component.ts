import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Input } from '@angular/core';
import { FormBuilder, FormsModule, FormGroup } from '@angular/forms';
// import { Person } from './person';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  
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
 
  }

  saveForm() {
    let body = {}

    body['artist'] = this.personForm.value;
    body['title'] = this.personForm.value;
    body['year'] = this.personForm.value;

    body = this.personForm.value; 
    this.apiService.insert(body)
  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
  }

}
