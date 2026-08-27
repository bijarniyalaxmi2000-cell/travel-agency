import { LightningElement, track } from 'lwc';
import createLead from '@salesforce/apex/LeadCaptureController.createLead';

export default class LeadCaptureForm extends LightningElement {
    @track isSubmitting = false;
    @track errorMessage = '';

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
        const field = event.target.dataset.field;
        this[field] = event.target.value;
    }

    async handleSubmit() {
        const allValid = [...this.template.querySelectorAll('lightning-input, lightning-combobox')]
            .reduce((validSoFar, field) => {
                field.reportValidity();
                return validSoFar && field.checkValidity();
            }, true);

        if (!allValid) {
            return;
        }

        this.isSubmitting = true;
        this.errorMessage = '';

        try {
            await createLead({
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                phone: this.phone,
                company: this.company,
                clientType: this.clientType,
                destination: this.destination,
                travelStartDate: this.travelStartDate || null,
                travelEndDate: this.travelEndDate || null,
                numTravelers: this.numTravelers ? parseInt(this.numTravelers, 10) : null,
                packageType: this.packageType,
                source: this.source
            });
            window.open('https://orgfarm-7e0a5e4f0c-dev-ed.develop.lightning.force.com/lightning/n/Lead_Thank_You', '_blank');
            this.resetForm();
        } catch (error) {
            this.errorMessage = error.body ? error.body.message : 'Something went wrong. Please try again.';
        } finally {
            this.isSubmitting = false;
        }
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

        this.template.querySelectorAll('lightning-input, lightning-combobox').forEach(field => {
            field.value = '';
        });
    }
}