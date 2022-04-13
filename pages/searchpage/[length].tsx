import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import Content from '../../components/Content'
import { fetchNames } from '../../lib/fetch-names'

type Props = {
    result: string[],
}

const SearchPage: NextPage<Props> = ({ result }) => {

    const router = useRouter()
    const { length } = router.query

    let lengthVal = 1000;
    if(typeof length === "string") lengthVal = parseInt(length)

    return (
        <div>
            <Content result={result} length={lengthVal} />
        </div>
    )
}

export async function getStaticPaths() {
    const result = await fetchNames();
    return {
        paths: result.map((name, i) => {
            return {
                params: {
                    length: i.toString(),
                }
            }
        }),
        fallback: false
    }
}

export async function getStaticProps() {

    let result:string[] = await fetchNames();

    return {
        props: {
            result,
        },
        revalidate: 100,
    }
}

export default SearchPage