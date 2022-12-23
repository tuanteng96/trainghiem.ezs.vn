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
      <div>
        Nghe tư vấn Online về giải pháp EZS
        <ul>
          <li>Nghe toàn bộ</li>
          <li>Mô hình hệ thống</li>
          <li>Chức năng cơ bản</li>
        </ul>
      </div>
      <div>
        <a className="d-block" href="https://ezs.vn/app-khach-hang">
          App khách hàng có gì
        </a>
        <a className="d-block" href="https://ezs.vn/thiet-bi-tich-hop">
          EZS tích hợp thiết bị gì
        </a>
      </div>
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
