import closeModal from "../../utils/closeModal"
import useEcomStore from "../../store/Ecom_store"
import { X } from "lucide-react"
import { removeProduct } from "../../api/Product"
import { toast } from "react-toastify"

export default function ConfirmDelProductModal({ productId, productName, onConfirmed }) {
    const token = useEcomStore((state) => state.token)

    async function confirmRemoveProdutct() {
        try {
            const res = await removeProduct(token, productId)
            closeModal('confirm-product-modal')
            toast.success(`ลบสินค้าสำเร็จ`)
            onConfirmed()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div
            id='confirm-product-modal'
            tapindex='-1'
            className='fixed z-50 hidden overflow-y-auto overflow-x-hidden top-0 right-0 left-0 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'
        >
            <div className='relative p-4 w-full max-w-md max-h-full'>
                <div className='relative bg-white rounded-lg shadow dark:bg-neutral-800 p-3 space-y-3'>
                    <div className='flex justify-end'>
                        <button
                            type='button'
                            onClick={() => closeModal('confirm-product-modal')}
                            className='text-neutral-400 bg-transparent hover:bg-neutral-200 hover:text-neutral-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-neutral-700 dark:hover:text-white transition'
                        >
                            <X size='1.25rem' />
                        </button>
                    </div>
                    <div className='text-center'>
                        <h3 className='mb-2 text-lg dark:text-white'>คุณต้องการลบสินค้า <span className='text-red-600 font-medium'>{ productName }</span> หรือไม่</h3>
                    </div>
                    <div className='grid grid-cols-2 gap-3'>
                        <button
                            type='button'
                            onClick={() => closeModal('confirm-product-modal')}
                            className='text-gray-500 bg-white hover:bg-neutral-100 focus:ring-4 focus:outline-none focus:ring-neutral-200 rounded-lg border border-neutral-200 text-sm font-medium px-5 py-2.5 hover:text-neutral-900 focus:z-10 dark:bg-neutral-700 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-white dark:hover:bg-neutral-600 dark:focus:ring-neutral-600'
                        >
                            ยกเลิก
                        </button>
                        <button
                            type='button'
                            className='text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2'
                            onClick={confirmRemoveProdutct}
                        >
                            ยืนยัน
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

