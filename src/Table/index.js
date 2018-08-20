import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

import Button from "../Button/index";

const Table = ({list, onDismiss}) => {
  return (
    <div className="table">
      <div className="table-header">
        <span className="item-title-header">Title</span>
        <span className="item-author-header">Author</span>
        <span className="item-comments-header">Number of comments</span>
        <span className="item-points-header">Points</span>
        <span className="item-action-header">Action</span>
      </div>
      {list.map(item =>
        <div key={item.objectID} className="table-row">
          <span className="item-title">
            <a
              href={item.url}
              title="Title"
              target="_blank"
            >
              {item.title || item.story_title}
            </a>
          </span>
          <span
            title="Author"
            className="item-author"
          >
            {item.author}
          </span>
          <span
            title="Number of comments"
            className="item-comments"
          >
            {item.num_comments}
          </span>
          <span
            title="Points"
            className="item-points"
          >
            {item.points}
          </span>
          <span className="item-dismiss">
            <Button
              onClick={() => onDismiss(item.objectID)}
              className="button-inline"
            >
              Dismiss
            </Button>
          </span>
        </div>
      )}
    </div>
  );
};

Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      author: PropTypes.string,
      url: PropTypes.string,
      num_comments: PropTypes.number,
    })
  ).isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default Table;
