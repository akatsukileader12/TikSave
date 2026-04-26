export const HTML_CURRICULUM = {
  id: 'html',
  title: 'HTML Basics',
  icon: '📄',
  color: '#E44D26',
  desc: 'Structure your web pages',
  lessons: [
    {
      id: 'h1',
      title: 'What is HTML?',
      estimatedTime: '15 min',
      sections: [
        {
          type: 'intro',
          heading: 'The Language of the Web',
          text: 'Every website you visit starts as plain text that browsers turn into visual pages. HTML is that text.',
          analogy: 'Think of HTML like the skeleton of a body. CSS is the skin. JavaScript is the muscles.'
        },
        {
          type: 'concept',
          heading: 'Tags: The Building Blocks',
          text: 'HTML uses tags wrapped in angle brackets. Most come in pairs.',
          code: '<h1>This is a heading</h1>\n<p>This is a paragraph</p>',
          breakdown: ['<h1> = opening tag', 'This is a heading = content', '</h1> = closing tag (notice the /)']
        },
        {
          type: 'warning',
          heading: 'Common Mistake',
          text: 'Forgetting the closing tag breaks your layout.',
          wrong: '<h1>My Title',
          right: '<h1>My Title</h1>',
          why: 'Without </h1>, the browser thinks everything after is still a heading.'
        },
        {
          type: 'checkpoint',
          heading: 'Checkpoint',
          question: 'What does the / in </h1> mean?',
          options: ['Start a new tag', 'End the current tag', 'Add a comment', 'Make text italic'],
          correct: 1,
          explanation: 'The slash / tells the browser to end the element.'
        }
      ]
    },
    {
      id: 'h2',
      title: 'Headings and Paragraphs',
      estimatedTime: '12 min',
      sections: [
        {
          type: 'intro',
          heading: 'Text Hierarchy',
          text: 'Web pages need structure like books. Headings create that structure.'
        },
        {
          type: 'concept',
          heading: 'Six Levels of Headings',
          text: 'HTML has six heading levels from h1 (most important) to h6.',
          code: '<h1>Main Title</h1>\n<h2>Chapter 1</h2>\n<h3>Section 1.1</h3>',
          breakdown: ['h1 = page title (use once)', 'h2 = major sections', 'h3 = subsections']
        },
        {
          type: 'checkpoint',
          heading: 'Checkpoint',
          question: 'Which heading is biggest?',
          options: ['<h6>', '<h3>', '<h1>', '<h2>'],
          correct: 2,
          explanation: 'h1 is the biggest and most important heading.'
        }
      ]
    },
    {
      id: 'h3',
      title: 'Links and Anchors',
      estimatedTime: '15 min',
      sections: [
        {
          type: 'intro',
          heading: 'Connecting Pages',
          text: 'The web is built on links. The <a> tag creates clickable links to other pages.'
        },
        {
          type: 'concept',
          heading: 'The Anchor Tag',
          text: 'Use href attribute to specify the destination URL.',
          code: '<a href="https://example.com">Click me</a>',
          breakdown: ['<a> = anchor tag', 'href = hypertext reference (URL)', 'Click me = visible link text']
        },
        {
          type: 'warning',
          heading: 'Missing Protocol',
          text: 'Always include https:// in external links.',
          wrong: '<a href="google.com">Google</a>',
          right: '<a href="https://google.com">Google</a>',
          why: 'Without https://, the browser treats it as a local file path.'
        },
        {
          type: 'try-it',
          heading: 'Your Turn',
          instruction: 'Create a link to your favorite website.',
          starter: '<a href="">My Favorite Site</a>'
        },
        {
          type: 'checkpoint',
          heading: 'Checkpoint',
          question: 'Which attribute specifies the link URL?',
          options: ['src', 'href', 'link', 'url'],
          correct: 1,
          explanation: 'The href attribute defines the destination URL.'
        }
      ]
    },
    {
      id: 'h4',
      title: 'Images',
      estimatedTime: '12 min',
      sections: [
        {
          type: 'intro',
          heading: 'Visual Content',
          text: 'Images make web pages engaging. The <img> tag embeds images.'
        },
        {
          type: 'concept',
          heading: 'The Image Tag',
          text: 'img is self-closing (no closing tag). Use src for the image path and alt for description.',
          code: '<img src="photo.jpg" alt="A beautiful sunset">',
          breakdown: ['<img> = image tag', 'src = source file path', 'alt = alternative text for accessibility']
        },
        {
          type: 'warning',
          heading: 'Always Use Alt Text',
          text: 'Screen readers need alt text. Search engines use it too.',
          wrong: '<img src="logo.png">',
          right: '<img src="logo.png" alt="Company Logo">',
          why: 'Without alt, visually impaired users have no context about the image.'
        },
        {
          type: 'checkpoint',
          heading: 'Checkpoint',
          question: 'Which attribute describes the image for screen readers?',
          options: ['title', 'desc', 'alt', 'name'],
          correct: 2,
          explanation: 'The alt attribute provides alternative text descriptions.'
        }
      ]
    },
    {
      id: 'h5',
      title: 'Lists',
      estimatedTime: '15 min',
      sections: [
        {
          type: 'intro',
          heading: 'Organized Content',
          text: 'Lists structure related items. HTML offers ordered and unordered lists.'
        },
        {
          type: 'concept',
          heading: 'Two Types of Lists',
          text: 'Use <ul> for bullet points and <ol> for numbered lists. Each item uses <li>.',
          code: '<ul>\n  <li>Apples</li>\n  <li>Bananas</li>\n</ul>\n\n<ol>\n  <li>Step 1</li>\n  <li>Step 2</li>\n</ol>',
          breakdown: ['<ul> = unordered list (bullets)', '<ol> = ordered list (numbers)', '<li> = list item']
        },
        {
          type: 'try-it',
          heading: 'Your Turn',
          instruction: 'Create a numbered list of your top 3 hobbies.',
          starter: '<ol>\n  <li></li>\n</ol>'
        },
        {
          type: 'checkpoint',
          heading: 'Checkpoint',
          question: 'Which tag creates a bullet list?',
          options: ['<ol>', '<li>', '<ul>', '<list>'],
          correct: 2,
          explanation: '<ul> creates an unordered (bulleted) list.'
        }
      ]
    },
    {
      id: 'h6',
      title: 'Forms and Inputs',
      estimatedTime: '20 min',
      sections: [
        {
          type: 'intro',
          heading: 'User Interaction',
          text: 'Forms collect user input — names, emails, passwords, choices.'
        },
        {
          type: 'concept',
          heading: 'Basic Input Types',
          text: 'The <input> tag has many types for different data.',
          code: '<input type="text" placeholder="Your name">\n<input type="email" placeholder="Email">\n<input type="password" placeholder="Password">',
          breakdown: ['type="text" = single line text', 'type="email" = validates email format', 'type="password" = hides characters']
        },
        {
          type: 'concept',
          heading: 'Form Structure',
          text: 'Wrap inputs in a <form> tag and add a submit button.',
          code: '<form>\n  <label>Name:</label>\n  <input type="text">\n  <button type="submit">Send</button>\n</form>',
          breakdown: ['<form> = form container', '<label> = describes the input', '<button type="submit"> = sends the form']
        },
        {
          type: 'checkpoint',
          heading: 'Checkpoint',
          question: 'Which input type hides typed characters?',
          options: ['hidden', 'secret', 'password', 'private'],
          correct: 2,
          explanation: 'type="password" masks characters with dots.'
        }
      ]
    },
    {
      id: 'h7',
      title: 'Tables',
      estimatedTime: '18 min',
      sections: [
        {
          type: 'intro',
          heading: 'Tabular Data',
          text: 'Tables display data in rows and columns — perfect for schedules, prices, comparisons.'
        },
        {
          type: 'concept',
          heading: 'Table Structure',
          text: 'Tables use rows (<tr>) containing header cells (<th>) or data cells (<td>).',
          code: '<table>\n  <tr>\n    <th>Name</th>\n    <th>Age</th>\n  </tr>\n  <tr>\n    <td>John</td>\n    <td>25</td>\n  </tr>\n</table>',
          breakdown: ['<table> = table container', '<tr> = table row', '<th> = header cell (bold)', '<td> = data cell']
        },
        {
          type: 'warning',
          heading: 'Do Not Use for Layout',
          text: 'Tables are for data only, not page layout.',
          wrong: 'Using <table> to create a sidebar and main content area.',
          right: 'Use CSS Flexbox or Grid for layout.',
          why: 'Tables are not responsive and hurt accessibility when used for layout.'
        },
        {
          type: 'checkpoint',
          heading: 'Checkpoint',
          question: 'Which tag creates a table row?',
          options: ['<row>', '<tr>', '<td>', '<th>'],
          correct: 1,
          explanation: '<tr> stands for table row.'
        }
      ]
    },
    {
      id: 'h8',
      title: 'Semantic HTML',
      estimatedTime: '20 min',
      sections: [
        {
          type: 'intro',
          heading: 'Meaningful Structure',
          text: 'Semantic tags describe their content purpose, making code readable and accessible.'
        },
        {
          type: 'concept',
          heading: 'Key Semantic Tags',
          text: 'Replace generic <div> with meaningful tags.',
          code: '<header>Logo and nav</header>\n<main>\n  <article>Blog post</article>\n  <aside>Related links</aside>\n</main>\n<footer>Copyright 2026</footer>',
          breakdown: ['<header> = top of page', '<main> = primary content', '<article> = standalone content', '<footer> = bottom info']
        },
        {
          type: 'warning',
          heading: 'Div Soup',
          text: 'Overusing <div> makes code hard to understand.',
          wrong: '<div class="header"><div class="nav">...</div></div>',
          right: '<header><nav>...</nav></header>',
          why: 'Semantic tags are self-documenting and help screen readers navigate.'
        },
        {
          type: 'checkpoint',
          heading: 'Checkpoint',
          question: 'Which tag should wrap the main content of a page?',
          options: ['<div>', '<section>', '<main>', '<body>'],
          correct: 2,
          explanation: '<main> identifies the primary content area.'
        }
      ]
    }
  ]
};
