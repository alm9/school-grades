import React from 'react';

export default function Action({ id, type }) {
  return (
    <div>
      <i class="material-icons" style={{ cursor: 'pointer' }}>
        {type}
      </i>
    </div>
  );
}
