import clsx from 'clsx'
import React, { createContext, useState } from 'react'
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import '../../_assets/sass/pages/_posts.scss'
import SidebarLeft from './components/Sidebar/SidebarLeft'
import SidebarRight from './components/Sidebar/SidebarRight'

export const PostsContext = createContext('light')

export default function Home() {
  const [show, setShow] = useState(false)
  const [showRight, setShowRight] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (show) {
      onHide()
    }
    if (showRight) {
      onHideRight()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  const onOpen = () => {
    setShow(true)
  }

  const onHide = () => {
    setShow(false)
  }

  const onOpenRight = () => {
    setShowRight(true)
  }

  const onHideRight = () => {
    setShowRight(false)
  }

  return (
    <PostsContext.Provider
      value={{
        show: show,
        onOpen: onOpen,
        showRight: showRight,
        onOpenRight: onOpenRight
      }}
    >
      <div className="posts-page">
        <div className={clsx('posts-page__left', show && 'show')}>
          <SidebarLeft />
        </div>
        <div className="posts-page__content">
          <Outlet />
        </div>
        <div className={clsx('posts-page__right', showRight && 'show')}>
          <SidebarRight />
        </div>
        {show && <div className="_bg" onClick={onHide}></div>}
        {showRight && <div className="_bg" onClick={onHideRight}></div>}
        <div className="btn-mp3-mobile" onClick={onOpenRight}>
          Nghe tư vấn
        </div>
      </div>
    </PostsContext.Provider>
  )
}
