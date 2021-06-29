export const stores = [
    { 
        name: 'signin',
        path: '/users/signin',
    },
    { 
        name: 'me',
        path: '/auth/me',
    },
    { 
        name: 'register',
        path: '/users/signup',
    },
    { 
        name: 'users',
        path: '/users/all-users',
    },
    {
        name: 'livelihoodzones',
        path: '/livelihoodzones/all-livelihoodzones',
    },
    {
        name: 'county-livelihoodzones',
        path: '/livelihoodzones/county-livelihoodzones/',
    },
    {
        name: 'update-county-livelihoodzones',
        path: '/livelihoodzones/update-county-livelihoodzones',
    },
    // retrive responses
    {
        name: 'wealth-group-responses',
        path: '/responses/wealthgroup/retrieve/',
    },
    {
        name: 'county-responses',
        path: '/responses/county/retrieve/',
    },
    {
        name: 'wealth-group-questionnaire-id',
        path: '/responses/all-wealth-group-questionnaire-sessions',
    },
    {
        name: 'county-questionnaire-id',
        path: '/responses/all-zone-level-questionnaire-sessions',
    },
    {
        name: 'wealthgroup-distribution',
        path: '/wealthgroup-reports/zone-wealthgroup-distribution/',
    },
    { 
        name: 'roles',
        path: '/users/all-roles',
    },
    {
        name: 'counties',
        path: '/counties/all-counties',
    },
    {
        name: 'request-verification',
        path: '/authorization/users/resend_activation/',
    },
    {
        name: 'email-verification',
        path: '/authorization/users/activation/',
    },
    { 
        name: 'applications',
        path: '/applications/applications/',
    },
    {
        name: 'auto-create-application',
        path: '/applications/applications/auto_create/',
    },
    {
        name: 'attachments',
        path: '/common/attachments/',
    },
    {
        name: 'contacts',
        path: '/common/contacts/',
    },
    {
        name: 'contact-groups',
        path: '/common/contact-groups/',
    },
    {
        name: 'email-groups',
        path: '/common/email-groups/',
    },
    {
        name: 'news-letters',
        path: '/common/news-letters/',
    },
    {
        name: 'communications',
        path: '/common/communications/',
    },
    {
        name: 'application-activities',
        path: '/application/application_activities/',
    },
    {
        name: 'application-activity-allowances',
        path: '/applications/application_activity_allowances/',
    },
    {
        name: 'application-activity-items',
        path: '/applications/application_activity_items/',
    },
    {
        name: 'application-activity-attendees',
        path: '/applications/application_activity_items/',
    },
    {
        name: 'application-activity-mes',
        path: '/applications/application_activity_mes/',
    },
    {
        name: 'application-activity-attachments',
        path: '/applications/application_activity_attachments/',
    },
    { 
        name: 'application-items',
        path: '/applications/application_items/',
    },
    {
        name: 'application-allowances',
        path: '/applications/application_allowances/',
    },
    {
        name: 'application-mes',
        path: '/applications/application_mes/'
    },
    { 
        name: 'application-attendees',
        path: '/applications/application_items/',
    },
    { 
        name: 'application-alternate-funding-sources',
        path: '/applications/alternate_funding_sources/',
    },
    { 
        name: 'application-reviews',
        path: '/applications/application_reviews/',
    },
    { 
        name: 'application-review-attachments',
        path: '/applications/application_review_attachments/',
    },
    { 
        name: 'application-attachments',
        path: '/applications/application_attachments/',
    },
    { 
        name: 'organization-attachments',
        path: '/organizations/organization_attachments/',
    },
    {
        name: 'dashboard-data',
        path: '/applications/dashboard_counts/',
    },
    { 
        name: 'sports-events',
        path: '/common/sport_events/',
    },
    { 
        name: 'sports-categories',
        path: '/common/sport_categories/',
    },
    {
        name: 'billable-items',
        path: '/common/items/',
    },
    {
        name: 'allowances',
        path: '/common/allowances/',
    },
    { 
        name: 'document-types',
        path: '/applications/document_types/',
    },
    { 
        name: 'organizations',
        path: '/organizations/organizations/',
    },
    { 
        name: 'organization-financial-years',
        path: '/organizations/financial_years/',
    },
    { 
        name: 'organization-budgets',
        path: '/organizations/organization_budgets/',
    },
    { 
        name: 'organization-budget-activities',
        path: '/organizations/organization_budget_activities/',
    },
    {
        name: 'organization-budget-activity-items',
        path: '/organizations/organization_budget_activity_items/',
    },
    {
        name: 'organization-budget-activity-attendees',
        path: '/organizations/organization_budget_activity_items/',
    },
    {
        name: 'organization-budget-activity-allowances',
        path: '/organizations/organization_budget_activity_allowances/',
    },
    {
        name: 'organization-budget-activity-attachments',
        path: '/organizations/organization_budget_activity_attachments/',
    },
    {
        name: 'organization-budget-reviews',
        path: '/organizations/organization_budget_reviews/',
    },
    { 
        name: 'organization-budget-reviews',
        path: '/organizations/organization_budget_reviews/',
    },
    { 
        name: 'organization-budget-attachments',
        path: '/organizations/organization_budget_attachments/',
    },
    { 
        name: 'organization-roles',
        path: '/organizations/organization_roles/',
    },
    { 
        name: 'organization-members',
        path: '/organizations/organization_members/',
    },
    {
        name: 'organization-members-download-template',
        path: '/organizations/organization_members/download_template/'
    },
    {
        name: 'organization-members-upload-members',
        path: '/organizations/organization_members/upload_members/'
    },
    { 
        name: 'organization-types',
        path: '/organizations/organization_types/',
    },
    { 
        name: 'organization-roles',
        path: '/organizations/organization_roles/',
    },
    {
        name: 'user-groups',
        path: '/auth/groups/',
    },
    { 
        name: 'organization-bank-accounts',
        path: '/organizations/organization_bank_accounts/',
    },
    { 
        name: 'organization-financial-years',
        path: '/organizations/organization_financial_years/',
    },
    { 
        name: 'organization-join-requests',
        path: '/organizations/organization_join_requests/',
    },
    { 
        name: 'gallery',
        path: '/galleries',
    },
    {
        name: 'complaints',
        path: '/complaints/complaints/',
    },
    {
        name: 'complaint-reviews',
        path: '/complaints/complaint_reviews/',
    },
    {
        name: 'complaint-review-attachments',
        path: '/complaints/complaint_review_attachments/',
    }
]