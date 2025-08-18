module.exports = {
  async summarize({ repoUrl, docUrl }) {
    // TODO: replace with real LLM call
    return `Auto-summary for repo: ${repoUrl || 'n/a'}, doc: ${docUrl || 'n/a'}`;
  },
  async plagiarismScore({ repoUrl, docUrl }) {
    // TODO: replace with real similarity check
    return Math.round(Math.random()*20); // 0..20% as demo
  }
};
