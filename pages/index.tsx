import type { NextPage } from 'next'
import React, { useEffect, useMemo, useState } from 'react';
import Content from '../components/Content';

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
  let result: string[] = [];

  await Promise.all([0,1,2,3,4].map(id =>
    fetch(`https://random-data-api.com/api/name/random_name?size=100`).then(resp => resp.json())
  )).then(json => {

    json.forEach((fetchElement, fetchIndex) => {

      // let keys = Object.keys(json);
      for (let i = 0; i < fetchElement.length; i++) {
        let el = fetchElement[i];
        result.push(el["name"], el["first_name"], el["middle_name"], el["last_name"], el["male_first_name"], el["female_first_name"], el["two_word_name"]);
        result.push(el["four_word_name"], el["name_with_initials"], el["name_with_middle"])
      }
    })

  });

  return {
    props: {
      result,
    },
    revalidate: 100,
  }
}

export default Home
