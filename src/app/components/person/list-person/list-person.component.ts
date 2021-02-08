import { Component, OnInit } from '@angular/core';
import { SweetAlertUtil } from 'src/app/core/utilities/sweet-alert.util';
import { PersonDto, PersonSearchDto } from 'src/app/models/dto/person-dto';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-list-person',
  templateUrl: './list-person.component.html',
  styleUrls: ['./list-person.component.scss']
})
export class ListPersonComponent implements OnInit {

  persons: PersonDto[] = new Array<PersonDto>();
  constructor(private personService: PersonService, private sweet: SweetAlertUtil) { }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.personService.GetPerson(new PersonSearchDto()).subscribe(res => {
      if (res.isSuccessful) {
        this.persons = res.result;
      }
    });
  }

  onDelete(id: string, index: number){
    this.sweet.ShowConfirm('Eliminar', '¿Esta seguro de eliminar esta persona?', () => {
      this.personService.DeletePerson(id).subscribe(res => {
        if (res.isSuccessful) {
          this.sweet.ShowSuccess('Eliminar', res.message);
          this.persons.splice(index, 1);
        }
      });
    });
  }
}
