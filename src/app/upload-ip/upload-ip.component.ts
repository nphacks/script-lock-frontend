import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { MetamaskService } from '../services/metamask.service';

@Component({
  selector: 'app-upload-ip',
  templateUrl: './upload-ip.component.html',
  styleUrl: './upload-ip.component.css',
  animations: [
    trigger('slideAnimation', [
      transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate('300ms ease-out', style({ transform: 'translateY(-100%)', opacity: 0 }))
      ]),
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('300ms ease-in', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class UploadIpComponent {
  formData: any = { name: '', description: '', file: null };

  constructor(private apiService: ApiService, private metamaskService: MetamaskService) {}

  onFileChange(event: any) {
    this.formData.file = event.target.files[0];
  }

  onSubmit() {
    const form = new FormData();
    form.append('name', this.formData.name);
    form.append('description', this.formData.description);
    form.append('file', this.formData.file);

    this.apiService.uploadData(form).subscribe({
      next: (response: any) => console.log('Success:', response),
      error: (error: any) => console.error('Error:', error),
    });
  }

  steps = [
    { label: 'Step 1: Permissions', completed: false },
    { label: 'Step 2: Upload IP', completed: false },
    { label: 'Step 3: Sign', completed: false }
  ];

  currentStep = 0;

  completeNextStep() {
    const nextStep = this.steps.find(step => !step.completed);
    if (nextStep) {
      nextStep.completed = true;
    }
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  walletAddress: string | null = null;
  errorMessage: string | null = null;

  async connectToWallet() {
    try {
      this.walletAddress = await this.metamaskService.connectWallet();
      if (this.walletAddress) {
        console.log(this.walletAddress)
      }
    } catch (error) {
      this.errorMessage = 'Failed to connect to MetaMask or fetch wallet details.';
      console.error(error);
    }
  }
}
