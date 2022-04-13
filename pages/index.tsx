import type { NextPage } from 'next'
import React, { useEffect, useMemo, useState } from 'react';
import Content from '../components/Content';
import { fetchNames } from '../lib/fetch-names';

type Props = {
  result: string[],
}

const Home: NextPage<Props> = ({ result }) => {

  return (
    <div>
      <Content result={result} />
    </div>
  )
}

export async function getStaticProps() {
  const result = await fetchNames();

  return {
      props: {
          result,
      },
      revalidate: 100,
  }
}

export default Home
