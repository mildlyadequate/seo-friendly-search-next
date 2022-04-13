import React, { useEffect, useMemo, useState } from 'react'

type Props = {
    result: string[]
}

const Content = ({ result }: Props) => {
    const [searchText, setSearchText] = useState("");
    const [showAll, setShowAll] = useState(false);

    const inputRefs = useMemo(() => Array(result.length).fill(0).map(i => React.createRef<HTMLDivElement>()), []);

    useEffect(() => {

        inputRefs.forEach((ref, i) => {

            if (showAll || (searchText !== "" && result[i].toLowerCase().startsWith(searchText.toLowerCase()))) {
                ref.current?.classList.remove("hidden");
            } else {
                ref.current?.classList.add("hidden");
            }

        })

    }, [searchText, showAll])
    return (
        <div className='flex flex-col gap-4 p-8 w-1/3'>

            <h1 className='text-white text-lg'>SEO Friendly Search</h1>
            <div>
                <input id='showAll' type={"checkbox"} className="relative align-middle" onChange={(event) => { setShowAll(event.target.checked) }} />
                <label htmlFor='showAll' className='align-middle pl-2 text-slate-400 select-none'>Alle anzeigen</label>
            </div>

            <div>
                <p className='text-slate-400 mb-1'>{result.length} Elemente</p>
                <input placeholder='Namen suchen...' onChange={(event) => setSearchText(event.target.value)} className='rounded px-2 py-1' type={"text"} />
                <div className='flex flex-col'>
                    {
                        result.map((data, i) => (
                            <div key={i} ref={inputRefs[i]} className={`flex flex-col bg-slate-800 p-2 cursor-pointer hover:bg-slate-700 rounded group`}>
                                <a className='text-white group-hover:text-green-500'>{data}</a>
                                <span className='text-slate-400'>Position {i} in der Liste.</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Content