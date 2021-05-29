export default interface Plagiarism {
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
