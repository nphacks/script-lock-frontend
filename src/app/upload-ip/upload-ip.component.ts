import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-upload-ip',
  templateUrl: './upload-ip.component.html',
  styleUrl: './upload-ip.component.css'
})
export class UploadIpComponent {
  formData: any = { name: '', description: '', file: null };

  constructor(private apiService: ApiService) {}

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
}
