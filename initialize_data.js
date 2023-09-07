const {
    AdminVar: AdminVarData,
    defaultAdminVarData,
} = require('./models/admin_var.model');
const {
    ListeningQ: ListeningQData,
    defaultListeningQData,
} = require('./models/listeningQ.model');
const {
    WritingQ: WritingQData,
    defaultWritingQData,
} = require('./models/writingQ.model');
const {
    ProficiencyQ: ProficiencyQData,
    defaultProficiencyQData,
} = require('./models/proficiencyQ.model');

const {
    Pricing: PricingData,
    defaultPricingData,
} = require('./models/pricing.model');

const { FAQ: FAQData, defaultFAQs } = require('./models/faq.model');

const initialize_data = async () => {
    // Admin Variables
    if (process.env.ADMIN_VAR_ID) {
        try {
            const adminVarDataCount = await AdminVarData.countDocuments();
            if (adminVarDataCount === 0) {
                await AdminVarData.create(defaultAdminVarData);
            }
        } catch (error) {
            console.log('Error Initializing Admin Variables Data: ', error);
        }
    }

    // Writing Questions
    try {
        const wQcount = await WritingQData.countDocuments();
        if (wQcount === 0) {
            await WritingQData.create(defaultWritingQData);
        }
    } catch (error) {
        console.log('Error Initializing Writing Pre-Test Data: ', error);
    }

    // Listening Questions
    try {
        const lQcount = await ListeningQData.countDocuments();
        if (lQcount === 0) {
            await ListeningQData.create(defaultListeningQData);
        }
    } catch (error) {
        console.log('Error Initializing Listening Pre-Test Data: ', error);
    }

    // Proficiency Questions
    try {
        const pQcount = await ProficiencyQData.countDocuments();
        if (pQcount === 0) {
            await ProficiencyQData.create(defaultProficiencyQData);
        }
    } catch (error) {
        console.log('Error Initializing Proficiency Pre-Test Data: ', error);
    }

    // Pricing
    try {
        const pr_count = await PricingData.countDocuments();
        if (pr_count === 0) {
            await PricingData.create(defaultPricingData);
        }
    } catch (error) {
        console.log('Error uploading Pricing Data: ', error);
    }

    // FAQs
    try {
        const f_count = await FAQData.countDocuments();
        if (f_count === 0) {
            await FAQData.create(defaultFAQs);
        }
    } catch (error) {
        console.log('Error uploading FAQs Data: ', error);
    }
};

module.exports = { initialize_data };
