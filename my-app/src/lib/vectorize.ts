import { TfIdf } from "natural";

export function tfidfVectors(docs: string[]) {
  const tfidf = new TfIdf();
  docs.forEach(d => tfidf.addDocument(d || ""));
  
  // Extract vocabulary from all documents
  const vocab = new Set<string>();
  (tfidf as { documents: Record<string, number>[] }).documents.forEach((doc: Record<string, number>) => {
    Object.keys(doc).forEach(k => vocab.add(k));
  });
  
  const terms = Array.from(vocab);
  
  // Create vectors for each document
  const vectors = docs.map((_d, i) => 
    terms.map(t => tfidf.tfidf(t, i))
  );
  
  return { vectors, terms };
}
