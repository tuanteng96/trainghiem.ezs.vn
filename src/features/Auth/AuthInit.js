import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LayoutSplashScreen } from 'src/layout/_core/SplashScreen'
import { getListPostsID } from '../Home/HomeSlice'

function AuthInit(props) {
  const [showSplashScreen, setShowSplashScreen] = useState(true)
  const { PostsList } = useSelector(({ posts }) => ({
    PostsList: posts.PostsList
  }))
  const dispatch = useDispatch()
  // We should request user by authToken before rendering the application

  useEffect(() => {
    dispatch(getListPostsID(15))
  }, [dispatch])

  useEffect(() => {
    if (PostsList) {
      setShowSplashScreen(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PostsList])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{props.children}</>
}

export default AuthInit
