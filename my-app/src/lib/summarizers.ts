import textrank from "textrank";
import sbd from "sbd";


// Since wink-summarizer is not available, we'll use alternative approaches
function extractKeysentences(text: string, count: number = 3): string[] {
  const sentences = sbd.sentences(text || "");
  if (sentences.length <= count) return sentences;
  
  // Simple sentence ranking based on sentence position and length
  const scored = sentences.map((sentence: string, index: number) => ({
    sentence,
    score: sentence.length * (1 - index / sentences.length) 
  }));
  
  return scored
    .sort((a: { score: number }, b: { score: number }) => b.score - a.score)
    .slice(0, count)
    .map((item: { sentence: string }) => item.sentence);
}

export function summarizeBeginner(text: string): string {
  try {
    // Extract top sentences and keep it short (3–5)
    const sentences = sbd.sentences(text || "");
    if (sentences.length === 0) return "No content available.";
    
    const topSentences = extractKeysentences(text, Math.max(3, Math.min(5, Math.ceil(sentences.length * 0.25))));
    const joined = topSentences.join(" ");
    
    return joined || sentences.slice(0, 3).join(" ");
  } catch (error) {
    console.error("Error in summarizeBeginner:", error);
    const sentences = sbd.sentences(text || "");
    return sentences.slice(0, 3).join(" ") || "Summary not available.";
  }
}

export function summarizeStory(text: string): string {
  try {
    // Use textrank for slightly longer summary with friendly wrap
    const summary = textrank.summarize(text || "", { sentences: 5 }) as string;
    const core = summary || extractKeysentences(text, 4).join(" ");
    
    return core
      ? `Imagine this: ${core} In short, that's the heart of the work—told simply.`
      : summarizeBeginner(text);
  } catch (error) {
    console.error("Error in summarizeStory:", error);
    return summarizeBeginner(text);
  }
}

export function summarizeBuzz(text: string): string {
  try {
    const head = (text || "").split(".")[0]?.slice(0, 120) || "New research drops.";
    
    // Extract keywords using textrank
    let keywords: string = "";
    try {
      const kws = (textrank.keywords(text || "") as { text: string }[] || [])
        .slice(0, 3)
        .map(k => k.text || k)
        .join(", ");
      keywords = kws;
    } catch (error) {
      // Fallback: extract first few important-looking words
      const words = (text || "").split(/\s+/).filter(w => w.length > 4).slice(0, 3);
      keywords = words.join(", ");
    }
    
    return `${head} — ${keywords}`.slice(0, 200);
  } catch (error) {
    console.error("Error in summarizeBuzz:", error);
    const head = (text || "").split(".")[0]?.slice(0, 120) || "New research available.";
    return head.slice(0, 200);
  }
}


