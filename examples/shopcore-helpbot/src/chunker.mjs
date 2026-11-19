// Heading-aware markdown chunker for the ShopCore policy corpus.
// Splits on `## ` section headers; sections longer than MAX_CHARS are split
// with OVERLAP_CHARS of tail context carried into the next chunk.
// Chunk boundaries are deterministic so ingestion is reproducible.

export const MAX_CHARS = 900;
export const OVERLAP_CHARS = 120;

export function chunkMarkdown(docId, text, { accessTier = 'public', docType = 'policy' } = {}) {
  if (typeof text !== 'string' || text.trim().length === 0) return [];

  const lines = text.split(/\r?\n/);
  const sections = [];
  let current = { headingPath: docId, body: [] };

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+)/);
    if (h2) {
      sections.push(current);
      current = { headingPath: `${docId} > ${h2[1].trim()}`, body: [] };
      continue;
    }
    current.body.push(line);
  }
  sections.push(current);

  const chunks = [];
  for (const section of sections) {
    const body = section.body.join('\n').trim();
    if (!body) continue;
    if (body.length <= MAX_CHARS) {
      chunks.push(makeChunk(docId, chunks.length, section.headingPath, body, accessTier, docType));
      continue;
    }
    // Split long sections into overlapping windows on paragraph boundaries.
    const paragraphs = body.split(/\n{2,}/);
    let buffer = '';
    for (const para of paragraphs) {
      if (buffer.length + para.length + 2 <= MAX_CHARS) {
        buffer = buffer ? `${buffer}\n\n${para}` : para;
        continue;
      }
      if (buffer) chunks.push(makeChunk(docId, chunks.length, section.headingPath, buffer, accessTier, docType));
      // Start the next window with the tail of the previous one.
      buffer = buffer.length > OVERLAP_CHARS
        ? `${buffer.slice(-OVERLAP_CHARS)}\n\n${para}`
        : para;
      if (buffer.length > MAX_CHARS) buffer = buffer.slice(0, MAX_CHARS);
    }
    if (buffer.trim()) chunks.push(makeChunk(docId, chunks.length, section.headingPath, buffer, accessTier, docType));
  }
  return chunks;
}

function makeChunk(docId, chunkIndex, headingPath, body, accessTier, docType) {
  return {
    doc_id: docId,
    chunk_index: chunkIndex,
    heading_path: headingPath,
    doc_type: docType,
    access_tier: accessTier,
    text: body,
  };
}
