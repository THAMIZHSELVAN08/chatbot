import schemesData from '@/data/schemes.json';

export interface Scheme {
  id: string;
  state: string;
  state_name: string;
  name_en: string;
  name_local: string;
  category: string;
  min_age: number;
  max_age: number;
  income_limit: number;
  occupations: string[];
  eligibility: string;
  benefit: string;
  documents: string[];
  steps: string[];
  link: string;
  description_en: string;
  description_local: string;
}

const schemes: Scheme[] = schemesData as Scheme[];

export function searchSchemes(query: string, stateCode?: string): Scheme[] {
  let results = [...schemes];

  if (stateCode && stateCode !== 'All') {
    results = results.filter(
      (s) =>
        s.state === stateCode ||
        s.state_name.toLowerCase().includes(stateCode.toLowerCase()) ||
        s.state === 'National' // Always include national schemes in state queries
    );
  }

  if (query && query.trim() !== '') {
    const q = query.toLowerCase().trim();
    // Split query into terms to do a smarter match
    const terms = q.split(' ').filter(t => t.length > 2); // Ignore very short words like "a", "an"
    
    results = results.filter((s) => {
      const searchString = [
        s.name_en,
        s.name_local,
        s.category,
        s.eligibility,
        s.benefit,
        s.description_en,
        s.description_local,
        s.documents.join(' '),
        s.occupations.join(' ')
      ].join(' ').toLowerCase();

      // If user provided a specific search, require at least one meaningful term to match
      if (terms.length > 0) {
         return terms.some(term => searchString.includes(term));
      }
      
      return searchString.includes(q);
    });
  }

  return results;
}

export interface SchemeFinderInput {
  age: number;
  income: number;
  occupation: string;
  state?: string;
}

export function findSchemesByProfile(input: SchemeFinderInput): Scheme[] {
  let results = [...schemes];

  // Filter by state if provided
  if (input.state && input.state !== 'All') {
    results = results.filter(
      (s) => s.state === input.state || s.state === 'National'
    );
  }

  // Filter by age
  if (input.age > 0) {
    results = results.filter(
      (s) => input.age >= s.min_age && input.age <= s.max_age
    );
  }

  // Filter by income
  if (input.income > 0) {
    results = results.filter((s) => input.income <= s.income_limit);
  }

  // Filter by occupation
  if (input.occupation && input.occupation !== 'All') {
    results = results.filter((s) =>
      s.occupations
        .map((o) => o.toLowerCase())
        .includes(input.occupation.toLowerCase())
    );
  }

  return results;
}

export function getSchemeById(id: string): Scheme | undefined {
  return schemes.find((s) => s.id === id);
}

export function getAllCategories(): string[] {
  const categories = new Set(schemes.map((s) => s.category));
  return Array.from(categories).sort();
}

export function getAllOccupations(): string[] {
  const occupations = new Set(schemes.flatMap((s) => s.occupations));
  return Array.from(occupations).sort();
}

export function getSchemesByState(stateCode: string): Scheme[] {
  if (stateCode === 'All') return schemes;
  return schemes.filter((s) => s.state === stateCode);
}

export function getSchemeSummaryForAI(schemes: Scheme[]): string {
  return schemes
    .map(
      (s) =>
        `[${s.name_en}] (${s.state_name}) - ${s.benefit}. Eligibility: ${s.eligibility}. Documents: ${s.documents.join(', ')}. Steps: ${s.steps.join(' → ')}. Link: ${s.link}`
    )
    .join('\n\n');
}

export { schemes };
