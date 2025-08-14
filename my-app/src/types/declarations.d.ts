declare module 'textrank' {
  interface KeywordResult {
    text: string;
    [key: string]: string | number | boolean | undefined;
  }

  function summarize(text: string, options?: { sentences?: number }): string;
  function keywords(text: string): KeywordResult[];
  
  export { summarize, keywords };
}

declare module 'sbd' {
  function sentences(text: string): string[];
  export { sentences };
}

declare module 'node-summary' {
  export const SummaryTool: {
    summarize: (title: string, content: string, callback: (err: Error | null, result?: string) => void) => void;
  };
}

declare module 'ml-kmeans' {
  interface KmeansResult {
    clusters: number[];
    centroids: Array<{
      centroid: number[];
    }>;
  }

  function kmeans(data: number[][], k: number): KmeansResult;
  export = kmeans;
}
