import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    message: ''
  };
  isSubmitting = false;
  submitStatus = {
    success: false,
    error: false,
    message: ''
  };

  async onSubmit() {
    if (this.isSubmitting) return;
    
    this.isSubmitting = true;
    this.submitStatus = { success: false, error: false, message: '' };

    try {
      await emailjs.send(
        'service_a21qqgr', // Replace with your EmailJS service ID
        'template_hc4dixn', // Replace with your EmailJS template ID
        {
          from_name: this.formData.name,
          from_email: this.formData.email,
          message: this.formData.message,
          to_name: 'Abdelrahman Elkhouly',
          reply_to: this.formData.email,
        },
        '6Lw9N3eUixQqph2DP' // Replace with your EmailJS public key
      );

      this.submitStatus = {
        success: true,
        error: false,
        message: 'Message sent successfully!'
      };
      this.formData = { name: '', email: '', message: '' };
    } catch (error) {
      this.submitStatus = {
        success: false,
        error: true,
        message: 'Failed to send message. Please try again.'
      };
    } finally {
      this.isSubmitting = false;
    }
  }
}
