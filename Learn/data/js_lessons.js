export const JS_CURRICULUM = {
  id: 'js',
  title: 'JavaScript',
  icon: '⚡',
  color: '#F7DF1E',
  desc: 'Make it interactive',
  lessons: [
    {
      id: 'j1',
      title: 'What is JavaScript?',
      estimatedTime: '15 min',
      sections: [
        {
          type: 'intro',
          heading: 'The Brain of the Web',
          text: 'JavaScript makes web pages interactive. It responds to clicks, fetches data, updates content dynamically.'
        },
        {
          type: 'concept',
          heading: 'Three Web Technologies',
          text: 'HTML = structure, CSS = style, JavaScript = behavior.',
          code: 'document.querySelector("button").addEventListener("click", () => {\n  alert("Hello!");\n});',
          breakdown: ['document = the web page', 'querySelector = finds an element', 'addEventListener = waits for an action', 'alert = shows a popup']
        },
        {
          type: 'warning',
          heading: 'Java vs JavaScript',
          text: 'They are completely different languages despite the similar name.',
          wrong: 'Thinking Java and JavaScript are the same.',
          right: 'JavaScript was named for marketing reasons only.',
          why: 'Java is compiled and runs on servers. JavaScript runs in browsers and is interpreted.'
        },
        {
          type: 'checkpoint',
          heading: 'Checkpoint',
          question: 'What does JavaScript primarily add to a web page?',
          options: ['Colors', 'Structure', 'Interactivity', 'Fonts'],
          correct: 2,
          explanation: 'JavaScript handles behavior and interactivity.'
        }
      ]
    },
    {
      id: 'j2',
      title: 'Variables and Data Types',
      estimatedTime: '20 min',
      sections: [
        {
          type: 'intro',
          heading: 'Storing Information',
          text: 'Variables store data that your program can use and modify. JavaScript has several ways to declare them.'
        },
        {
          type: 'concept',
          heading: 'Three Ways to Declare',
          text: 'var, let, and const each have different behaviors.',
          code: 'var oldWay = "avoid this";   /* function scope */\nlet count = 0;               /* block scope, can change */\nconst PI = 3.14;             /* block scope, cannot change */',
          breakdown: ['var = old, function-scoped', 'let = modern, reassignable', 'const = modern, fixed value']
        },
        {
          type: 'concept',
          heading: 'Common Data Types',
          text: 'JavaScript works with strings, numbers, booleans, and more.',
          code: 'let name = "Banele";      /* string */\nlet age = 25;             /* number */\nlet isStudent = true;     /* boolean */\nlet skills = ["HTML", "CSS"]; /* array */',
          breakdown: ['String = text in quotes', 'Number = integer or decimal', 'Boolean = true or false', 'Array = list of values']
        },
        {
          type: 'warning',
          heading: 'Const Confusion',
          text: 'const prevents reassignment, but objects and arrays can still be modified.',
          wrong: 'const user = {name: "John"}; user = {name: "Jane"};',
          right: 'const user = {name: "John"}; user.name = "Jane";',
          why: 'const locks the variable reference, not the contents of objects/arrays.'
        },
        {
          type: 'checkpoint',
          heading: 'Checkpoint',
          question: 'Which declaration should you use for a value that will not change?',
          options: ['var', 'let', 'const', 'static'],
          correct: 2,
          explanation: 'const creates a constant that cannot be reassigned.'
        }
      ]
    },
    {
      id: 'j3',
      title: 'Functions',
      estimatedTime: '20 min',
      sections: [
        {
          type: 'intro',
          heading: 'Reusable Code Blocks',
          text: 'Functions bundle code into named blocks you can call whenever needed. They are the building blocks of programming.'
        },
        {
          type: 'concept',
          heading: 'Function Declaration',
          text: 'Define a function with the function keyword, then call it by name.',
          code: 'function greet(name) {\n  return "Hello, " + name;\n}\n\nconsole.log(greet("Banele")); // Hello, Banele',
          breakdown: ['function = declaration keyword', 'greet = function name', 'name = parameter (input)', 'return = output value']
        },
        {
          type: 'concept',
          heading: 'Arrow Functions',
          text: 'A shorter syntax for simple functions.',
          code: 'const greet = (name) => {\n  return `Hello, ${name}`;\n};\n\n// Even shorter for single expressions:\nconst double = x => x * 2;',
          breakdown: ['=> = arrow function syntax', '${name} = template literal interpolation', 'Single expression can omit return and braces']
        },
        {
          type: 'try-it',
          heading: 'Your Turn',
          instruction: 'Write a function that takes a number and returns its square.',
          starter: 'function square(num) {\n  return ;\n}\n\n// Or arrow style:\nconst square = num => ;'
        },
        {
          type: 'checkpoint',
          heading: 'Checkpoint',
          question: 'What does the return keyword do?',
          options: ['Stops the program', 'Outputs a value from the function', 'Logs to console', 'Creates a variable'],
          correct: 1,
          explanation: 'return sends a value back to where the function was called.'
        }
      ]
    },
    {
      id: 'j4',
      title: 'Conditionals',
      estimatedTime: '18 min',
      sections: [
        {
          type: 'intro',
          heading: 'Making Decisions',
          text: 'Conditionals let your code choose different paths based on whether something is true or false.'
        },
        {
          type: 'concept',
          heading: 'If, Else If, Else',
          text: 'Check conditions in order and execute the matching block.',
          code: 'let score = 85;\n\nif (score >= 90) {\n  console.log("A");\n} else if (score >= 80) {\n  console.log("B");\n} else {\n  console.log("C or lower");\n}',
          breakdown: ['if = first condition', 'else if = additional checks', 'else = fallback if nothing matches', '>= = greater than or equal']
        },
        {
          type: 'concept',
          heading: 'Comparison Operators',
          text: 'Use these to compare values in conditions.',
          code: '===  /* equal value AND type */\n!==  /* not equal */\n>    /* greater than */\n<    /* less than */\n>=   /* greater or equal */\n<=   /* less or equal */',
          breakdown: ['=== checks value and type', '== only checks value (avoid)', '!== is the opposite of ===']
        },
        {
          type: 'warning',
          heading: 'Double vs Triple Equals',
          text: '== allows type coercion which causes unexpected results.',
          wrong: '"5" == 5  // true (types ignored)',
          right: '"5" === 5 // false (string !== number)',
          why: 'Always use === and !== to avoid silent bugs from automatic type conversion.'
        },
        {
          type: 'checkpoint',
          heading: 'Checkpoint',
          question: 'Which operator checks both value AND type?',
          options: ['==', '===', '=', '!='],
          correct: 1,
          explanation: '=== is strict equality, checking both value and data type.'
        }
      ]
    },
    {
      id: 'j5',
      title: 'Loops',
      estimatedTime: '20 min',
      sections: [
        {
          type: 'intro',
          heading: 'Repeating Actions',
          text: 'Loops run code multiple times. They are essential for processing lists and repeating tasks.'
        },
        {
          type: 'concept',
          heading: 'For Loop',
          text: 'The classic loop with initialization, condition, and increment.',
          code: 'for (let i = 0; i < 5; i++) {\n  console.log(i); // 0, 1, 2, 3, 4\n}',
          breakdown: ['let i = 0 = start at 0', 'i < 5 = keep going while true', 'i++ = increase by 1 each time']
        },
        {
          type: 'concept',
          heading: 'For...Of Loop',
          text: 'A cleaner way to iterate over arrays.',
          code: 'const fruits = ["apple", "banana", "cherry"];\n\nfor (const fruit of fruits) {\n  console.log(fruit);\n}',
          breakdown: ['for...of = iterate values', 'fruit = each item in the array', 'Cleaner than traditional for with arrays']
        },
        {
          type: 'warning',
          heading: 'Infinite Loops',
          text: 'Forgetting to update the loop variable causes the loop to run forever.',
          wrong: 'for (let i = 0; i < 5;) { console.log(i); }',
          right: 'for (let i = 0; i < 5; i++) { console.log(i); }',
          why: 'Without i++, i stays 0 forever and the condition never becomes false.'
        },
        {
          type: 'checkpoint',
          heading: 'Checkpoint',
          question: 'Which loop is best for iterating over an array?',
          options: ['for', 'while', 'for...of', 'do...while'],
          correct: 2,
          explanation: 'for...of is the cleanest and most readable for array iteration.'
        }
      ]
    },
    {
      id: 'j6',
      title: 'Arrays and Methods',
      estimatedTime: '22 min',
      sections: [
        {
          type: 'intro',
          heading: 'Ordered Collections',
          text: 'Arrays store multiple values in a single variable. JavaScript arrays are powerful and flexible.'
        },
        {
          type: 'concept',
          heading: 'Essential Array Methods',
          text: 'Modern JavaScript provides powerful built-in methods.',
          code: 'const nums = [1, 2, 3, 4, 5];\n\nnums.push(6);        // Add to end\nnums.pop();          // Remove from end\nnums.includes(3);    // Check if exists\nnums.map(n => n * 2); // Transform each item',
          breakdown: ['push/pop = add/remove at end', 'includes = check membership', 'map = transform each element', 'filter = keep matching elements']
        },
        {
          type: 'concept',
          heading: 'Map, Filter, Reduce',
          text: 'The three pillars of functional array processing.',
          code: 'const prices = [10, 20, 30];\n\nconst doubled = prices.map(p => p * 2);      // [20, 40, 60]\nconst over15 = prices.filter(p => p > 15);   // [20, 30]\nconst total = prices.reduce((sum, p) => sum + p, 0); // 60',
          breakdown: ['map = transform each item', 'filter = keep items matching condition', 'reduce = combine into single value']
        },
        {
          type: 'try-it',
          heading: 'Your Turn',
          instruction: 'Given [5, 10, 15, 20], use filter to get numbers greater than 10.',
          starter: 'const nums = [5, 10, 15, 20];\nconst result = nums.filter();'
        },
        {
          type: 'checkpoint',
          heading: 'Checkpoint',
          question: 'What does .map() return?',
          options: ['A single value', 'A new array with transformed items', 'The first matching item', 'True or false'],
          correct: 1,
          explanation: 'map() returns a new array with each element transformed by your function.'
        }
      ]
    },
    {
      id: 'j7',
      title: 'DOM Manipulation',
      estimatedTime: '25 min',
      sections: [
        {
          type: 'intro',
          heading: 'Controlling the Page',
          text: 'The DOM (Document Object Model) lets JavaScript read and modify HTML elements in real time.'
        },
        {
          type: 'concept',
          heading: 'Selecting Elements',
          text: 'Grab HTML elements to read or change them.',
          code: 'document.getElementById("title");\ndocument.querySelector(".menu");\ndocument.querySelectorAll("p");',
          breakdown: ['getElementById = single element by ID', 'querySelector = first match of CSS selector', 'querySelectorAll = all matches (returns NodeList)']
        },
        {
          type: 'concept',
          heading: 'Changing Content and Style',
          text: 'Once selected, modify text, HTML, or styles dynamically.',
          code: 'const heading = document.querySelector("h1");\nheading.textContent = "New Title";\nheading.style.color = "red";\nheading.classList.add("highlight");',
          breakdown: ['textContent = change plain text', 'innerHTML = change HTML inside', 'style.property = set inline style', 'classList.add = add CSS class']
        },
        {
          type: 'warning',
          heading: 'innerHTML Security',
          text: 'Using innerHTML with user input opens your site to attacks.',
          wrong: 'element.innerHTML = userInput;',
          right: 'element.textContent = userInput;',
          why: 'textContent treats input as plain text. innerHTML executes any HTML/JS inside.'
        },
        {
          type: 'checkpoint',
          heading: 'Checkpoint',
          question: 'Which is safest for displaying user input?',
          options: ['innerHTML', 'textContent', 'outerHTML', 'document.write'],
          correct: 1,
          explanation: 'textContent never executes HTML or JavaScript, preventing XSS attacks.'
        }
      ]
    },
    {
      id: 'j8',
      title: 'Events and Event Listeners',
      estimatedTime: '22 min',
      sections: [
        {
          type: 'intro',
          heading: 'Responding to Users',
          text: 'Events are actions like clicks, typing, scrolling. Event listeners watch for these and run code.'
        },
        {
          type: 'concept',
          heading: 'Adding Event Listeners',
          text: 'Attach a function to run when an event occurs on an element.',
          code: 'const btn = document.querySelector("#submit");\n\nbtn.addEventListener("click", () => {\n  console.log("Button clicked!");\n});',
          breakdown: ['addEventListener = attach handler', '"click" = event type', '() => {} = function to run', 'Can add multiple listeners to one element']
        },
        {
          type: 'concept',
          heading: 'Common Event Types',
          text: 'JavaScript handles many user interactions.',
          code: '"click"      /* mouse click */\n"submit"     /* form submission */\n"keydown"    /* key pressed */\n"input"      /* form value changed */\n"scroll"     /* page scrolled */',
          breakdown: ['click = mouse or touch tap', 'submit = form sent', 'keydown = keyboard press', 'input = any input change']
        },
        {
          type: 'warning',
          heading: 'Forgetting to Prevent Default',
          text: 'Some elements have default behaviors you may want to stop.',
          wrong: 'form.addEventListener("submit", () => { sendData(); });',
          right: 'form.addEventListener("submit", (e) => { e.preventDefault(); sendData(); });',
          why: 'Without preventDefault(), the form reloads the page before your code finishes.'
        },
        {
          type: 'checkpoint',
          heading: 'Checkpoint',
          question: 'What does e.preventDefault() do?',
          options: ['Stops the event from bubbling', 'Stops the default browser behavior', 'Removes the event listener', 'Creates a new event'],
          correct: 1,
          explanation: 'preventDefault() stops the browser\'s built-in action for that event.'
        }
      ]
    },
    {
      id: 'j9',
      title: 'Async JavaScript',
      estimatedTime: '25 min',
      sections: [
        {
          type: 'intro',
          heading: 'Non-Blocking Code',
          text: 'Async operations (fetching data, timers) let your app stay responsive while waiting.'
        },
        {
          type: 'concept',
          heading: 'Promises',
          text: 'A Promise represents a value that will exist in the future.',
          code: 'fetch("https://api.example.com/data")\n  .then(response => response.json())\n  .then(data => console.log(data))\n  .catch(error => console.error(error));',
          breakdown: ['fetch = network request', '.then = run when successful', '.catch = run on error', 'Returns a Promise object']
        },
        {
          type: 'concept',
          heading: 'Async/Await',
          text: 'A cleaner syntax for working with Promises.',
          code: 'async function getData() {\n  try {\n    const response = await fetch("https://api.example.com/data");\n    const data = await response.json();\n    console.log(data);\n  } catch (error) {\n    console.error(error);\n  }\n}',
          breakdown: ['async = function returns a Promise', 'await = pause until Promise resolves', 'try/catch = handle errors gracefully']
        },
        {
          type: 'warning',
          heading: 'Forgetting Await',
          text: 'Without await, you get the Promise object instead of the actual value.',
          wrong: 'const data = fetch("/api"); // data is a Promise',
          right: 'const data = await fetch("/api"); // data is the response',
          why: 'await unwraps the Promise and gives you the resolved value.'
        },
        {
          type: 'checkpoint',
          heading: 'Checkpoint',
          question: 'What keyword pauses execution until a Promise resolves?',
          options: ['pause', 'wait', 'await', 'stop'],
          correct: 2,
          explanation: 'await pauses the async function until the Promise is resolved.'
        }
      ]
    },
    {
      id: 'j10',
      title: 'Local Storage',
      estimatedTime: '15 min',
      sections: [
        {
          type: 'intro',
          heading: 'Saving Data in the Browser',
          text: 'localStorage lets you save data that persists even after the browser is closed.'
        },
        {
          type: 'concept',
          heading: 'Basic Operations',
          text: 'Store, retrieve, and remove data with simple methods.',
          code: 'localStorage.setItem("username", "Banele");\nconst name = localStorage.getItem("username");\nlocalStorage.removeItem("username");\nlocalStorage.clear(); // remove all',
          breakdown: ['setItem = save key-value pair', 'getItem = retrieve by key', 'removeItem = delete one item', 'clear = delete everything']
        },
        {
          type: 'warning',
          heading: 'Strings Only',
          text: 'localStorage only stores strings. Objects must be converted.',
          wrong: 'localStorage.setItem("user", {name: "Banele"});',
          right: 'localStorage.setItem("user", JSON.stringify({name: "Banele"}));\nconst user = JSON.parse(localStorage.getItem("user"));',
          why: 'JSON.stringify converts objects to strings. JSON.parse converts them back.'
        },
        {
          type: 'checkpoint',
          heading: 'Checkpoint',
          question: 'How do you store an object in localStorage?',
          options: ['Directly with setItem', 'Using JSON.stringify', 'Using toString()', 'You cannot store objects'],
          correct: 1,
          explanation: 'JSON.stringify() converts objects to strings for storage.'
        }
      ]
    }
  ]
};
