// The writing page's file drawer. A folder is a subdirectory of src/content/writing/ —
// drop a markdown file in one and it's filed. Declaring a folder here lets it exist
// (labeled, in this order) before it holds anything; subdirectories that appear in
// content without an entry here still render, labeled by their slug.
export interface WritingFolder {
  slug: string;
  label: string;
}

export const writingFolders: WritingFolder[] = [{ slug: 'dreams', label: 'Dreams' }];
