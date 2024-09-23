import React, { useState, useEffect } from 'react';
import './App.css';

const TextAnalyzer = () => {
  const [text, setText] = useState('');
  const [searchString, setSearchString] = useState('');
  const [replaceString, setReplaceString] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [uniqueWordCount, setUniqueWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [highlightedText, setHighlightedText] = useState('');

  useEffect(() => {
    const words = text.match(/\b\w+\b/g) || [];
    const uniqueWords = new Set(words.map(word => word.toLowerCase()));
    const chars = text.replace(/[\s\W]/g, '');

    setWordCount(words.length);
    setUniqueWordCount(uniqueWords.size);
    setCharCount(chars.length);
  }, [text]);

  const handleReplace = () => {
    const regex = new RegExp(searchString, 'gi');
    const newText = text.replaceAll(regex, replaceString);
    const highlighted = newText.replaceAll(regex, `<span class="highlight">${replaceString}</span>`);
    setText(newText);
    setHighlightedText(highlighted);
  };

  return (
    <div className="container">
      <h2>Text Analyzer</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text here..."
      ></textarea>
      <div className="stats">
        <p>Word Count: {wordCount}</p>
        <p>Unique Word Count: {uniqueWordCount}</p>
        <p>Character Count (Excluding Spaces and Punctuation): {charCount}</p>
      </div>
      <div className="replace">
        <input
          type="text"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          placeholder="Search string"
        />
        <input
          type="text"
          value={replaceString}
          onChange={(e) => setReplaceString(e.target.value)}
          placeholder="Replace string"
        />
        <button onClick={handleReplace}>Replace</button>
      </div>
      <div className="highlighted-text" dangerouslySetInnerHTML={{ __html: highlightedText }}></div>
    </div>
  );
};

export default TextAnalyzer;
