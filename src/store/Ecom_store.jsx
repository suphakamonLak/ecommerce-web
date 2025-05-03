import axios from 'axios'
import { create } from 'zustand'// zustand ใช้เพื่อให้สามารถใช้ตัวแปรได้หลายๆหน้า (global state)
import { persist, createJSONStorage } from 'zustand/middleware'// จะเก็บเป็น local store เพือไม่ให้ข้อมูลหายไปเวลารีเฟรชหน้าเว็บ

// Function ที่ return value ออกเป็น obj 
const ecomStore = (set) => ({
  user: null,
  token: null,
  actionLogin: async (form) => {
    // Send to Back
    const res = await axios.post('http://localhost:5000/api/login', form)

    // Set value
    set({
      user: res.data.payload,
      token: res.data.token
    })
    return res
  }
})

const usePersist = {// ชื่อ store ที่จะตั้ง
  name: 'ecom-store',
  storage: createJSONStorage(() => localStorage)
}

// Using ecomStaor
const useEcomStore = create(persist(ecomStore, usePersist))

export default useEcomStore // เพื่อให้หน้าอื่นสามารถใช้ได้