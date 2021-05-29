/**
 * For plagiarism projects.
 * @project string
 * @files Array of files
 * @file {file: string, ratio: string}
 * @todo add more information.
 */
export default interface PlagiarismProject {
  project: string;
  projectTitle: string;
  files: Array<File>;
}

/**
 * File datatype for plagiarism project
 * @file string path of the file
 * @filePath contains the file path to the file.
 * @ratio string represents the plagiarism ratio
 */
export interface File {
  file: string;
  filePath: string;
  ratio: string;
}
