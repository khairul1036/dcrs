const About = () => {
    const aboutData = {
        title: "Smart Agro-Advisory Dissemination System",
        background: [
            "Bangladesh, as a predominantly agrarian economy, relies heavily on rice production for food security and livelihood. However, the agriculture sector faces significant challenges due to climate change and unpredictable weather patterns, such as erratic rainfall, heatwaves, droughts, and floods. These challenges are particularly critical for rice, the country’s staple crop, which is highly sensitive to climatic variability.",
            "To address these challenges, a location-specific and stage-wise Agromet advisory service is crucial. Such a service can provide farmers with tailored advisories on irrigation, pest management, fertilizer application, and disaster preparedness at various crop growth stages. To implement this effectively, a robust and dynamic web-based and mobile-responsive Farmer’s Information System is required. This digital platform will facilitate data collection, integration, and dissemination, enabling real-time, actionable advisories for rice farmers across Bangladesh."
        ],
        objectives: [
            "To develop a web-based and mobile-responsive platform for maintaining a comprehensive Farmer’s Information List.",
            "To integrate location-specific data such as GPS coordinates, agro-ecological zones, and local weather conditions.",
            "To align farmer data with rice crop growth stages, enabling tailored, stage-wise Agromet advisories.",
            "To establish a mechanism for the dissemination of location-specific and stagewise advisories to farmers.",
            "To pilot the platform in key rice-growing regions for usability and effectiveness assessment."
        ],
        chiefPartons: [
            {
                title: "Chief Parton",
                name: "Dr. Mohammad Khalequzzaman",
                role: "Director General (Routine Charge)",
                img: "/brri-dg-2.jpeg"
            },
            {
                title: "Parton",
                name: "Dr. Md Rafiqul Islam",
                role: "Director (Research), BRRI",
                img: "/brri-da.jpg"
            }
        ],
        reviewedBy: [
            {
                name: "Dr. ABM Zahid Hossain",
                role: "SSO, IWM Division",
                extra: "Labrotory Coordinator, Agromet Lab, BRRI",
                img: "/zahid.jpg"
            },
            {
                name: "Dr. Abubakar Siddique",
                role: "SSO, GRS Division",
                extra: "Member, Agromet Lab, BRRI",
                img: "/abu-bakkar.jpg"
            }
        ],
        executedBy: [
            {
                name: "Niaz Md. Farhat Rahman",
                role: "Principal Scientific Officer",
                dept: "Agricultural Statistics Division",
                lab: "Member, Agromet Lab",
                org: "Bangladesh Rice Research Institute (BRRI)",
                address: "Gazipur-1701, Bangladesh.",
                email: ["niaz.stat@brri.gov.bd", "niaz.sust@gmail.com"],
                mobile: "+8801912700606",
                phone: "PABX 880-2-49272005-14 Ext. 395",
                img: "/niaz.jpg"
            }
        ]
    };



    return (
        <div className="p-4 flex-1 bg-green-50 min-h-screen font-book-antiqua">
            <div className="max-w-6xl mx-auto flex flex-col items-center p-6 space-y-6">

                {/* Main Title & Background */}
                <div className="bg-white shadow-lg rounded-lg p-8 w-full">
                    <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
                        {aboutData.title}
                    </h1>

                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Background and Rationale
                    </h2>

                    {aboutData.background.map((para, idx) => (
                        <p
                            key={idx}
                            className="text-gray-700 text-lg leading-relaxed mb-6 text-justify"
                        >
                            {para}
                        </p>
                    ))}

                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Objectives
                    </h2>

                    <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                        {aboutData.objectives.map((obj, idx) => (
                            <li key={idx}>{obj}</li>
                        ))}
                    </ul>
                </div>

                {/* Chief Partons */}
                <div className="flex flex-col md:flex-row justify-center items-start gap-12 p-6 bg-white shadow-lg rounded-lg w-full">
                    {aboutData.chiefPartons.map((person, idx) => (
                        <div key={idx} className="text-center">
                            <h3 className="text-xl font-semibold mb-4">{person.title}</h3>
                            <img
                                src={person.img}
                                alt={person.name}
                                className="w-60 h-72 object-cover mx-auto border border-gray-300"
                            />
                            <h4 className="mt-4 text-lg font-bold">{person.name}</h4>
                            <p className="text-gray-700">{person.role}</p>
                        </div>
                    ))}
                </div>

                {/* Reviewed By */}
                <div className="px-6 py-8 bg-white shadow-lg rounded-lg w-full">
                    <h3 className="text-lg font-semibold mb-6">Reviewed by-</h3>
                    <div className="flex flex-col md:flex-row justify-center items-start gap-12">
                        {aboutData.reviewedBy.map((person, idx) => (
                            <div key={idx} className="text-center">
                                <img
                                    src={person.img}
                                    alt={person.name}
                                    className="w-60 h-72 object-cover mx-auto border border-gray-300"
                                />
                                <h4 className="mt-4 text-lg font-bold">{person.name}</h4>
                                <p className="text-gray-700">{person.role}</p>
                                <p className="text-gray-700">{person.extra}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Executed By */}
                <div className="px-6 py-8 bg-white shadow-lg rounded-lg w-full">
                    <h3 className="text-lg font-semibold mb-4">
                        Plan, Database & Execution By:
                    </h3>
                    <div className="flex flex-col md:flex-row justify-center items-start gap-12">
                        {aboutData.executedBy.map((person, idx) => (
                            <div key={idx} className="flex flex-col md:flex-row items-start gap-6">
                                <img
                                    src={person.img}
                                    alt={person.name}
                                    className="w-60 h-72 object-cover border border-gray-300"
                                />
                                <div>
                                    <h4 className="text-lg font-bold mb-1">{person.name}</h4>
                                    <p>{person.role}</p>
                                    <p>{person.dept}</p>
                                    <p>{person.lab}</p>
                                    <p>{person.org}</p>
                                    <p>{person.address}</p>
                                    <p>
                                        Email:{" "}
                                        {person.email.map((e, i) => (
                                            <span key={i}>
                                                <a href={`mailto:${e}`} className="text-blue-600 underline">
                                                    {e}
                                                </a>
                                                {i < person.email.length - 1 && ", "}
                                            </span>
                                        ))}
                                    </p>
                                    <p>Mobile: {person.mobile}</p>
                                    <p>Phone: {person.phone}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;
