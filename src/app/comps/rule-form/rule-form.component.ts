import { Component, computed, model } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ColorPickerModule } from 'primeng/colorpicker';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-rule-form',
  standalone: true,
  imports: [ColorPickerModule , InputTextModule , FormsModule, ButtonModule],
  templateUrl: './rule-form.component.html',
  styleUrl: './rule-form.component.scss'
})
export class RuleFormComponent {
  
  
  
  color = model<string>()
  label = model<string>()

  btnLabel = computed( () => {
    return( ! this.label()) ? 'Adicionar' : 'Confirmar' 
  })

  add() {
    if (!this.label()) {
      this.label.set('label automatico')
    }
  }



}
