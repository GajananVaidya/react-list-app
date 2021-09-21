import React, { lazy, Suspense } from 'react';

const LazyCompanyList = lazy(() => import('./CompanyList'));

const CompanyList = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCompanyList {...props} />
  </Suspense>
);

export default CompanyList;
