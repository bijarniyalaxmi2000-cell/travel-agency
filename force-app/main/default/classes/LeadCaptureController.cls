public with sharing class LeadCaptureController {

    @AuraEnabled
    public static void createLead(String firstName, String lastName, String email, String phone, String company, String clientType, String destination, Date travelStartDate, Date travelEndDate, Integer numTravelers, String packageType, String source) {

        Lead newLead = new Lead();

        newLead.FirstName = firstName;
        newLead.LastName = lastName;
        newLead.Email = email;
        newLead.Phone = phone;
        newLead.Company = company;
        newLead.Client_Type__c = clientType;
        newLead.Destination__c = destination;
        newLead.Travel_Start_Date__c = travelStartDate;
        newLead.Travel_End_Date__c = travelEndDate;
        newLead.Number_of_Travelers__c = numTravelers;
        newLead.Package_Type__c = packageType;
        newLead.Source__c = source;
        newLead.LeadSource = 'Web';

        try {
            insert newLead;
        } catch (Exception e) {
            throw new AuraHandledException('Lead create karne me error aa gaya: ' + e.getMessage());
        }
    }
}
