import { Component, signal } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { RuleModel } from '../../store/rules.store';
import { RuleFormComponent } from '../rule-form/rule-form.component';



@Component({
  selector: 'app-rules-side-bar',
  standalone: true,
  imports: [AccordionModule, MenuModule , ButtonModule , MenubarModule , RuleFormComponent],
  templateUrl: './rules-side-bar.component.html',
  styleUrl: './rules-side-bar.component.scss'
})
export class RulesSideBarComponent {

  menuItems = [
    {
        label: 'Adicionar',
        icon: 'pi pi-fw pi-plus',
    },
    // {
    //     label: 'Delete',
    //     icon: 'pi pi-fw pi-trash'
    // }
  ];

  rulesItems = signal<RuleModel[]>([])

}
