import { LightningElement } from 'lwc';
import createLead from '@salesforce/apex/LeadCaptureController.createLead';

export default class LeadCaptureForm extends LightningElement {

    isSubmitting = false;
    errorMessage = '';

    firstName = '';
    lastName = '';
    email = '';
    phone = '';
    company = '';
    clientType = '';
    destination = '';
    travelStartDate = '';
    travelEndDate = '';
    numTravelers = '';
    packageType = '';
    source = '';

    clientTypeOptions = [
        { label: '--None--', value: '' },
        { label: 'Corporate Client', value: 'Corporate Client' },
        { label: 'Partner Agency', value: 'Partner Agency' },
        { label: 'Individual Business', value: 'Individual Business' }
    ];

    packageTypeOptions = [
        { label: '--None--', value: '' },
        { label: 'Flight Only', value: 'Flight Only' },
        { label: 'Hotel Only', value: 'Hotel Only' },
        { label: 'Flight+Hotel', value: 'Flight+Hotel' },
        { label: 'Full Package', value: 'Full Package' },
        { label: 'Custom', value: 'Custom' }
    ];

    sourceOptions = [
        { label: '--None--', value: '' },
        { label: 'Referral', value: 'Referral' },
        { label: 'Website', value: 'Website' },
        { label: 'Direct', value: 'Direct' },
        { label: 'Partner Agency', value: 'Partner Agency' }
    ];

    handleChange(event) {
        const fieldName = event.target.dataset.field;
        this[fieldName] = event.target.value;
    }

    handleSubmit() {

        if (this.firstName === '') {
            this.errorMessage = 'Please enter First Name';
            return;
        }

        if (this.lastName === '') {
            this.errorMessage = 'Please enter Last Name';
            return;
        }

        if (this.email === '') {
            this.errorMessage = 'Please enter Email';
            return;
        }

        this.errorMessage = '';
        this.isSubmitting = true;

        let travelersCount = null;
        if (this.numTravelers !== '') {
            travelersCount = parseInt(this.numTravelers, 10);
        }

        createLead({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phone: this.phone,
            company: this.company,
            clientType: this.clientType,
            destination: this.destination,
            travelStartDate: this.travelStartDate,
            travelEndDate: this.travelEndDate,
            numTravelers: travelersCount,
            packageType: this.packageType,
            source: this.source
        })
        .then(() => {
            window.open('https://orgfarm-7e0a5e4f0c-dev-ed.develop.lightning.force.com/lightning/n/Lead_Thank_You', '_blank');
            this.resetForm();
            this.isSubmitting = false;
        })
        .catch((error) => {
            this.errorMessage = 'Something went wrong. Please try again.';
            this.isSubmitting = false;
        });
    }

    resetForm() {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.phone = '';
        this.company = '';
        this.clientType = '';
        this.destination = '';
        this.travelStartDate = '';
        this.travelEndDate = '';
        this.numTravelers = '';
        this.packageType = '';
        this.source = '';
    }
}