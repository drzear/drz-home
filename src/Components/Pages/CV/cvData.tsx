// import emsl from "../../../Images/Logos/emsl.png";
// import idt from "../../../Images/Logos/idt.png";
// import pearson from "../../../Images/Logos/pearson.png";
// import rhg from "../../../Images/Logos/rhg.png";
// import uiowa from "../../../Images/Logos/uiowa.png";

export interface cvDataInt {
    startYYYYMM: number;
    startDate: string;
    endYYYYMM: number;
    endDate: string;
    location: string;
    city: string;
    country: string;
    title: string;
    category: string;
    company: string;
    description: string[];
    image: string;
}

const date = new Date();
const present = date.getFullYear() * 100 + date.getMonth() + 1;

export const cvData: cvDataInt[] = [
    {
        startYYYYMM: 201910,
        startDate: "October 2019",
        endYYYYMM: present,
        endDate: "Present",
        location: "Stockholm, Sweden",
        city: "Stockholm",
        country: "Sweden",
        title: "BI Revenue Management Developer EMEA",
        category: "Work",
        company: "Radisson Hotel Group",
        description: [""],
        image: "rhg.png",
    },
    {
        startYYYYMM: 201801,
        startDate: "January 2018",
        endYYYYMM: 201910,
        endDate: "October 2019",
        location: "Stockholm, Sweden",
        city: "Stockholm",
        country: "Sweden",
        title: "Data Analyst",
        category: "Work",
        company: "Radisson Hotel Group",
        description: [
            "• Created internal system status website that monitored and reported data quality to end users using Angular framework for front-end and Express and MySQL for back-end.",
            "• Designed and built Meetings and Events pricing tool used throughout Northern Europe.",
            "• Developed MySQL scripts and maintained MySQL server/data warehouse.",
            "• Worked with stakeholders to create and maintain tools to facilitate revenue management and drive revenues.",
        ],
        image: "rhg.png",
    },
    {
        startYYYYMM: 201507,
        startDate: "July 2015",
        endYYYYMM: 201705,
        endDate: "May 2017",
        location: "Iowa City, IA",
        city: "Iowa City",
        country: "United States",
        title: "Scoring Supervisor",
        category: "Work",
        company: "Pearson",
        description: [""],
        image: "pearson.png",
    },
    {
        startYYYYMM: 201412,
        startDate: "December 2014",
        endYYYYMM: 201502,
        endDate: "February 2015",
        location: "Gronau-Epe, DE",
        city: "",
        country: "Germany",
        title: "Backpacker",
        category: "Travel",
        company: "N/A",
        description: [""],
        image: "idt.png",
    },
    {
        startYYYYMM: 201410,
        startDate: "November 2014",
        endYYYYMM: 201412,
        endDate: "December 2014",
        location: "Thailand and Cambodia",
        city: "",
        country: "Thailand",
        title: "Backpacker",
        category: "Travel",
        company: "N/A",
        description: [""],
        image: "idt.png",
    },
    {
        startYYYYMM: 201409,
        startDate: "October 2014",
        endYYYYMM: 201410,
        endDate: "October 2014",
        location: "Nepal",
        city: "",
        country: "Nepal",
        title: "Backpacker",
        category: "Travel",
        company: "N/A",
        description: [""],
        image: "idt.png",
    },
    {
        startYYYYMM: 201408,
        startDate: "September 2014",
        endYYYYMM: 201409,
        endDate: "September 2014",
        location: "Australia",
        city: "",
        country: "Australia",
        title: "Backpacker",
        category: "Travel",
        company: "N/A",
        description: [""],
        image: "idt.png",
    },
    {
        startYYYYMM: 201407,
        startDate: "August 2014",
        endYYYYMM: 201408,
        endDate: "August 2014",
        location: "New Zealand",
        city: "",
        country: "New Zealand",
        title: "Backpacker",
        category: "Travel",
        company: "N/A",
        description: [""],
        image: "idt.png",
    },
    {
        startYYYYMM: 201007,
        startDate: "July 2010",
        endYYYYMM: 201407,
        endDate: "July 2014",
        location: "Coralville, IA",
        city: "Coralville",
        country: "United States",
        title: "Production Scientist II",
        category: "Work",
        company: "Integrated DNA Technologies",
        description: [""],
        image: "idt.png",
    },
    {
        startYYYYMM: 200806,
        startDate: "June 2008",
        endYYYYMM: 200910,
        endDate: "October 2009",
        location: "New York, NY",
        city: "NYC",
        country: "United States",
        title: "Lead Analyst",
        category: "Work",
        company: "EMSL Analytical",
        description: [""],
        image: "emsl.png",
    },
    {
        startYYYYMM: 200308,
        startDate: "August 2003",
        endYYYYMM: 200707,
        endDate: "July 2007",
        location: "Iowa City, IA",
        city: "Iowa City",
        country: "United States",
        title: "B.S., Biology, Ecology and Evolutionary Biology",
        category: "Education",
        company: "The University of Iowa",
        description: [""],
        image: "uiowa.svg",
    },
];

export const colorArrays = {
    Work: ["gray", "darkgray"],
    Education: ["rgb(138, 43, 226)", "rgb(138, 43, 226)"],
    Travel: ["orange", "rgb(255, 102, 0)"],
};
