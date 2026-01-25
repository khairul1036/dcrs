import { pool } from "../config/db.js";

/* ================= CREATE CLIMATE INCIDENT SURVEY ================= */
// export const createClimateIncidentSurvey = async (req, res) => {
//     const data = req.body;

//     const connection = await pool.getConnection();

//     try {
//         await connection.beginTransaction();

//         // 1️⃣ Insert into main survey table
//         const [surveyResult] = await connection.query(
//             `INSERT INTO surveys 
//             (respondentType, respondentName, designation, organization, address, mobileNumber, email, year, hotspot, region, division, district, upazila, unionName, block, cropDamage)
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//             [
//                 data.respondentType,
//                 data.respondentName,
//                 data.designation,
//                 data.organization,
//                 data.address,
//                 data.mobileNumber,
//                 data.email,
//                 data.year,
//                 data.hotspot,
//                 data.region,
//                 data.division,
//                 data.district,
//                 data.upazila,
//                 data.union,
//                 data.block,
//                 data.cropDamage
//             ]
//         );

//         const surveyId = surveyResult.insertId; // ✅ auto-increment ID

//         // 2️⃣ Insert selected hazards
//         if (data.selectedHazards && data.selectedHazards.length > 0) {
//             const hazardsValues = data.selectedHazards.map(h => [surveyId, h.id, h.name]);
//             await connection.query(
//                 `INSERT INTO survey_selected_hazards (surveyId, hazardId, hazardName) VALUES ?`,
//                 [hazardsValues]
//             );
//         }

//         // 3️⃣ Insert hazard calendar
//         if (data.hazardCalendar && data.hazardCalendar.length > 0) {
//             const calendarValues = [];
//             data.hazardCalendar.forEach(h => {
//                 h.monthlyData.forEach(m => {
//                     calendarValues.push([surveyId, h.id, h.name, m.month, m.monthIndex, m.severity]);
//                 });
//             });

//             await connection.query(
//                 `INSERT INTO survey_hazard_calendar (surveyId, hazardId, hazardName, month, monthIndex, severity) VALUES ?`,
//                 [calendarValues]
//             );
//         }

//         // 4️⃣ Insert hazard seasons
//         if (data.hazardSeasons && data.hazardSeasons.length > 0) {
//             const seasonValues = data.hazardSeasons.map(h => [
//                 surveyId,
//                 h.id,
//                 h.name,
//                 !!h.seasons.Aus,
//                 !!h.seasons.Aman,
//                 !!h.seasons.Boro
//             ]);

//             await connection.query(
//                 `INSERT INTO survey_hazard_seasons (surveyId, hazardId, hazardName, aus, aman, boro) VALUES ?`,
//                 [seasonValues]
//             );
//         }

//         // 5️⃣ Insert most dangerous hazard (surveyId UNIQUE)
//         if (data.mostDangerousHazard) {
//             const mdh = data.mostDangerousHazard;
//             await connection.query(
//                 `INSERT INTO survey_most_dangerous_hazard (surveyId, hazardId, hazardName, dangerRating) VALUES (?, ?, ?, ?)`,
//                 [surveyId, mdh.id, mdh.name, mdh.dangerRating]
//             );
//         }

//         await connection.commit();

//         res.status(201).json({ message: 'Survey created successfully', surveyId });
//     } catch (error) {
//         await connection.rollback();

//         // Handle duplicate key error gracefully
//         if (error.code === 'ER_DUP_ENTRY') {
//             return res.status(400).json({ message: 'Duplicate entry detected', error });
//         }

//         console.error(error);
//         res.status(500).json({ message: 'Internal server error', error });
//     } finally {
//         connection.release();
//     }
// };


// GET ALL SURVEYS with pagination
// export const createClimateIncidentSurvey = async (req, res) => {
//     const data = req.body;
//     const connection = await pool.getConnection();

//     try {
//         await connection.beginTransaction();

//         const [surveyResult] = await connection.query(
//             `INSERT INTO surveys 
//             (respondentType, respondentName, designation, organization, address,
//              mobileNumber, email, year, hotspot, region, division, district,
//              upazila, unionName, block, cropDamage)
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//             [
//                 data.respondentType,
//                 data.respondentName,
//                 data.designation,
//                 data.organization,
//                 data.address,
//                 data.mobileNumber,
//                 data.email,
//                 data.year,
//                 data.hotspot,
//                 data.region,
//                 data.division,
//                 data.district,
//                 data.upazila,
//                 data.union,
//                 data.block,
//                 data.cropDamage ? JSON.stringify(data.cropDamage) : null
//             ]
//         );

//         const surveyId = surveyResult.insertId;

//         if (data.selectedHazards?.length) {
//             const values = data.selectedHazards.map(h => [surveyId, h.id, h.name]);
//             await connection.query(
//                 `INSERT INTO survey_selected_hazards (surveyId, hazardId, hazardName) VALUES ?`,
//                 [values]
//             );
//         }

//         if (data.hazardCalendar?.length) {
//             const values = [];
//             data.hazardCalendar.forEach(h =>
//                 h.monthlyData.forEach(m =>
//                     values.push([surveyId, h.id, h.name, m.month, m.monthIndex, m.severity])
//                 )
//             );

//             await connection.query(
//                 `INSERT INTO survey_hazard_calendar 
//                  (surveyId, hazardId, hazardName, month, monthIndex, severity)
//                  VALUES ?`,
//                 [values]
//             );
//         }

//         if (data.hazardSeasons?.length) {
//             const values = data.hazardSeasons.map(h => [
//                 surveyId,
//                 h.id,
//                 h.name,
//                 !!h.seasons?.Aus,
//                 !!h.seasons?.Aman,
//                 !!h.seasons?.Boro
//             ]);

//             await connection.query(
//                 `INSERT INTO survey_hazard_seasons 
//                  (surveyId, hazardId, hazardName, aus, aman, boro)
//                  VALUES ?`,
//                 [values]
//             );
//         }

//         if (data.mostDangerousHazard) {
//             const mdh = data.mostDangerousHazard;
//             await connection.query(
//                 `INSERT INTO survey_most_dangerous_hazard 
//                  (surveyId, hazardId, hazardName, dangerRating)
//                  VALUES (?, ?, ?, ?)`,
//                 [surveyId, mdh.id, mdh.name, mdh.dangerRating ?? 1]
//             );
//         }

//         await connection.commit();
//         res.status(201).json({ message: "Survey created successfully", surveyId });
//     } catch (error) {
//         await connection.rollback();
//         console.error(error);
//         res.status(500).json({ message: "Internal server error", error });
//     } finally {
//         connection.release();
//     }
// };

export const createClimateIncidentSurvey = async (req, res) => {
    const data = req.body;
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        /* 1️⃣ surveys */
        const [surveyResult] = await connection.query(
            `INSERT INTO surveys 
            (respondentType, respondentName, designation, organization, address,
             mobileNumber, email, year, hotspot, region, division, district,
             upazila, unionName, block, cropDamage)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                data.respondentType,
                data.respondentName,
                data.designation,
                data.organization,
                data.address,
                data.mobileNumber,
                data.email,
                data.year,
                data.hotspot,
                data.region,
                data.division,
                data.district,
                data.upazila,
                data.union,
                data.block,
                data.cropDamage ? JSON.stringify(data.cropDamage) : null
            ]
        );

        const surveyId = surveyResult.insertId;

        /* 2️⃣ selected hazards */
        let surveyHazardMap = {}; // hazardId -> survey_selected_hazards.id

        if (data.selectedHazards?.length) {
            for (const h of data.selectedHazards) {
                const [result] = await connection.query(
                    `INSERT INTO survey_selected_hazards 
                     (surveyId, hazardId, hazardName)
                     VALUES (?, ?, ?)`,
                    [surveyId, h.id, h.name]
                );

                surveyHazardMap[h.id] = result.insertId;
            }
        }

        /* 3️⃣ hazard calendar */
        if (data.hazardCalendar?.length) {
            const values = [];
            data.hazardCalendar.forEach(h =>
                h.monthlyData.forEach(m =>
                    values.push([
                        surveyId,
                        h.id,
                        h.name,
                        m.month,
                        m.monthIndex,
                        m.severity
                    ])
                )
            );

            await connection.query(
                `INSERT INTO survey_hazard_calendar
                 (surveyId, hazardId, hazardName, month, monthIndex, severity)
                 VALUES ?`,
                [values]
            );
        }

        /* 4️⃣ hazard seasons */
        if (data.hazardSeasons?.length) {
            const values = data.hazardSeasons.map(h => [
                surveyId,
                h.id,
                h.name,
                !!h.seasons?.Aus,
                !!h.seasons?.Aman,
                !!h.seasons?.Boro
            ]);

            await connection.query(
                `INSERT INTO survey_hazard_seasons
                 (surveyId, hazardId, hazardName, aus, aman, boro)
                 VALUES ?`,
                [values]
            );
        }

        /* 5️⃣ most dangerous hazard */
        if (data.mostDangerousHazard) {
            const mdh = data.mostDangerousHazard;
            await connection.query(
                `INSERT INTO survey_most_dangerous_hazard
                 (surveyId, hazardId, hazardName, dangerRating)
                 VALUES (?, ?, ?, ?)`,
                [surveyId, mdh.id, mdh.name, mdh.dangerRating ?? 1]
            );
        }

        /* 6️⃣ affected crops per hazard 🔥 NEW */
        if (data.affectedCrops?.length) {
            const affectedValues = [];

            data.affectedCrops.forEach(h => {
                const surveyHazardId = surveyHazardMap[h.hazardId];
                if (!surveyHazardId) return;

                h.crops.forEach(crop => {
                    affectedValues.push([
                        surveyId,
                        surveyHazardId,
                        h.hazardName,
                        crop.cropId,
                        crop.cropName,
                        crop.impact || null,
                        crop.adoptionPractices || null
                    ]);
                });
            });

            if (affectedValues.length) {
                await connection.query(
                    `INSERT INTO survey_hazard_affected_crops
                     (surveyId, surveyHazardId, hazardName,
                      cropId, cropName, impact, adoptionPractices)
                     VALUES ?`,
                    [affectedValues]
                );
            }
        }

        await connection.commit();
        res.status(201).json({
            message: "Survey created successfully",
            surveyId
        });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ message: "Internal server error", error });
    } finally {
        connection.release();
    }
};


export const getAllSurveys = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        const connection = await pool.getConnection();

        // 1️⃣ Total count for pagination
        const [totalRows] = await connection.query(`SELECT COUNT(*) as total FROM surveys`);
        const total = totalRows[0].total;
        const totalPages = Math.ceil(total / limit);

        // 2️⃣ Fetch surveys with pagination
        const [surveys] = await connection.query(
            `SELECT * FROM surveys ORDER BY id DESC LIMIT ? OFFSET ?`,
            [limit, offset]
        );

        // 3️⃣ For each survey, fetch related tables
        const data = [];
        for (let survey of surveys) {
            const surveyId = survey.id;

            // Selected Hazards
            const [hazards] = await connection.query(
                `SELECT hazardId as id, hazardName as name FROM survey_selected_hazards WHERE surveyId = ?`,
                [surveyId]
            );

            // Hazard Calendar
            const [calendarRows] = await connection.query(
                `SELECT hazardId as id, hazardName as name, month, monthIndex, severity
                 FROM survey_hazard_calendar WHERE surveyId = ?`,
                [surveyId]
            );

            const hazardCalendarMap = {};
            calendarRows.forEach(row => {
                if (!hazardCalendarMap[row.id]) {
                    hazardCalendarMap[row.id] = {
                        id: row.id,
                        name: row.name,
                        monthlyData: []
                    };
                }
                hazardCalendarMap[row.id].monthlyData.push({
                    month: row.month,
                    monthIndex: row.monthIndex,
                    severity: row.severity
                });
            });
            const hazardCalendar = Object.values(hazardCalendarMap);

            // Hazard Seasons
            const [seasonRows] = await connection.query(
                `SELECT hazardId as id, hazardName as name, aus, aman, boro
                 FROM survey_hazard_seasons WHERE surveyId = ?`,
                [surveyId]
            );
            const hazardSeasons = seasonRows.map(row => ({
                id: row.id,
                name: row.name,
                seasons: {
                    Aus: !!row.aus,
                    Aman: !!row.aman,
                    Boro: !!row.boro
                }
            }));

            // Most Dangerous Hazard
            const [mdhRows] = await connection.query(
                `SELECT hazardId as id, hazardName as name, dangerRating FROM survey_most_dangerous_hazard WHERE surveyId = ?`,
                [surveyId]
            );
            const mostDangerousHazard = mdhRows[0] || null;

            data.push({
                ...survey,
                selectedHazards: hazards,
                hazardCalendar,
                hazardSeasons,
                mostDangerousHazard,
                submittedAt: survey.createdAt
            });
        }

        connection.release();

        res.json({
            success: true,
            data,
            pagination: {
                total,
                page,
                limit,
                totalPages
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error', error });
    }
};

// GET SURVEY BY ID
export const getSurveyById = async (req, res) => {
    const surveyId = req.params.id;

    try {
        const connection = await pool.getConnection();

        const [surveys] = await connection.query(`SELECT * FROM surveys WHERE id = ?`, [surveyId]);
        if (surveys.length === 0) return res.status(404).json({ success: false, message: 'Survey not found' });

        const survey = surveys[0];

        // Fetch related tables
        const [hazards] = await connection.query(
            `SELECT hazardId as id, hazardName as name FROM survey_selected_hazards WHERE surveyId = ?`,
            [surveyId]
        );

        const [calendarRows] = await connection.query(
            `SELECT hazardId as id, hazardName as name, month, monthIndex, severity
             FROM survey_hazard_calendar WHERE surveyId = ?`,
            [surveyId]
        );

        const hazardCalendarMap = {};
        calendarRows.forEach(row => {
            if (!hazardCalendarMap[row.id]) {
                hazardCalendarMap[row.id] = {
                    id: row.id,
                    name: row.name,
                    monthlyData: []
                };
            }
            hazardCalendarMap[row.id].monthlyData.push({
                month: row.month,
                monthIndex: row.monthIndex,
                severity: row.severity
            });
        });
        const hazardCalendar = Object.values(hazardCalendarMap);

        const [seasonRows] = await connection.query(
            `SELECT hazardId as id, hazardName as name, aus, aman, boro
             FROM survey_hazard_seasons WHERE surveyId = ?`,
            [surveyId]
        );
        const hazardSeasons = seasonRows.map(row => ({
            id: row.id,
            name: row.name,
            seasons: { Aus: !!row.aus, Aman: !!row.aman, Boro: !!row.boro }
        }));

        const [mdhRows] = await connection.query(
            `SELECT hazardId as id, hazardName as name, dangerRating FROM survey_most_dangerous_hazard WHERE surveyId = ?`,
            [surveyId]
        );
        const mostDangerousHazard = mdhRows[0] || null;

        connection.release();

        res.json({
            success: true,
            data: { ...survey, selectedHazards: hazards, hazardCalendar, hazardSeasons, mostDangerousHazard }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error', error });
    }
};

// UPDATE SURVEY
export const updateSurvey = async (req, res) => {
    const surveyId = req.params.id;
    const data = req.body;

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        // Update main survey
        await connection.query(
            `UPDATE surveys SET respondentType=?, respondentName=?, designation=?, organization=?, address=?, mobileNumber=?, email=?, year=?, hotspot=?, region=?, division=?, district=?, upazila=?, unionName=?, block=?, cropDamage=?, updatedAt=CURRENT_TIMESTAMP WHERE id=?`,
            [
                data.respondentType,
                data.respondentName,
                data.designation,
                data.organization,
                data.address,
                data.mobileNumber,
                data.email,
                data.year,
                data.hotspot,
                data.region,
                data.division,
                data.district,
                data.upazila,
                data.union,
                data.block,
                data.cropDamage,
                surveyId
            ]
        );

        // Delete old related data
        await connection.query(`DELETE FROM survey_selected_hazards WHERE surveyId = ?`, [surveyId]);
        await connection.query(`DELETE FROM survey_hazard_calendar WHERE surveyId = ?`, [surveyId]);
        await connection.query(`DELETE FROM survey_hazard_seasons WHERE surveyId = ?`, [surveyId]);
        await connection.query(`DELETE FROM survey_most_dangerous_hazard WHERE surveyId = ?`, [surveyId]);

        // Re-insert related data (same as create function)
        if (data.selectedHazards && data.selectedHazards.length > 0) {
            const hazardsValues = data.selectedHazards.map(h => [surveyId, h.id, h.name]);
            await connection.query(
                `INSERT INTO survey_selected_hazards (surveyId, hazardId, hazardName) VALUES ?`,
                [hazardsValues]
            );
        }

        if (data.hazardCalendar && data.hazardCalendar.length > 0) {
            const calendarValues = [];
            data.hazardCalendar.forEach(h => {
                h.monthlyData.forEach(m => {
                    calendarValues.push([surveyId, h.id, h.name, m.month, m.monthIndex, m.severity]);
                });
            });

            await connection.query(
                `INSERT INTO survey_hazard_calendar (surveyId, hazardId, hazardName, month, monthIndex, severity) VALUES ?`,
                [calendarValues]
            );
        }

        if (data.hazardSeasons && data.hazardSeasons.length > 0) {
            const seasonValues = data.hazardSeasons.map(h => [
                surveyId,
                h.id,
                h.name,
                !!h.seasons.Aus,
                !!h.seasons.Aman,
                !!h.seasons.Boro
            ]);

            await connection.query(
                `INSERT INTO survey_hazard_seasons (surveyId, hazardId, hazardName, aus, aman, boro) VALUES ?`,
                [seasonValues]
            );
        }

        if (data.mostDangerousHazard) {
            const mdh = data.mostDangerousHazard;
            await connection.query(
                `INSERT INTO survey_most_dangerous_hazard (surveyId, hazardId, hazardName, dangerRating) VALUES (?, ?, ?, ?)`,
                [surveyId, mdh.id, mdh.name, mdh.dangerRating]
            );
        }

        await connection.commit();
        connection.release();

        res.json({ success: true, message: 'Survey updated successfully' });
    } catch (error) {
        await connection.rollback();
        connection.release();
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error', error });
    }
};

// DELETE SURVEY
export const deleteSurvey = async (req, res) => {
    const surveyId = req.params.id;

    try {
        const connection = await pool.getConnection();
        await connection.query(`DELETE FROM surveys WHERE id = ?`, [surveyId]);
        connection.release();

        res.json({ success: true, message: 'Survey deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error', error });
    }
};


// GET DISTRICT SUMMARY
export const getDistrictSummary = async (req, res) => {
    try {
        const connection = await pool.getConnection();

        const [districtRows] = await connection.query(`
            SELECT 
                s.district,
                COUNT(DISTINCT s.id) as surveyCount
            FROM surveys s
            WHERE s.district IS NOT NULL AND s.district != ''
            GROUP BY s.district
            ORDER BY surveyCount DESC
        `);

        const data = [];

        for (let district of districtRows) {
            const districtName = (district.district || '').trim();

            if (!districtName) continue; // extra safety

            const [hazardRows] = await connection.query(`
                SELECT DISTINCT sh.hazardName
                FROM survey_selected_hazards sh
                JOIN surveys s ON s.id = sh.surveyId
                WHERE s.district = ?
            `, [districtName]);

            const hazards = hazardRows
                .map(h => h.hazardName)
                .filter(Boolean);

            data.push({
                district: districtName.toLowerCase(),
                displayName: districtName
                    .split(/\s+/)
                    .map(word =>
                        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                    )
                    .join(' '),
                hazardCount: hazards.length,
                surveyCount: district.surveyCount,
                hazards
            });
        }

        connection.release();

        res.json({
            success: true,
            data,
            count: data.length,
            filters: {}
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};


// GET SURVEY STATISTICS
export const getSurveyStatistics = async (req, res) => {
    try {
        const connection = await pool.getConnection();

        // 1️⃣ Total surveys
        const [totalRows] = await connection.query(`SELECT COUNT(*) as totalSurveys FROM surveys`);
        const totalSurveys = totalRows[0].totalSurveys;

        // 2️⃣ Unique districts
        const [districtRows] = await connection.query(`SELECT COUNT(DISTINCT district) as uniqueDistricts FROM surveys`);
        const uniqueDistricts = districtRows[0].uniqueDistricts;

        // 3️⃣ Hazards tracked
        const [hazardRows] = await connection.query(`SELECT COUNT(DISTINCT hazardName) as hazardsTracked FROM survey_selected_hazards`);
        const hazardsTracked = hazardRows[0].hazardsTracked;

        // 4️⃣ Year range
        const [yearRows] = await connection.query(`SELECT MIN(year) as minYear, MAX(year) as maxYear FROM surveys`);
        const yearRange = `${yearRows[0].minYear}-${yearRows[0].maxYear}`;

        connection.release();

        res.json({
            success: true,
            data: {
                totalSurveys,
                uniqueDistricts,
                hazardsTracked,
                yearRange
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error', error });
    }
};


// GET HAZARD ANALYTICS BY DISTRICT
export const getHazardAnalyticsByDistrict = async (req, res) => {
    try {
        const district = req.query.district;
        if (!district) {
            return res.status(400).json({ success: false, message: 'District query parameter is required' });
        }

        const connection = await pool.getConnection();

        // 1️⃣ Count total surveys in the district
        const [surveyRows] = await connection.query(
            `SELECT COUNT(*) as surveyCount FROM surveys WHERE district = ?`,
            [district]
        );
        const surveyCount = surveyRows[0].surveyCount;

        // 2️⃣ Fetch all hazard calendar entries for this district
        const [rows] = await connection.query(`
            SELECT sh.hazardName, hc.monthIndex, hc.severity
            FROM survey_hazard_calendar hc
            JOIN surveys s ON s.id = hc.surveyId
            JOIN survey_selected_hazards sh ON sh.surveyId = s.id AND sh.hazardId = hc.hazardId
            WHERE s.district = ?
        `, [district]);

        // 3️⃣ Process data per hazard
        const hazardMap = {};

        rows.forEach(row => {
            const hazardName = row.hazardName;
            const month = row.monthIndex;
            const severity = row.severity;

            if (!hazardMap[hazardName]) {
                hazardMap[hazardName] = {
                    hazardName,
                    monthlyFrequency: {},
                    monthlySeverity: {},
                    activeMonths: []
                };

                // initialize months 1-12
                for (let i = 1; i <= 12; i++) {
                    hazardMap[hazardName].monthlyFrequency[i] = 0;
                }
            }

            // Frequency
            hazardMap[hazardName].monthlyFrequency[month] += 1;

            // Severity
            if (!hazardMap[hazardName].monthlySeverity[month]) {
                hazardMap[hazardName].monthlySeverity[month] = { count: 0, totalSeverity: 0, avgSeverity: 0 };
            }
            hazardMap[hazardName].monthlySeverity[month].count += 1;
            hazardMap[hazardName].monthlySeverity[month].totalSeverity += severity;
            hazardMap[hazardName].monthlySeverity[month].avgSeverity =
                parseFloat((hazardMap[hazardName].monthlySeverity[month].totalSeverity / hazardMap[hazardName].monthlySeverity[month].count).toFixed(2));

            // Active months
            if (!hazardMap[hazardName].activeMonths.includes(month) && severity > 0) {
                hazardMap[hazardName].activeMonths.push(month);
            }
        });

        connection.release();

        res.json({
            success: true,
            data: Object.values(hazardMap),
            district,
            surveyCount,
            filters: {}
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error', error });
    }
};