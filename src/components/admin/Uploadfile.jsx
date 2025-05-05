import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Resize from 'react-image-file-resizer'
import { removeFiles, uploadFiles } from '../../api/Product'
import useEcomStore from '../../store/Ecom_store'
import { Loader } from 'lucide-react'

export default function Uploadfile({ form, setForm }) {
    const [isLoading, setIsLoading] = useState(false)
    const token = useEcomStore((state) => state.token)

    const handleOnChange = (e) => {
        const files = e.target.files
        if (files) {
            setIsLoading(true)
            let allFiles = form.images// [] empty array
            
            for (let i=0; i<files.length; i++) {
                const file = files[i] 
                // Validate img
                if (!file.type.startsWith('image/')) {
                    toast.error(`File ${file.name} isn't image! `)
                    continue// ข้ามการทำงานในรอบนั้นๆ เมื่อไม่ใช้รูปภาพ
                }
                // Image resize
                Resize.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPG",
                    100,
                    0,
                    (data) => {
                        // Endpoint Backend
                        uploadFiles(token, data)
                            .then((res) => {
                                
                                allFiles.push(res.data)// เอาข้อมูลมาต่อใน array
                                setForm({
                                    ...form,
                                    images: allFiles
                                })
                                setIsLoading(false)
                                toast.success('Upload image success')
                            })
                            .catch((err) => {
                                setIsLoading(false)
                                console.log(err)
                            })
                    },
                    "base64"
                )
            }
        }
    }

    const handleRemove = (public_id) => {
        const images = form.images

        removeFiles(token, public_id)
            .then((res) => {
                const filterImages = images.filter((item) => {
                    return item.public_id !== public_id// return อันที่ไม่ใช่รูปที่เราจะลบออกเพื่อเอาไปแสดง
                })
                setForm({// เก็บรูปที่ไม่ได้ลบ
                    ...form,
                    images: filterImages
                })
                toast.error(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // console.log('form', form)
    return (
        <div className='my-4'>
            <div className='flex mx-4 gap-4 my-4'>
                {
                    isLoading &&  <Loader className='animate-spin h-14 w-14'/>
                }
              
                {
                    form.images.map((item, index) => 
                        <div className='relative' key={index}>
                            <img 
                                className='w-24 h-24 hover:scale-105'
                                src={item.url}
                            />
                            <span 
                                className='absolute top-0 right-0 bg-red-400 p-1 rounded-full'
                                onClick={() => handleRemove(item.public_id)}
                            >
                                X
                            </span>
                        </div>
                    )
                }
            </div>

            <div>
                {/* upload multipl images */}
                <input 
                    type='file'
                    name='images'
                    multiple
                    onChange={handleOnChange}
                />
            </div>
        </div>
    )
}
