import React, { useState } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { ADD_THOUGHT } from '../../utils/mutations';
import { QUERY_THOUGHTS, QUERY_ME } from '../../utils/queries';

const ThoughtForm = () => {
  const [thoughtText, setText] = useState('');
  const [characterCount, setCharacterCount] = useState('');

  const [addThought, { error }] = useMutation(ADD_THOUGHT, {
    update(cache, { data: { addThought } }) {
      try {
        // read what's currently in the cache
        const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });

        // prepend the newest thought to the front of the array
        cache.writeQuery({
          query: QUERY_THOUGHTS,
          data: { thoughts: [addThought, ...thoughts] }
        })
      } catch (e) {
        console.error(e);
      }
    }
  });

  const handleChange = e => {
    const l = e.target.value.length;

    if (l <= 280) {
      setText(e.target.value);
      setCharacterCount(e.target.value.length);
    }
  }

  const handleFormSubmit = async e => {
    e.preventDefault();

    try {
      await addThought({
        variables: { thoughtText }
      });

      // clear the form value
      setText('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
    
  }

  return (
    <div>
      <p className={`m-0 ${characterCount === 280 ? 'text-error' : '' }`}>
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form 
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Here's a new thought..."
          value={thoughtText}
          onChange={handleChange}
          className="form-input col-12 col-md-9"
        ></textarea>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ThoughtForm;