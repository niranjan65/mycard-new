import React from 'react';
import { useFrappeGetDoc } from 'frappe-react-sdk';

// This component fetches document data and returns it to the parent
const DocDataFetcher = ({ doctype, docname, children }) => {
  const { data, error, isLoading, mutate } = useFrappeGetDoc(
    doctype,
    docname,
    {
      fields: ['*'],
    }
  );

  // Return the render prop/children function with the fetched data
  return children({ data, error, isLoading, mutate });
};

export default DocDataFetcher;