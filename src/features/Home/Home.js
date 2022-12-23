import React from 'react'
import { Outlet } from 'react-router-dom'
import '../../_assets/sass/pages/_posts.scss'
import SidebarLeft from './components/Sidebar/SidebarLeft'
import SidebarRight from './components/Sidebar/SidebarRight'

export default function Home() {
  return (
    <div className="posts-page">
      <div className="posts-page__left">
        <SidebarLeft />
      </div>
      <div className="posts-page__content">
        <Outlet />
      </div>
      <div className="posts-page__right">
        <SidebarRight />
      </div>
    </div>
  )
}
