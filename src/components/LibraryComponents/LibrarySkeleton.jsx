import React from 'react';
import ContentLoader from 'react-content-loader';

const LibrarySkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={473}
    height={110}
    viewBox="0 0 473 110"
    backgroundColor="#dbdbdb"
    foregroundColor="#ededed"
    {...props}>
    <rect x="0" y="0" rx="18" ry="18" width="470" height="110" />
  </ContentLoader>
);

export default LibrarySkeleton;
