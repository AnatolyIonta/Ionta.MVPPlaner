export interface Entry {
    id: number;
    title: string;
    content: string;
    date: string;
    tags: string;
  }
  
  export interface FilterOptions {
    date?: string;
    tags?: string[];
    search?: string;
  }