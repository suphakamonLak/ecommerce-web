import { Save } from 'lucide-react'

export default function ToolBar({ title }) {
  return (
    <div className='flex items-center'>
      <button
          type='submit'
          className='flex gap-2 items-center text-white bg-cyan-800 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-500 rounded-lg p-2 font-medium focus:outline-none'
      >
          <Save />
          <p>{title}</p>
      </button>
    </div>
  )
}

