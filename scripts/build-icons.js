const glob = require('glob-promise');
const path = require('path');
const fs = require('fs-extra');
import Mustache from 'mustache';
import { optimize } from 'svgo';

const sourcePath = '../src/components/icon';

const icons = [
  {
    id: 'bewater',
    name: 'BeWater Icons',
    contents: [
      {
        files: path.resolve(__dirname, `${sourcePath}/svgs/16x16/*.svg`),
      },
    ],
  },
  {
    id: 'bewater-scale',
    name: 'BeWater Icons with scale',
    contents: [
      {
        files: path.resolve(__dirname, `${sourcePath}/svgs/others/*.svg`),
      },
    ],
  },
];

// file path
const rootDir = path.resolve(__dirname, '../src/components/icons');
const DIST = path.resolve(rootDir, '.');

// logic

async function getIconFiles(content) {
  return glob(content.files);
}

function getComponentName(file) {
  const fileName = path.basename(file, path.extname(file));
  const parts = fileName
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.substring(1));
  if (/\d+/.test(parts[parts.length - 1])) {
    parts.pop();
  }
  return ['Icon', ...parts].join('');
}

function getFileName(file) {
  const fileName = path.basename(file, path.extname(file));
  const parts = fileName.split('-');
  if (/\d+/.test(parts[parts.length - 1])) {
    parts.pop();
  }
  return parts.join('-');
}

// Noise introduced by Google
const noises = [
  [
    '<path fill="#fff" d="M0 0h16v16H0V0zm0 0h16v16H0V0zm0 0h16v16H0V0zm0 0h16v16H0V0z" />',
    '',
  ],
  ['<path fill="#fff" d="M0 0h16v16H0V0zm0 0h16v16H0V0z" />', ''],
  ['<path fill="#fff" d="M0 0h16v16H0z" />', ''],
  ['="M0 0h16v16H0V0zm0 0h16v16H0V0z', '="'],
  ['="M0 0h16v16H0zm0 0h16v16H0zm0 0h16v16H0z', '="'],
];

async function cleanPaths(svgPath, data) {
  // Remove hardcoded color fill before optimizing so that empty groups are removed
  const input = data
    .replace(/ fill="black"/g, '')
    .replace(/<rect fill="#fff" width="16" height="16"\/>/g, '')
    .replace(/<rect width="16" height="16" fill="white"\/>/g, '');

  const result = await optimize(input, {
    floatPrecision: 4,
    plugins: [
      { name: 'removeHiddenElems' },
      { name: 'removeEmptyContainers' },
      {
        name: 'removeAttrs',
        params: {
          attrs: '(class|id|data-name)',
        },
      },
      { name: 'removeStyleElement' },
    ],
  });

  // Extract the paths from the svg string
  // Clean xml paths
  let paths = result.data
    .replace(/<svg[^>]*>/g, '')
    .replace(/<\/svg>/g, '')
    .replace(/"\/>/g, '" />')
    .replace(/<defs\/>/g, '')
    .replace(/stroke-linecap/g, 'strokeLinecap')
    .replace(/stroke-linejoin/g, 'strokeLinejoin')
    .replace(/stroke-width/g, 'strokeWidth')
    .replace(/fill="black"/g, '')
    .replace(/fill-opacity=/g, 'fillOpacity=')
    .replace(/xlink:href=/g, 'xlinkHref=')
    .replace(/clip-rule=/g, 'clipRule=')
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/ clip-path=".+?"/g, '') // Fix visibility issue and save some bytes.
    .replace(/<clipPath.+?<\/clipPath>/g, '') // Remove unused definitions
    .replace(/<path[^/]*d="M0 0h16v16H0z" \/>/g, '')
    .replace(
      /<path[^/]*d="M0 0h16v16H0V0zm0 0h16v16H0V0zm0 0h16v16H0V0zm0 0h16v16H0V0z" \/>/g,
      '',
    )
    .replace(/<path[^/]*d="M0 0h16v16H0V0zm0 0h16v16H0V0z" \/>/g, '');

  const sizeMatch = svgPath.match(/^.*-([0-9]+).svg$/);
  const size = sizeMatch ? Number(sizeMatch[1]) : null;

  if (size !== null && size !== 16) {
    const scale = Math.round((16 / size) * 100) / 100; // Keep a maximum of 2 decimals
    paths = paths.replace('clipPath="url(#b)" ', '');
    paths = paths.replace(
      /<path /g,
      `<path transform="scale(${scale}, ${scale})" `,
    );
  }

  noises.forEach(([search, replace]) => {
    if (paths.indexOf(search) !== -1) {
      paths = paths.replace(search, replace);
    }
  });

  // Add a fragment when necessary.
  if ((paths.match(/\/>/g) || []).length > 1) {
    paths = `<React.Fragment>${paths}</React.Fragment>`;
  }

  return paths;
}

async function getComponentContent(file, name, template) {
  const svgCode = await fs.readFile(file, 'utf8');
  const paths = await cleanPaths(file, svgCode);
  return Mustache.render(template, {
    paths,
    componentName: name,
  });
}

async function getStoryContent(name, template) {
  return Mustache.render(template, {
    componentName: name,
  });
}

async function writeIconComponent(write, name, file, template, fileName) {
  // write icon component
  const componentContent = await getComponentContent(file, name, template);
  await write(path.resolve(DIST, `${fileName}.tsx`), componentContent);
}

async function writeIconComponentStoryBook(write, name, template, fileName) {
  // write icon component
  const componentContent = await getStoryContent(name, template);
  await write(path.resolve(DIST, `${fileName}.stories.tsx`), componentContent);
}

function addContentToIndexFile(indexStr, name, fileName) {
  return indexStr + `export { default as ${name} } from './${fileName}';\n`;
}

async function writeIconModule(icon, indexStr) {
  const write = (filePath, str) => fs.writeFile(filePath, str, 'utf8');
  const exists = new Set(); // for remove duplicate
  for (const content of icon.contents) {
    const files = await getIconFiles(content);
    const template = await fs.readFile(
      path.resolve(__dirname, sourcePath, 'template.js'),
      {
        encoding: 'utf8',
      },
    );
    const templateStoryBook = await fs.readFile(
      path.resolve(__dirname, sourcePath, 'template.story.js'),
      {
        encoding: 'utf8',
      },
    );
    for (const file of files) {
      const name = getComponentName(file);
      if (exists.has(name)) {
        continue;
      } else {
        exists.add(name);
        const fileName = getFileName(file);

        await writeIconComponent(write, name, file, template, fileName);
        await writeIconComponentStoryBook(
          write,
          name,
          templateStoryBook,
          fileName,
        );
        indexStr = addContentToIndexFile(indexStr, name, fileName);
        exists.add(file);
        console.log(`created ${name}`);
      }
    }
  }
  return indexStr;
}

async function main() {
  try {
    let indexStr = '';
    for (const icon of icons) {
      indexStr = await writeIconModule(icon, indexStr);
    }
    await fs.writeFile(path.resolve(DIST, `index.ts`), indexStr, 'utf8');
    console.log('done');
  } catch (e) {
    console.error(e);
  }
}
main();
