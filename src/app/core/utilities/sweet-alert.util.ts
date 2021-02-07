import { Injectable } from "@angular/core";

import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class SweetAlertUtil {
    ShowInfo(title: string, text: string){
        Swal.fire({
            title: title,
            text: text,
            icon: 'info'
        });
    }

    ShowError(title: string, text: string){
        Swal.fire({
            title: title,
            text: text,
            icon: 'error'
        });
    }

    ShowSuccess(title: string, text: string){
        Swal.fire({
            title: title,
            text: text,
            icon: 'success'
        });
    }

    ShowConfirm(title: string, text: string, callbackConfirm: Function, callbackCancel?: Function, callbackFinish?: Function) {
        Swal.fire({
            title: title,
            text: text,
            icon: 'question',
            showCancelButton: true,
            showConfirmButton: true
        }).then((value: SweetAlertResult<any>) => {
            if (value.isConfirmed) {
                callbackConfirm();
            } else if (callbackCancel !== undefined && callbackCancel !== null) {
                callbackCancel();
            }

            if (callbackFinish !== undefined && callbackFinish !== null){
                callbackFinish();
            }
        });
    }
}