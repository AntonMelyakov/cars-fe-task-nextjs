import { GraphQLBackend } from '@lib/api/graphql'
import Table from './table';
import Link from 'next/link';

export default async function Home() {
  const tableInfo = await GraphQLBackend.GetModification()

  return (
    <div className="flex flex-col min-h-screen justify-center p-2 bg-slate-400">
      <h1 className="m-2 text-center">Car modifications: </h1>
      <div className='p-2'>
        <button className="m-2 p-2 bg-slate-600 text-white">
          <Link href={"/edit"}>Add Modification</Link>
        </button>
      </div>
      <div className="border-1 border-black border-spacing-1 p-3">
        {tableInfo && <Table allModifications={tableInfo.allCarModifications} />}
      </div>
    </div>
  )
}