import React, { useEffect, useState } from 'react'
import DashboardCard from '../card/DashboardCard'
import useEcomStore from '../../store/Ecom_store'
import { getDashboard } from '../../api/Admin'
import MyAreaChart from './MyAreaChart'
import { dateFormatDay, dateFormatmonth } from '../../utils/dateFormat'
import BestSellerAdmin from './BestSellerAdmin'

export default function DashboardAdmin() {
    const token = useEcomStore((state) => state.token)
    const [dashboardData, setDashboardData] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        soldout: 0,
        topProducts: [],
        salesByDate: [],
        salesByMonth: []
    });
    const [filterType, setFilterType] = useState('daily')

    useEffect(() => {
        handleGetData(token)
    }, [])

    const handleGetData = async (token) => {
        try {
            const res = await getDashboard(token)
            const data = res.data
            // console.log('res dashboard', data)
            setDashboardData({
                totalRevenue: data.totalRevenue._sum.amount ?? 0,
                totalOrders: data.totalOrders,
                soldout: data.outofStockCount,
                topProducts: data.topProducts,
                salesByDate: data.salesByDate,
                salesByMonth: data.salesByMonth
            })
        } catch (err) {
            console.log(err)
        }
    }
    
    // เลือก labels และ data ตาม filterType
    const chartLabels = filterType === 'daily'
    ? dashboardData.salesByDate.map((item) => dateFormatDay(item.date))
    : dashboardData.salesByMonth.map((item) => dateFormatmonth(item.month))

    const chartData = filterType === 'monthly'
    ? dashboardData.salesByMonth.map((item) => item.total)
    : dashboardData.salesByDate.map((item) => item.total)
    
    return (
        <div className='space-y-6'>
            <h1 className='text-2xl text-gray-700 mt-4 mx-2'>Dashboard</h1>
            <DashboardCard 
                totalOrders={dashboardData.totalOrders} 
                totalRevenue={dashboardData.totalRevenue}
                soldout={dashboardData.soldout}
            />
            <div>
                <div className='flex justify-between'>
                    <div>
                        <h1 className='text-xl text-blue-700 mb-4 mx-2'>ยอดขาย</h1>
                    </div>
                    <div className='flex gap-2'>
                        <button
                            onClick={() => setFilterType('daily')}
                            className={`${filterType === 'daily'? 'text-gray-400' : 'text-gray-700'}`}
                        >
                            วัน (Daily)
                        </button>
                        <button
                            onClick={() => setFilterType('monthly')}
                            className={`${filterType === 'monthly'? 'text-gray-400': 'text-gray-700'}`}
                        >
                            เดือน (Month)
                        </button>
                    </div>
                </div>

                <div>
                    <MyAreaChart 
                        labels={chartLabels} 
                        data={chartData} 
                    />
                </div>
            </div>
            <div>
                <BestSellerAdmin/>
            </div>
        </div>
    )
}

