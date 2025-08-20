const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

class ResumeParser {
  /**
   * Parse PDF resume
   */
  static async parsePDF(fileBuffer) {
    try {
      const data = await pdfParse(fileBuffer);
      return this.extractData(data.text);
    } catch (error) {
      throw new Error(`PDF parsing failed: ${error.message}`);
    }
  }

  /**
   * Parse DOCX resume
   */
  static async parseDOCX(fileBuffer) {
    try {
      const result = await mammoth.extractRawText({ buffer: fileBuffer });
      return this.extractData(result.value);
    } catch (error) {
      throw new Error(`DOCX parsing failed: ${error.message}`);
    }
  }

  /**
   * Parse TXT resume
   */
  static async parseTXT(fileBuffer) {
    try {
      const text = fileBuffer.toString('utf-8');
      return this.extractData(text);
    } catch (error) {
      throw new Error(`TXT parsing failed: ${error.message}`);
    }
  }

  /**
   * Main data extraction function
   */
  static extractData(text) {
    const lowerText = text.toLowerCase();
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);
    
    const extracted = {
      name: this.extractName(text, lines),
      email: this.extractEmail(text),
      phone: this.extractPhone(text),
      skills: this.extractSkills(lowerText),
      github: this.extractGitHub(text),
      linkedin: this.extractLinkedIn(text),
      portfolio: this.extractPortfolio(text),
      experience: this.extractExperience(lowerText),
      college: this.extractCollege(text, lines)
    };

    return extracted;
  }

  /**
   * Extract name from resume
   */
  static extractName(text, lines) {
    // Look for name in first few lines
    for (let i = 0; i < Math.min(5, lines.length); i++) {
      const line = lines[i];
      // Skip lines that are clearly not names
      if (line.length > 3 && line.length < 50 && 
          !line.includes('@') && 
          !line.match(/\d{10}/) &&
          !line.toLowerCase().includes('resume') &&
          !line.toLowerCase().includes('cv') &&
          !line.toLowerCase().includes('curriculum vitae')) {
        
        // Check if line looks like a name (2-4 words, no special chars)
        const words = line.split(' ').filter(word => word.length > 0);
        if (words.length >= 2 && words.length <= 4) {
          const cleanName = line.replace(/name:?\s*/i, '').trim();
          if (cleanName && !cleanName.match(/[^\w\s]/)) {
            return cleanName;
          }
        }
      }
    }
    return '';
  }

  /**
   * Extract email address
   */
  static extractEmail(text) {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const match = text.match(emailRegex);
    return match ? match[0] : '';
  }

  /**
   * Extract phone number (Indian format)
   */
  static extractPhone(text) {
    const phoneRegex = /(?:\+91|91)?[-.\s]?[6-9]\d{9}/;
    const match = text.match(phoneRegex);
    return match ? match[0] : '';
  }

  /**
   * Extract GitHub profile
   */
  static extractGitHub(text) {
    const githubRegex = /github\.com\/([a-zA-Z0-9-_]+)/i;
    const match = text.match(githubRegex);
    return match ? `https://github.com/${match[1]}` : '';
  }

  /**
   * Extract LinkedIn profile
   */
  static extractLinkedIn(text) {
    const linkedinRegex = /linkedin\.com\/in\/([a-zA-Z0-9-_]+)/i;
    const match = text.match(linkedinRegex);
    return match ? `https://linkedin.com/in/${match[1]}` : '';
  }

  /**
   * Extract portfolio website
   */
  static extractPortfolio(text) {
    const portfolioRegex = /(?:portfolio|website|site):\s*(https?:\/\/[^\s]+)/i;
    const match = text.match(portfolioRegex);
    return match ? match[1] : '';
  }

  /**
   * Extract college/university
   */
  static extractCollege(text, lines) {
    const collegeKeywords = [
      'university', 'college', 'institute', 'school', 'academy',
      'iit', 'nit', 'bits', 'manipal', 'vit', 'amrita', 'srm',
      'delhi university', 'bombay university', 'madras university'
    ];

    for (let line of lines) {
      const lowerLine = line.toLowerCase();
      for (let keyword of collegeKeywords) {
        if (lowerLine.includes(keyword)) {
          return line.trim();
        }
      }
    }
    return '';
  }

  /**
   * Extract experience level
   */
  static extractExperience(lowerText) {
    if (lowerText.includes('fresher') || lowerText.includes('student') || lowerText.includes('0 year')) {
      return 'beginner';
    } else if (lowerText.includes('1 year') || lowerText.includes('2 year') || lowerText.includes('3 year')) {
      return 'intermediate';
    } else if (lowerText.includes('4 year') || lowerText.includes('5 year')) {
      return 'advanced';
    } else if (lowerText.includes('6 year') || lowerText.includes('7 year') || lowerText.includes('8 year') || lowerText.includes('9 year') || lowerText.includes('10+')) {
      return 'expert';
    }
    return '';
  }

  /**
   * Extract technical skills
   */
  static extractSkills(lowerText) {
    const skillKeywords = [
      // Programming Languages
      'javascript', 'python', 'java', 'c++', 'c#', 'php', 'ruby', 'go', 'rust', 'swift', 'kotlin', 'dart',
      
      // Web Technologies
      'html', 'css', 'react', 'angular', 'vue', 'node', 'express', 'django', 'flask', 'spring', 'laravel',
      'next.js', 'nuxt.js', 'svelte', 'ember', 'backbone', 'jquery', 'bootstrap', 'tailwind', 'sass', 'less',
      
      // Databases
      'mongodb', 'mysql', 'postgresql', 'sqlite', 'redis', 'elasticsearch', 'dynamodb', 'firebase',
      
      // Cloud & DevOps
      'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'jenkins', 'git', 'github', 'gitlab', 'bitbucket',
      
      // Mobile Development
      'react native', 'flutter', 'xamarin', 'ionic', 'cordova',
      
      // Data Science & AI
      'machine learning', 'artificial intelligence', 'data science', 'tensorflow', 'pytorch', 'scikit-learn',
      'pandas', 'numpy', 'matplotlib', 'seaborn', 'jupyter', 'r', 'spark', 'hadoop',
      
      // Blockchain
      'blockchain', 'ethereum', 'solidity', 'web3', 'smart contracts',
      
      // Other Technologies
      'graphql', 'rest api', 'microservices', 'serverless', 'lambda', 'terraform', 'ansible',
      'linux', 'ubuntu', 'centos', 'nginx', 'apache', 'wordpress', 'shopify'
    ];

    const foundSkills = [];
    
    skillKeywords.forEach(skill => {
      if (lowerText.includes(skill.toLowerCase())) {
        // Check if skill is not already added (case-insensitive)
        if (!foundSkills.some(s => s.toLowerCase() === skill.toLowerCase())) {
          foundSkills.push(skill.charAt(0).toUpperCase() + skill.slice(1));
        }
      }
    });

    return foundSkills;
  }

  /**
   * Parse resume based on file type
   */
  static async parseResume(fileBuffer, fileType) {
    switch (fileType.toLowerCase()) {
      case 'application/pdf':
        return await this.parsePDF(fileBuffer);
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      case 'application/msword':
        return await this.parseDOCX(fileBuffer);
      case 'text/plain':
        return await this.parseTXT(fileBuffer);
      default:
        throw new Error(`Unsupported file type: ${fileType}`);
    }
  }
}

module.exports = ResumeParser;
