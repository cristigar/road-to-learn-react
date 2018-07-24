import React from 'react';
import Button from "./Button";

const Table = ({list, onDismiss}) => {
  const largeColumn = {
    width: '40%',
  };

  const midColumn = {
    width: '30%',
  };

  const smallColumn = {
    width: '10%',
  };

  return (
    <div className="table">
      <div className="table-header">
        <span style={largeColumn}>Title</span>
        <span style={midColumn}>Author</span>
        <span style={smallColumn}>Number of comments</span>
        <span style={smallColumn}>Points</span>
        <span style={smallColumn}>Action</span>
      </div>
      {list.map(item =>
        <div key={item.objectID} className="table-row">
          <span style={largeColumn}>
            <a
              href={item.url}
              title="Title"
              target="_blank"
            >
              {item.title || item.story_title}
            </a>
          </span>
          <span
            style={midColumn}
            title="Author"
          >
            {item.author}
          </span>
          <span
            style={smallColumn}
            title="Number of comments"
          >
            {item.num_comments}
          </span>
          <span
            style={smallColumn}
            title="Points"
          >
            {item.points}
          </span>
          <span style={smallColumn}>
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

export default Table;
