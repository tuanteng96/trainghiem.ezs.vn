import React, { Fragment, useEffect, useState } from 'react'
import postsApi from 'src/api/posts.api'
import useQuery from 'src/hooks/useQuery'

function SidebarRight(props) {
  const [User, setUser] = useState()
  const [loading, setLoading] = useState(false)
  const { id } = useQuery()

  useEffect(() => {
    if (id) {
      getDetailPost()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const getDetailPost = () => {
    postsApi
      .getPostID(id)
      .then(({ data }) => {
        setLoading(false)
        setUser(data)
      })
      .catch(error => console.log(error))
  }

  return (
    <div>
      <h3>Tài khoản trải nghiệm</h3>
      <div>
        {loading && 'Đang tải'}
        {!loading && (
          <Fragment>
            {User && (
              <ul>
                <li>Link Phần mềm : {User?.acf?.link_phan_mem}</li>
                <li>Tài khoản : {User?.acf?.tai_khoan}</li>
                <li>Mật khẩu : {User?.acf?.mat_khau}</li>
                <li>Website : {User?.acf?.website}</li>
                <li>Tên APP : {User?.acf?.ten_app_appstore_chplay}</li>
              </ul>
            )}
          </Fragment>
        )}
      </div>
    </div>
  )
}

export default SidebarRight
