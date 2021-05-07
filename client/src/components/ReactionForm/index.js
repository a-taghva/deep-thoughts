import React, { useState } from 'react';

const ReactionForm = ({ thoughtId }) => {
  const [reactionBody, setBody] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const handleChange = e => {
    const l = e.target.value.length;

    if (l <= 280) {
      setBody(e.target.value);
      setCharacterCount(l);
    }
  };

  const handleFormSubmit = async e => {
    e.preventDefault();

    setBody('');
    setCharacterCount(0);
  };

  return (
    <div>
      <p className={`m-0 ${characterCount === 280 ? 'text-error' : '' }`}>
        Character Count: {characterCount}/280
      </p>
      <form 
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          value={reactionBody}
          onChange={handleChange}
          placeholder="Leave a reaction to this thought..."
          className="form-input col-12 col-md-9"
        ></textarea>

        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReactionForm;