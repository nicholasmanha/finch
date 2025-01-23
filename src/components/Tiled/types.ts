export type PathItem = {
    id: string;
    structure: string;
};

export type Paths = PathItem[];

// Example of a predefined paths array
export const pathsSample: Paths = [
    { id: 'structured_data', structure: "container" },
    { id: 'big_image', structure: "array" },
];