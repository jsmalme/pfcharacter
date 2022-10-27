import { FormGroup } from "@angular/forms";

export function checkValidForm(parentForm: FormGroup, subForm: string){
    if(!parentForm.get(subForm)?.valid){
      return false;
    }
    return true;
  }