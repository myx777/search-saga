export type SkillsType = {
    id: number;
    name: string;
};

export type FilterType = {
    items: SkillsType[];
    loading: boolean;
    error: string | null;
    search: string;
}