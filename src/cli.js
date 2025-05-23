#!/usr/bin/env node
'use strict';
const React = require('react');
const {render, Box, Text, useInput} = require('ink');
const {useState, useEffect} = require('react');
const fs = require('fs');
const path = require('path');

const HOME_DIR = process.env.HOME || '/home/pi';

const Menu = ({items, onSelect}) => {
  const [index, setIndex] = useState(0);

  useInput((input, key) => {
    if (key.upArrow) {
      setIndex(i => (i === 0 ? items.length - 1 : i - 1));
    } else if (key.downArrow) {
      setIndex(i => (i === items.length - 1 ? 0 : i + 1));
    } else if (key.return || input === 'a') {
      onSelect(index);
    }
  });

  return (
    <Box flexDirection="column">
      {items.map((item, i) => (
        <Text key={item} color={i === index ? 'cyan' : undefined}>
          {i === index ? '> ' : '  '}
          {item}
        </Text>
      ))}
    </Box>
  );
};

const DirectoryList = ({dir, onExit}) => {
  const [files, setFiles] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    try {
      setFiles(fs.readdirSync(dir));
    } catch (err) {
      setFiles([`Error reading directory: ${err.message}`]);
    }
  }, [dir]);

  useInput((input, key) => {
    if (key.upArrow) {
      setIndex(i => (i === 0 ? files.length - 1 : i - 1));
    } else if (key.downArrow) {
      setIndex(i => (i === files.length - 1 ? 0 : i + 1));
    } else if (key.escape || input === 'b') {
      onExit();
    }
  });

  return (
    <Box flexDirection="column">
      <Text>Directory: {dir}</Text>
      {files.map((file, i) => (
        <Text key={file} color={i === index ? 'green' : undefined}>
          {i === index ? '> ' : '  '}
          {file}
        </Text>
      ))}
      <Text>Press B or ESC to go back</Text>
    </Box>
  );
};

const WifiConfig = ({onExit}) => {
  useInput((input, key) => {
    if (key.escape || input === 'b') {
      onExit();
    }
  });

  return (
    <Box flexDirection="column">
      <Text>WiFi configuration placeholder.</Text>
      <Text>Use external tools like nmcli or wpa_cli here.</Text>
      <Text>Press B or ESC to go back.</Text>
    </Box>
  );
};

const App = () => {
  const [screen, setScreen] = useState('menu');

  const handleSelect = index => {
    if (index === 0) {
      setScreen('dir');
    } else if (index === 1) {
      setScreen('wifi');
    }
  };

  if (screen === 'dir') {
    return <DirectoryList dir={HOME_DIR} onExit={() => setScreen('menu')} />;
  }

  if (screen === 'wifi') {
    return <WifiConfig onExit={() => setScreen('menu')} />;
  }

  return <Menu items={['Browse Home Directory', 'Configure WiFi']} onSelect={handleSelect} />;
};

render(<App />);
