// MAIN SURVEY TABLE
export const surveyTableQuery = `
CREATE TABLE IF NOT EXISTS surveys (
    id INT AUTO_INCREMENT PRIMARY KEY,

    respondentType VARCHAR(100) NOT NULL,
    respondentName VARCHAR(255) NOT NULL,

    designation VARCHAR(255) NULL,
    organization VARCHAR(255) NULL,
    address TEXT NULL,
    mobileNumber VARCHAR(20) NULL,
    email VARCHAR(255) NULL,

    year VARCHAR(10) NOT NULL,

    hotspot VARCHAR(100) NULL,
    region VARCHAR(100) NOT NULL,
    division VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    upazila VARCHAR(100) NOT NULL,
    unionName VARCHAR(100) NULL,
    block VARCHAR(100) NULL,

    cropDamage TEXT NULL,

    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`;


// SELECTED HAZARDS TABLE (Many-to-One)
export const selectedHazardsTableQuery = `
CREATE TABLE IF NOT EXISTS survey_selected_hazards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    surveyId INT NOT NULL,
    hazardId INT NOT NULL,
    hazardName VARCHAR(255) NOT NULL,

    FOREIGN KEY (surveyId) REFERENCES surveys(id) ON DELETE CASCADE
);
`;


// HAZARD CALENDAR TABLE (Monthly Severity)
export const hazardCalendarTableQuery = `
CREATE TABLE IF NOT EXISTS survey_hazard_calendar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    surveyId INT NOT NULL,
    hazardId INT NOT NULL,
    hazardName VARCHAR(255) NOT NULL,

    month VARCHAR(10) NOT NULL,
    monthIndex INT NOT NULL,
    severity INT NOT NULL DEFAULT 0,

    FOREIGN KEY (surveyId) REFERENCES surveys(id) ON DELETE CASCADE
);
`;


// HAZARD SEASONS TABLE
export const hazardSeasonsTableQuery = `
CREATE TABLE IF NOT EXISTS survey_hazard_seasons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    surveyId INT NOT NULL,
    hazardId INT NOT NULL,
    hazardName VARCHAR(255) NOT NULL,

    aus BOOLEAN NOT NULL DEFAULT FALSE,
    aman BOOLEAN NOT NULL DEFAULT FALSE,
    boro BOOLEAN NOT NULL DEFAULT FALSE,

    FOREIGN KEY (surveyId) REFERENCES surveys(id) ON DELETE CASCADE
);
`;

// MOST DANGEROUS HAZARD
export const mostDangerousHazardTableQuery = `
CREATE TABLE IF NOT EXISTS survey_most_dangerous_hazard (
    id INT AUTO_INCREMENT PRIMARY KEY,
    surveyId INT NOT NULL UNIQUE,
    hazardId INT NOT NULL,
    hazardName VARCHAR(255) NOT NULL,
    dangerRating INT NOT NULL,

    FOREIGN KEY (surveyId) REFERENCES surveys(id) ON DELETE CASCADE
);
`;


// Affected Crops per Hazard
export const affectedCropsTableQuery = `
CREATE TABLE IF NOT EXISTS survey_hazard_affected_crops (
    id INT AUTO_INCREMENT PRIMARY KEY,
    surveyId INT NOT NULL,
    surveyHazardId INT NOT NULL,   -- points to survey_selected_hazards.id
    hazardName VARCHAR(255) NOT NULL,
    
    cropId VARCHAR(50) NOT NULL,
    cropName VARCHAR(255) NOT NULL,
    impact TEXT NULL,
    adoptionPractices TEXT NULL,

    FOREIGN KEY (surveyId) REFERENCES surveys(id) ON DELETE CASCADE,
    FOREIGN KEY (surveyHazardId) REFERENCES survey_selected_hazards(id) ON DELETE CASCADE
);
`;
