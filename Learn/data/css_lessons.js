export const CSS_CURRICULUM = {
  id: 'css',
  title: 'CSS Styling',
  icon: '🎨',
  color: '#264DE4',
  desc: 'Make it beautiful',
  lessons: [
    {
      id: 'c1',
      title: 'What is CSS?',
      estimatedTime: '15 min',
      sections: [
        {
          type: 'intro',
          heading: 'From Skeleton to Skin',
          text: 'CSS controls colors, fonts, spacing, and layout. It transforms plain HTML into beautiful pages.'
        },
        {
          type: 'concept',
          heading: 'Your First CSS Rule',
          text: 'CSS rules have three parts: selector, property, and value.',
          code: 'h1 {\n  color: blue;\n  font-size: 24px;\n}',
          breakdown: ['h1 = selector', 'color: blue; = property: value', '; = separates properties']
        },
        {
          type: 'checkpoint',
          heading: 'Checkpoint',
          question: 'Which property changes text color?',
          options: ['font-color', 'text-color', 'color', 'background'],
          correct: 2,
          explanation: 'The color property sets text color.'
        }
      ]
    },
    {
      id: 'c2',
      title: 'Selectors Deep Dive',
      estimatedTime: '18 min',
      sections: [
        {
          type: 'intro',
          heading: 'Targeting Elements',
          text: 'Selectors tell CSS which HTML elements to style. Different selectors offer different precision.'
        },
        {
          type: 'concept',
          heading: 'Three Main Selectors',
          text: 'Element, class, and ID selectors each have specific use cases.',
          code: 'p { color: red; }        /* element */\n.intro { color: blue; }  /* class */\n#logo { width: 100px; } /* ID */',
          breakdown: ['Element = all tags of that type', 'Class = reusable, starts with .', 'ID = unique, starts with #']
        },
        {
          type: 'warning',
          heading: 'Specificity Wars',
          text: 'ID beats class, class beats element. Overusing IDs makes CSS hard to override.',
          wrong: '#header #nav #link { color: red; }',
          right: '.nav-link { color: red; }',
          why: 'Lower specificity makes styles easier to reuse and override.'
        },
        {
          type: 'checkpoint',
          heading: 'Checkpoint',
          question: 'Which selector targets a class?',
          options: ['.menu', '#menu', 'menu', '*menu'],
          correct: 0,
          explanation: 'Classes use the dot prefix: .classname'
        }
      ]
    },
    {
      id: 'c3',
      title: 'Colors and Backgrounds',
      estimatedTime: '15 min',
      sections: [
        {
          type: 'intro',
          heading: 'Visual Identity',
          text: 'Colors create mood and brand recognition. CSS offers multiple ways to define them.'
        },
        {
          type: 'concept',
          heading: 'Color Formats',
          text: 'Name, hex, rgb, and rgba give you flexibility.',
          code: 'color: red;\ncolor: #FF0000;\ncolor: rgb(255, 0, 0);\ncolor: rgba(255, 0, 0, 0.5); /* 50% transparent */',
          breakdown: ['red = named color', '#FF0000 = hexadecimal', 'rgb() = red, green, blue values', 'rgba() = rgb + alpha transparency']
        },
        {
          type: 'concept',
          heading: 'Background Properties',
          text: 'Control background color, images, and how they display.',
          code: 'background-color: #f0f0f0;\nbackground-image: url("bg.jpg");\nbackground-size: cover;',
          breakdown: ['background-color = solid fill', 'background-image = picture background', 'background-size: cover = fill the space']
        },
        {
          type: 'checkpoint',
          heading: 'Checkpoint',
          question: 'Which format includes transparency?',
          options: ['#FF0000', 'rgb(255,0,0)', 'rgba(255,0,0,0.5)', 'red'],
          correct: 2,
          explanation: 'rgba() has a fourth value (0-1) for transparency.'
        }
      ]
    },
    {
      id: 'c4',
      title: 'Typography',
      estimatedTime: '18 min',
      sections: [
        {
          type: 'intro',
          heading: 'The Power of Text',
          text: 'Good typography makes content readable and professional. CSS gives you full control.'
        },
        {
          type: 'concept',
          heading: 'Font Properties',
          text: 'Control family, size, weight, line height, and more.',
          code: 'body {\n  font-family: Arial, sans-serif;\n  font-size: 16px;\n  font-weight: 400;\n  line-height: 1.5;\n}',
          breakdown: ['font-family = typeface', 'font-size = text size', 'font-weight = thickness (400=normal, 700=bold)', 'line-height = vertical spacing']
        },
        {
          type: 'warning',
          heading: 'Font Stack Fallacy',
          text: 'Always provide fallback fonts. Not all devices have the same fonts.',
          wrong: 'font-family: "Helvetica Neue";',
          right: 'font-family: "Helvetica Neue", Arial, sans-serif;',
          why: 'If Helvetica is missing, the browser tries Arial, then any sans-serif font.'
        },
        {
          type: 'try-it',
          heading: 'Your Turn',
          instruction: 'Style a paragraph with 18px font, 1.6 line-height, and a custom font stack.',
          starter: 'p {\n  font-size: ;\n  line-height: ;\n  font-family: ;\n}'
        },
        {
          type: 'checkpoint',
          heading: 'Checkpoint',
          question: 'Which value makes text bold?',
          options: ['font-weight: 300', 'font-weight: 400', 'font-weight: 700', 'font-weight: normal'],
          correct: 2,
          explanation: '700 is the standard bold weight.'
        }
      ]
    },
    {
      id: 'c5',
      title: 'Box Model',
      estimatedTime: '20 min',
      sections: [
        {
          type: 'intro',
          heading: 'Everything is a Box',
          text: 'Every HTML element is a rectangular box. Understanding this is essential for layout.'
        },
        {
          type: 'concept',
          heading: 'The Four Layers',
          text: 'Content → Padding → Border → Margin, from inside out.',
          code: '.box {\n  width: 200px;\n  padding: 20px;\n  border: 2px solid black;\n  margin: 10px;\n}',
          breakdown: ['Content = actual width/height', 'Padding = space inside the box', 'Border = edge of the box', 'Margin = space outside the box']
        },
        {
          type: 'concept',
          heading: 'Box-Sizing Fix',
          text: 'By default, padding and border add to the total size. box-sizing fixes this.',
          code: '* {\n  box-sizing: border-box;\n}',
          breakdown: ['border-box = width includes padding and border', 'content-box = width is content only (default)']
        },
        {
          type: 'warning',
          heading: 'Margin Collapse',
          text: 'Vertical margins between elements sometimes collapse to the larger value.',
          wrong: 'Expecting 20px + 30px = 50px gap between two elements.',
          right: 'The gap will be 30px (the larger margin).',
          why: 'Margin collapse only happens with vertical margins, not horizontal.'
        },
        {
          type: 'checkpoint',
          heading: 'Checkpoint',
          question: 'Which creates space OUTSIDE the element border?',
          options: ['padding', 'border', 'margin', 'content'],
          correct: 2,
          explanation: 'Margin is the outermost layer, creating space between elements.'
        }
      ]
    },
    {
      id: 'c6',
      title: 'Flexbox Layout',
      estimatedTime: '25 min',
      sections: [
        {
          type: 'intro',
          heading: 'Modern Layout',
          text: 'Flexbox is the go-to tool for one-dimensional layouts: rows or columns.'
        },
        {
          type: 'concept',
          heading: 'Flex Container',
          text: 'Set display: flex on a parent to align children.',
          code: '.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 20px;\n}',
          breakdown: ['display: flex = enable flexbox', 'justify-content = horizontal alignment', 'align-items = vertical alignment', 'gap = space between items']
        },
        {
          type: 'concept',
          heading: 'Flex Direction',
          text: 'Control whether items flow horizontally or vertically.',
          code: 'flex-direction: row;    /* left to right */\nflex-direction: column; /* top to bottom */',
          breakdown: ['row = horizontal (default)', 'column = vertical', 'row-reverse / column-reverse = reversed order']
        },
        {
          type: 'try-it',
          heading: 'Your Turn',
          instruction: 'Create a navigation bar with 4 links spaced evenly in a row.',
          starter: 'nav {\n  display: flex;\n  justify-content: ;\n}\n\nnav a {\n  padding: 10px;\n}'
        },
        {
          type: 'checkpoint',
          heading: 'Checkpoint',
          question: 'Which property aligns items vertically?',
          options: ['justify-content', 'align-items', 'flex-direction', 'gap'],
          correct: 1,
          explanation: 'align-items controls vertical alignment in a row layout.'
        }
      ]
    },
    {
      id: 'c7',
      title: 'CSS Grid',
      estimatedTime: '25 min',
      sections: [
        {
          type: 'intro',
          heading: 'Two-Dimensional Power',
          text: 'Grid handles rows AND columns simultaneously — perfect for page layouts and galleries.'
        },
        {
          type: 'concept',
          heading: 'Grid Template',
          text: 'Define columns and rows with fr units (fractions of space).',
          code: '.grid {\n  display: grid;\n  grid-template-columns: 1fr 2fr 1fr;\n  gap: 20px;\n}',
          breakdown: ['display: grid = enable grid', '1fr = one fraction of space', '2fr = twice the space of 1fr', 'gap = spacing between cells']
        },
        {
          type: 'concept',
          heading: 'Spanning Cells',
          text: 'Items can span multiple rows or columns.',
          code: '.header {\n  grid-column: 1 / -1; /* spans all columns */\n}',
          breakdown: ['grid-column = horizontal span', '1 / -1 = from first to last column', 'grid-row = vertical span']
        },
        {
          type: 'warning',
          heading: 'Grid vs Flexbox',
          text: 'Do not use Grid for simple one-line layouts.',
          wrong: 'Using Grid for a single row of navigation links.',
          right: 'Use Flexbox for nav bars, Grid for full page layouts.',
          why: 'Flexbox is simpler for 1D layouts. Grid shines in 2D complex layouts.'
        },
        {
          type: 'checkpoint',
          heading: 'Checkpoint',
          question: 'What does 1fr mean in grid?',
          options: ['1 pixel', '1 fraction of space', '1 frame', 'first row'],
          correct: 1,
          explanation: 'fr = fraction unit, dividing available space proportionally.'
        }
      ]
    },
    {
      id: 'c8',
      title: 'Responsive Design',
      estimatedTime: '25 min',
      sections: [
        {
          type: 'intro',
          heading: 'One Site, All Screens',
          text: 'Responsive design makes websites look great on phones, tablets, and desktops.'
        },
        {
          type: 'concept',
          heading: 'Media Queries',
          text: 'Apply different styles at different screen widths.',
          code: '@media (max-width: 600px) {\n  .nav { flex-direction: column; }\n}\n\n@media (min-width: 601px) {\n  .nav { flex-direction: row; }\n}',
          breakdown: ['@media = conditional rule', 'max-width = applies below this width', 'min-width = applies above this width']
        },
        {
          type: 'concept',
          heading: 'Mobile-First Approach',
          text: 'Design for mobile first, then enhance for larger screens.',
          code: '/* Mobile styles (default) */\n.container { padding: 10px; }\n\n/* Desktop enhancement */\n@media (min-width: 768px) {\n  .container { padding: 40px; }\n}',
          breakdown: ['Base styles = mobile', 'min-width queries = tablet/desktop additions', 'Fewer overrides needed this way']
        },
        {
          type: 'warning',
          heading: 'Viewport Meta Tag',
          text: 'Without this meta tag, mobile browsers scale your site incorrectly.',
          wrong: 'Forgetting the viewport tag in HTML head.',
          right: '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
          why: 'This tells the browser to match the screen width and not zoom out.'
        },
        {
          type: 'checkpoint',
          heading: 'Checkpoint',
          question: 'Which approach is recommended?',
          options: ['Desktop-first', 'Mobile-first', 'Tablet-first', 'Print-first'],
          correct: 1,
          explanation: 'Mobile-first is the industry standard for responsive design.'
        }
      ]
    }
  ]
};
