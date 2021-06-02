export default interface Plagiarism {
  files: Array<PlagiarismData>;
  ratio: number;
}

export interface PlagiarismData {
  failures: Array<Failures>;
  file: string;
  matches: Array<Matches>;
}

interface Matches {
  file: string;
  project: string;
  project_title: string;
  ratio: string;
}

interface Failures {}
