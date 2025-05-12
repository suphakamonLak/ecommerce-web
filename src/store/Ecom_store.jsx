import axios from 'axios'
import { create } from 'zustand'// zustand ใช้เพื่อให้สามารถใช้ตัวแปรได้หลายๆหน้า (global state)
import { persist, createJSONStorage } from 'zustand/middleware'// จะเก็บเป็น local store เพือไม่ให้ข้อมูลหายไปเวลารีเฟรชหน้าเว็บ
import { listCategory } from '../api/Category'
import { listProducts, searchFilters } from '../api/Product'
import { toast } from 'react-toastify'
import _ from 'lodash'

// Function ที่ return value ออกเป็น obj (Zustand)
const ecomStore = (set, get) => ({
  user: null,
  token: null,
  categories: [], 
  products: [],
  carts: [],
  logout: () => {
    set({
      user: null,
      token: null,
      categories: [], 
      products: [],
      carts: [],
    })
  },
  actionAddtoCart: (product) => {
    const carts = get().carts // เข้าถึงตัวแปร carts
    const updateCart = [...carts, {...product, count: 1}]// count คือ property ที่เราพึ่งเพิ่มใน obj

    // Step Uniqe (เวลาเพิ่มสินค้าเดิม ตัวแปร uniqe มันจะไม่นับ)
    const uniqe = _.uniqWith(updateCart, _.isEqual)
    set({carts: uniqe})
  },
  actionUpdateQuantity: (productId, newQuantity) => {
    set((state) => ({
      carts: state.carts.map((item) => 
        item.id === productId // ค่าที่จะ return ออกไป
          ? {...item, count: Math.max(1, newQuantity)}// อัพเดตค่า (default, newValue)
          : item// 
      )
    }))
  },
  actionRemoveProduct: (productId) => {
    set((state) => ({
      carts: state.carts.filter((item) => 
        item.id !== productId
      )
    }))
  },
  actionGetTotalPrice: () => {// ราคารวม
    return get().carts.reduce((total, item) => {// ค่าก่อนหน้า, ค่าปัจจุบัน
      return total + item.price * item.count
    }, 0)// calback function, initial value
  },
  actionLogin: async (form) => {
    // Send to Back
    const res = await axios.post('http://localhost:5000/api/login', form)

    // Set value
    set({
      user: res.data.payload,
      token: res.data.token
    })
    return res
  },
  getCategory: async () => {
    try {
      const res = await listCategory()
        
      set({categories: res.data})
    } catch (err) {
      toast.error(err)
    }
  },
  getProduct: async (count) => {
    try {
      const res = await listProducts(count)
        
      set({products: res.data})
    } catch (err) {
      toast.error(err)
    }
  },
  actionSearchFilters: async (arg) => {
    try {
      const res = await searchFilters(arg)
        
      set({products: res.data})
    } catch (err) {
      toast.error(err)
    }
  },
  clearCart: () => {
    set({ carts: [] })
  }
})

const usePersist = {// ชื่อ store ที่จะตั้ง
  name: 'ecom-store',
  storage: createJSONStorage(() => localStorage)
}

// Using ecomStaor
const useEcomStore = create(persist(ecomStore, usePersist))

export default useEcomStore // เพื่อให้หน้าอื่นสามารถใช้ได้