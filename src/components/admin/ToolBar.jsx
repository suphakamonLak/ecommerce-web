import { Eye, Save } from 'lucide-react'

export default function ToolBar({ title, addProduct, titleView, onViewProduct }) {
  return (
    <div className='flex gap-2'>
      <button
        onClick={() => addProduct()}
        type='button'
        className='flex gap-2 items-center text-white bg-cyan-800 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-500 rounded-lg p-2 font-medium focus:outline-none'
      >
        <Save />
        <p>{title}</p>
      </button>
      <button
        onClick={onViewProduct}
        type='button'
        className='flex gap-2 items-center text-white bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:ring-gray-500 rounded-lg p-2 font-medium focus:outline-none'
      >
        <Eye />
        <p>{titleView}</p>
      </button>
    </div>
  )
}

