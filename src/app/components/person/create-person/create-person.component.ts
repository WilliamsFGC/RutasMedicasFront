import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SweetAlertUtil } from 'src/app/core/utilities/sweet-alert.util';
import { DocumentTypeDto } from 'src/app/models/dto/document-type-dto';
import { EpsDto, EpsPersonDto } from 'src/app/models/dto/eps-dto';
import { PersonDto, SexDto } from 'src/app/models/dto/person-dto';
import { DocumentTypeService } from 'src/app/services/document-type.service';
import { EpsService } from 'src/app/services/eps.service';
import { PersonService } from 'src/app/services/person.service';
import { UtilitiesUtil } from 'src/app/core/utilities/utilities.util'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.scss']
})
export class CreatePersonComponent implements OnInit {

  title: string = '';
  personForm: FormGroup;
  documentTypes: DocumentTypeDto[] = new Array<DocumentTypeDto>();
  correosElectronicos = new Array<object>({ email: "", valid: true }, { email: "", valid: true }, { email: "", valid: true });
  eps = new Array<EpsPersonDto>();
  sexList = new Array<SexDto>();
  otherSexId: number = 3;
  submited: boolean = false;
  utilities: UtilitiesUtil = new UtilitiesUtil();
  // Dialogo
  epsFinded: EpsDto[] = new Array<EpsDto>();
  searchEps: FormGroup;
  isUpdate: boolean = false;

  constructor(private builder: FormBuilder, private personService: PersonService,
    private documentTypeService: DocumentTypeService, private sweet: SweetAlertUtil,
    private epsService: EpsService, private current: ActivatedRoute, private router: Router) { }

  get controls() {
    return this.personForm.controls;
  }

  get controlsIdentidad() {
    return (this.personForm.controls['identidad'] as FormGroup).controls;
  }

  get existsEmail() {
    return this.correosElectronicos.filter(f => f['email'] !== '').length > 0;
  }

  ngOnInit(): void {
    const regexDate = /^\d{4}[./-]\d{2}[./-]\d{2}$/;
    this.personForm = this.builder.group({
      _id: [null],
      tipoDocumento: [0, [Validators.required]],
      numeroDocumento: ['', [Validators.required, Validators.maxLength(20)]],
      primerNombre: ['', [Validators.required, Validators.maxLength(15)]],
      segundoNombre: ['', [Validators.maxLength(15)]],
      primerApellido: ['', [Validators.required, Validators.maxLength(15)]],
      segundoApellido: ['', [Validators.maxLength(15)]],
      fechaNacimiento: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(regexDate)]],
      estadoCivil: ['', [Validators.required]],
      sexo: [0, [Validators.required]],
      otroSexo: [''],
      identidad: this.builder.group({
        fechaExpedicion: [null, [Validators.required, Validators.maxLength(10), Validators.pattern(regexDate)]],
        lugarExpedicion: ['', [Validators.required, Validators.maxLength(30)]]
      })
    });

    this.searchEps = this.builder.group({
      entidad: ['']
    });
    // Invocar servicios
    this.GetDocumentTypes();
    this.GetSexList();

    // Verificar el origen
    this.current.url.subscribe(res => {
      this.isUpdate = res[0]?.path == 'update';
      this.title = (this.isUpdate) ? 'Actualizar paciente' : 'Agregar paciente';
      if (this.isUpdate) {
        const data = history.state.data;
        if (data === undefined) {
          this.router.navigate(['create'], { relativeTo: this.current.parent });
          return;
        }
        const person = data as PersonDto;
        person['otroSexo'] = person.sexo.otro;
        // Agregar valores al formulario
        this.personForm.controls['_id'].setValue(person._id);
        this.personForm.controls['numeroDocumento'].setValue(person.numeroDocumento);
        this.personForm.controls['primerNombre'].setValue(person.primerNombre);
        this.personForm.controls['segundoNombre'].setValue(person.segundoNombre);
        this.personForm.controls['primerApellido'].setValue(person.primerApellido);
        this.personForm.controls['segundoApellido'].setValue(person.segundoApellido);
        this.personForm.controls['fechaNacimiento'].setValue(this.utilities.GetDateStringYYYMMDD(person.fechaNacimiento));
        this.personForm.controls['estadoCivil'].setValue(person.estadoCivil);
        // this.personForm.controls['sexo'].setValue(itemSexo);
        this.personForm.controls['otroSexo'].setValue(person.sexo.otro);
        const identidadGroup = this.personForm.controls['identidad'] as FormGroup;
        identidadGroup.controls['fechaExpedicion'].setValue(this.utilities.GetDateStringYYYMMDD(person.identidad.fechaExpedicion));
        identidadGroup.controls['lugarExpedicion'].setValue(person.identidad.lugarExpedicion);

        // asignar correos
        this.correosElectronicos = new Array<object>();
        for (let i = 0; i < person.correoElectronico.length; i++) {
          this.correosElectronicos.push({ email: person.correoElectronico[i], valid: true });
        }

        // asignar eps
        this.eps = person.eps;

        this.personForm.controls['_id'].setValidators([Validators.required]);
        this.personForm.updateValueAndValidity();
      }
    });
  }

  GetDocumentTypes() {
    this.documentTypeService.GetDocumentTypes().subscribe(res => {
      if (res.isSuccessful) {
        this.documentTypes = res.result;
        // Asignar valor de la lista de tipos de documento
        const person = history.state.data as PersonDto;
        if (person === undefined) {
          return;
        }
        this.personForm.controls['tipoDocumento'].setValue(person.tipoDocumento.codigo);
      }
    });
  }

  GetSexList() {
    this.personService.GetSexList().subscribe(res => {
      if (res.isSuccessful) {
        // Asignar valor de la lista de sexo
        this.sexList = res.result;
        const person = history.state.data as PersonDto;
        if (person !== undefined) {
          this.personForm.controls['sexo'].setValue(person.sexo._id);
        }
      }
    });
  }

  onChangeSex() {
    const sexItem = this.personForm.controls['sexo'].value as number;
    const controlOtroSexo = this.personForm.controls['otroSexo'];
    controlOtroSexo.clearValidators();
    if (sexItem === this.otherSexId) {
      controlOtroSexo.setValidators([Validators.required]);
    }
    controlOtroSexo.updateValueAndValidity();
  }

  onSubmit() {
    this.submited = true;
    if (this.personForm.invalid || !this.existsEmail) {
      return;
    }

    const person = this.personForm.value as PersonDto;
    // Asignar y validar correos
    person.correoElectronico = new Array<string>();
    let validEmails = true;
    for (let i = 0; i < this.correosElectronicos.length; i++) {
      const email = this.correosElectronicos[i]['email'];
      const valid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email) || email === '';
      this.correosElectronicos[i]['valid'] = valid;
      person.correoElectronico.push(this.correosElectronicos[i]['email']);
      validEmails = validEmails && valid;
    }
    if (!validEmails) {
      return;
    }
    person.eps = this.eps;
    // Validar sexo
    const sexItem = this.personForm.controls['sexo'].value as number;
    const sexoSeleccionado = this.sexList.find(f => f._id === sexItem);
    if (sexItem === this.otherSexId) {
      sexoSeleccionado.otro = this.personForm.controls['otroSexo'].value;
    }
    person.sexo = sexoSeleccionado;
    // Obtener tipo documento
    const tipoDocumento = this.personForm.controls['tipoDocumento'].value as number;
    const tipoDocumentoSeleccionado = this.documentTypes.find(f => f.codigo === tipoDocumento);
    person.tipoDocumento = tipoDocumentoSeleccionado;
    if (!this.isUpdate) {
      this.personService.SavePerson(person).subscribe(res => {
        if (res.isSuccessful) {
          this.sweet.ShowSuccess('Crear persona', res.message);
        }
      });
    } else {
      this.personService.UpdatePerson(person).subscribe(res => {
        if (res.isSuccessful) {
          this.sweet.ShowSuccess('Actualizar persona', res.message);
        }
      });
    }
  }

  // Dialogo
  SearchEps() {
    const entidad = this.searchEps.controls['entidad'].value;
    this.epsService.GetEps(entidad).subscribe(res => {
      if (res.isSuccessful) {
        this.epsFinded = res.result;
      }
    });
  }

  ShowDialog(id: string) {
    const dialog = document.getElementById(id);
    if (dialog === null) {
      return;
    }
    dialog.classList.remove('hide');
    // mostrar overlay
    const overlay = document.getElementsByClassName('dialog-overlay');
    for (let i = 0; i < 1; i++) {
      overlay[i].classList.remove('hide');
    }
  }

  HideDialog() {
    const dialogs = document.getElementsByClassName('dialog-container');
    for (let i = 0; i < dialogs.length; i++) {
      if (!dialogs[i].classList.contains('hide')) {
        dialogs[i].classList.add('hide');
      }
    }
    // ocultar overlay
    const overlay = document.getElementsByClassName('dialog-overlay');
    for (let i = 0; i < 1; i++) {
      if (!overlay[i].classList.contains('hide')) {
        overlay[i].classList.add('hide');
      }
    }
  }

  onAddingEps() {
    this.ShowDialog('addEps');
  }

  MarkAsActive(epsItem: EpsPersonDto){
    for(let eps of this.eps){
      eps.estadoAfiliacion = eps.idEntidad === epsItem.idEntidad;
    }
  }

  ClearModal() {
    this.searchEps.controls['entidad'].setValue(null);
    this.epsFinded = new Array<EpsDto>();
  }

  SelectEpsItem(epsItem: EpsDto) {
    if (this.eps.find(f => f.idEntidad === epsItem._id) !== undefined) {
      this.sweet.ShowInfo('Eps', 'Esta eps ya se le ha asignado previamente');
      return;
    }
    this.sweet.ShowConfirm('Agregar Eps', `¿Desea agregar ${epsItem.entidad} a la lista de Eps?`, () => {
      if (this.eps.length === 0) {
        const epsPerson = new EpsPersonDto(epsItem._id, epsItem.entidad, new Date(Date.now()), true);
        this.eps.push(epsPerson);
      } else {
        // Marcar las anteriores Eps como inactivas
        for (let i = 0; i < this.eps.length; i++) {
          this.eps[i].estadoAfiliacion = false;
        }
        const epsPerson = new EpsPersonDto(epsItem._id, epsItem.entidad, new Date(Date.now()), true);
        this.eps.push(epsPerson);
        this.sweet.ShowInfo('Afiliación Eps', 'Se ha marcado la nueva eps como activa.');
      }
      this.ClearModal();
      this.HideDialog();
    });
  }
}
