const SOURCE_URL =
    "https://dcrs.brri.gov.bd/api/climate-incident-surveys?page=5&limit=10";

const TARGET_URL =
    "http://localhost:5000/api/v1/climate-incident-surveys";

async function migrate() {
    try {
        // 1️⃣ Fetch from source
        const res = await fetch(SOURCE_URL);
        const result = await res.json();

        const surveys = result.data;
        console.log("Total records:", surveys.length);

        // 2️⃣ Insert one by one
        for (let i = 0; i < surveys.length; i++) {
            const s = surveys[i];

            const body = {
                respondentType: s.respondentType,
                respondentName: s.respondentName,
                designation: s.designation,
                organization: s.organization,
                address: s.address,
                mobileNumber: s.mobileNumber,
                email: s.email,
                year: s.year,

                hotspot: s.hotspot,
                region: s.region,
                division: s.division,
                district: s.district,
                upazila: s.upazila,
                union: s.union,
                block: s.block,

                selectedHazards: s.selectedHazards,
                hazardCalendar: s.hazardCalendar,
                hazardSeasons: s.hazardSeasons,

                mostDangerousHazard: s.mostDangerousHazard,
                cropDamage: s.cropDamage || null,
            };

            try {
                const postRes = await fetch(TARGET_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                });

                if (!postRes.ok) {
                    const err = await postRes.text();
                    throw new Error(err);
                }

                console.log(`✅ Inserted ${i + 1}: ${s.respondentName}`);
            } catch (err) {
                console.log(`❌ Failed ${i + 1}:`, err.message);
            }
        }

        console.log("🎉 Migration completed");
    } catch (err) {
        console.error("🚨 Error:", err.message);
    }
}

migrate();
