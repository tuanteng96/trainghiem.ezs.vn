import React, { Fragment, useEffect, useState, useRef } from 'react'
import postsApi from 'src/api/posts.api'
import useQuery from 'src/hooks/useQuery'
import ReactAudioPlayer from 'react-audio-player'

function SidebarRight(props) {
  const [User, setUser] = useState()
  const [loading, setLoading] = useState(false)
  const { id } = useQuery()

  const refMp3 = useRef()

  console.log(refMp3)

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
        <ReactAudioPlayer
          ref={refMp3}
          src="https://lienkhucnhac.net/api/music/m4a/bd541447075475120948236146f88433/tuyet-dinh-bolero-chon-loc-dac-biet-moi.m4a"
          autoPlay
          controls
        />
      </div>
      <div>
        Nghe tư vấn Online về giải pháp EZS
        <ul>
          <li
            onClick={() => {
              // if(refMp3?.current.audioEl.current.currentTime) {
              //   refMp3?.current.audioEl.current.currentTime = 5
              // }
            }}
          >
            Nghe toàn bộ
          </li>
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
