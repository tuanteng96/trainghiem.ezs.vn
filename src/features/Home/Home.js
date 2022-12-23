import React from 'react'
import { Outlet } from 'react-router-dom'
import SidebarLeft from './components/Sidebar/SidebarLeft'
import SidebarRight from './components/Sidebar/SidebarRight'

export default function Home() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <SidebarLeft />
        </div>
        <div className="col-md-6">
          <Outlet />
        </div>
        <div className="col-md-3">
          <SidebarRight />
        </div>
      </div>
    </div>
  )
}
