export interface CovidData {
    date: string;
    total_cases?: number;
    new_cases?: number;
    new_cases_smoothed?: number;
    total_deaths?: number;
    new_deaths?: number;
    new_deaths_smoothed?: number;
    total_cases_per_million?: number;
    new_cases_per_million?: number;
    new_cases_smoothed_per_million?: number;
    total_deaths_per_million?: number;
    new_deaths_per_million?: number;
    new_deaths_smoothed_per_million?: number;
    icu_patients?: number;
    icu_patients_per_million?: number;
    hosp_patients?: number;
    hosp_patients_per_million?: number;
    weekly_icu_admissions?: number;
    weekly_icu_admissions_per_million?: number;
    weekly_hosp_admissions?: number;
    weekly_hosp_admissions_per_million?: number;
    total_tests?: number;
    new_tests?: number;
    new_tests_smoothed?: number;
    total_tests_per_thousand?: number;
    new_tests_per_thousand?: number;
    new_tests_smoothed_per_thousand?: number;
    tests_per_case?: number;
    positive_rate?: number;
    tests_units?: number;
}

// export const SelectionOptionsCovid = [
//     "new_cases",
//     "new_cases_smoothed",
//     "total_deaths",
//     "new_deaths",
//     "new_deaths_smoothed",
//     "total_cases_per_million",
//     "new_cases_per_million",
//     "new_cases_smoothed_per_million",
//     "total_deaths_per_million",
//     "new_deaths_per_million",
//     "new_deaths_smoothed_per_million",
//     "icu_patients",
//     "icu_patients_per_million",
//     "hosp_patients",
//     "hosp_patients_per_million",
//     "weekly_icu_admissions",
//     "weekly_icu_admissions_per_million",
//     "weekly_hosp_admissions",
//     "weekly_hosp_admissions_per_million",
//     "total_tests",
//     "new_tests",
//     "new_tests_smoothed",
//     "total_tests_per_thousand",
//     "new_tests_per_thousand",
//     "new_tests_smoothed_per_thousand",
//     "tests_per_case",
//     "positive_rate",
//     "tests_units",
// ];

export const SelectionOptionsCovid = [
    { name: "new_cases", value: "new_cases" },
    { name: "new_cases_smoothed", value: "new_cases_smoothed" },
    { name: "new_deaths", value: "new_deaths" },
    { name: "new_deaths_smoothed", value: "new_deaths_smoothed" },
    { name: "new_cases_per_million", value: "new_cases_per_million" },
    {
        name: "new_cases_smoothed_per_million",
        value: "new_cases_smoothed_per_million",
    },
    { name: "new_deaths_per_million", value: "new_deaths_per_million" },
    {
        name: "new_deaths_smoothed_per_million",
        value: "new_deaths_smoothed_per_million",
    },
    { name: "icu_patients", value: "icu_patients" },
    { name: "icu_patients_per_million", value: "icu_patients_per_million" },
    { name: "hosp_patients", value: "hosp_patients" },
    { name: "hosp_patients_per_million", value: "hosp_patients_per_million" },
    { name: "weekly_icu_admissions", value: "weekly_icu_admissions" },
    {
        name: "weekly_icu_admissions_per_million",
        value: "weekly_icu_admissions_per_million",
    },
    { name: "weekly_hosp_admissions", value: "weekly_hosp_admissions" },
    {
        name: "weekly_hosp_admissions_per_million",
        value: "weekly_hosp_admissions_per_million",
    },
    { name: "new_tests", value: "new_tests" },
    { name: "new_tests_smoothed", value: "new_tests_smoothed" },
    { name: "total_tests_per_thousand", value: "total_tests_per_thousand" },
    { name: "new_tests_per_thousand", value: "new_tests_per_thousand" },
    {
        name: "new_tests_smoothed_per_thousand",
        value: "new_tests_smoothed_per_thousand",
    },
    { name: "tests_per_case", value: "tests_per_case" },
    { name: "positive_rate", value: "positive_rate" },
    { name: "tests_units", value: "tests_units" },
];

export interface CountryData {
    continent?: string;
    location?: string;
    population?: number;
    population_density?: number;
    median_age?: number;
    aged_65_older?: number;
    aged_70_older?: number;
    gdp_per_capita?: number;
    cardiovasc_death_rate?: number;
    diabetes_prevalence?: number;
    handwashing_facilities?: number;
    hospital_beds_per_thousand?: number;
    life_expectancy?: number;
    human_development_index?: number;
    stringency_index?: number;
    extreme_poverty?: number;
    female_smokers?: number;
    male_smokers?: number;
    data?: CovidData[];
}

export const usaDiseases = {
    // "Alzheimer disease (G30)": 1,
    "COVID-19 (U071, Multiple Cause of Death)": 1,
    "COVID-19 (U071, Underlying Cause of Death)": 1,
    // "Cerebrovascular diseases (I60-I69)": 1,
    // "Chronic lower respiratory diseases (J40-J47)": 1,
    // "Diabetes mellitus (E10-E14)": 1,
    // "Diseases of heart (I00-I09,I11,I13,I20-I51)": 1,
    // "Influenza and pneumonia (J09-J18)": 1,
    // "Malignant neoplasms (C00-C97)": 1,
    // "Natural Cause": 1,
    // "Nephritis, nephrotic syndrome and nephrosis (N00-N07,N17-N19,N25-N27)": 1,
    // "Other diseases of respiratory system (J00-J06,J30-J39,J67,J70-J98)": 1,
    // "Septicemia (A40-A41)": 1,
    // "Symptoms, signs and abnormal clinical and laboratory findings, not elsewhere classified (R00-R99)": 1,
    "All Cause": 1,
};
