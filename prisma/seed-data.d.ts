export declare const profileData: {
    id: string;
    name: string;
    description: string;
};
export declare const linksData: {
    id: string;
    profileId: string;
    name: string;
    url: string;
    sortOrder: number;
}[];
export declare const skillsData: {
    id: string;
    profileId: string;
    name: string;
    sortOrder: number;
}[];
export declare const experienceData: ({
    id: string;
    profileId: string;
    company: string;
    position: string;
    startDate: Date;
    endDate: null;
    achievements: string[];
    sortOrder: number;
} | {
    id: string;
    profileId: string;
    company: string;
    position: string;
    startDate: Date;
    endDate: Date;
    achievements: string[];
    sortOrder: number;
})[];
export declare const projectsData: {
    id: string;
    profileId: string;
    name: string;
    url: string;
    sortOrder: number;
}[];
